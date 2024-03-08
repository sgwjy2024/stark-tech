'use client';
import styles from './monthly-revenue.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { getLastYearStartAndEnd } from '@/lib/utils';
import { usePathname } from "next/navigation";
import Skeleton from '@mui/material/Skeleton';

import * as echarts from 'echarts';

const chartOption: any = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      start: 0,
      end: 50,
      handleSize: 8,
      height: 20
    },
  ],
  legend: {
    data: ['每月营收', '单月营收年增率(%)']
  },
  xAxis: {
    type: 'category',
    data: [],
    axisPointer: {
      type: 'shadow'
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '千元'
    },
    {
      type: 'value',
      name: '%'
    }
  ],
  series: [
    {
      name: '每月营收',
      type: 'bar',
      yAxisIndex: 0,
      data: [],
    },
    {
      name: '单月营收年增率(%)',
      type: 'line',
      yAxisIndex: 1,
      data: []
    }
  ]
}

const getData = async (data_id: string, start_date: string) => {
  const res = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${data_id}&start_date=${start_date}`);
  return res.json();
};
const getInfoData = async (data_id: string) => {
  const res = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&data_id=${data_id}`);
  return res.json();
};

type Info = {
  stock_name: string;
  stock_id: string;
};
type tableType = {
  date: string;
  barData: number;
  lineData: number;
}

export default function Page() {
  const chartRef: MutableRefObject<any> = useRef(null);
  const chartObjRef: MutableRefObject<any> = useRef(null);
  const [date, setDate] = useState('5');
  const [info, setInfo] = useState<Info | null>(null);
  const [tableData, setTableData] = useState<tableType[]>([]);
  const pathName = usePathname();
  const handleChange = (event: SelectChangeEvent) => {
    setDate(event.target.value);
  };
  useEffect(() => {
    let obj = getLastYearStartAndEnd(date);
    let id = pathName.split('/')[2];
    (async () => {
      let { data } = await getData(id, obj.startTime);
      // 处理数据
      const finallyData = data.slice(data.length - (Number(date) - 2) * 12);
      let xData: string[] = [], barData: number[] = [], lineData: number[] = [], tdata: tableType[] = [];
      finallyData.map((x: { revenue_year: number; revenue_month: number; revenue: number; }) => {
        xData.push(x.revenue_year + '-' + x.revenue_month);
        barData.push(x.revenue / 1000);
        let res = data.find((y: { revenue_year: number; revenue_month: number; revenue: number; }) => {
          return x.revenue_month === y.revenue_month && (x.revenue_year - 1) === y.revenue_year;
        });
        let num = (x.revenue / res.revenue - 1) * 100
        lineData.push(Number(num.toFixed(2)));
        tdata.push({
          date: x.revenue_year + '-' + x.revenue_month,
          barData: x.revenue / 1000,
          lineData: Number(num.toFixed(2))
        });
      });
      chartOption.xAxis.data = xData;
      chartOption.series[0].data = barData;
      chartOption.series[1].data = lineData;
      if (!chartObjRef.current) {
        chartObjRef.current = echarts.init(chartRef.current)
      }
      chartObjRef.current.setOption(chartOption, true);
      setTableData(tdata);
    })()
  }, [date]);
  useEffect(() => {
    let id = pathName.split('/')[2];
    (async () => {
      let { data } = await getInfoData(id);
      setInfo(data[0] || null)
    })()
  }, []);
  return (
    <>
      <div className={styles.card}>
        {
          info?.stock_name ? <div>{info && info.stock_name}（{info && info.stock_id}）</div> : '加载中...'
        }
      </div>
      <div className={styles.card}>
        <div className={styles.wrap}>
          <div className={styles.title}>每月营收</div>
          <FormControl size='small' sx={{
            width: '100px'
          }}>
            <InputLabel id="demo-simple-select-label">时间</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={5}>近三年</MenuItem>
              <MenuItem value={7}>近五年</MenuItem>
              <MenuItem value={10}>近八年</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div ref={chartRef} className={styles.chart}></div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>详细数据</div>
        <div className={styles.tbody}>
          <div className={styles.thead}>
            <div className={styles.td}>年度月份</div>
            <div className={styles.td}>每月营收</div>
            <div className={styles.td}>单月营收年增率(%)</div>
          </div>
          {
            tableData.map((x: tableType, index: number) => {
              return (
                <div key={index} className={styles.tr}>
                  <div className={styles.td}>{x.date}</div>
                  <div className={styles.td}>{x.barData}</div>
                  <div className={styles.td}>{x.lineData}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}