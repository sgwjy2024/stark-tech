'use client';
import styles from './sidenav.module.css';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";

interface childType {
  name: string,
  key: string
}
interface parentType {
  name: string,
  color: string,
  children: childType[]
}

export default function SideNav() {
  const pathName = usePathname();
  const router = useRouter();
  const [child, setChild] = useState<childType[]>([]);
  const handleChildOnClick = (item: childType) => {
    router.push(`/analysis/${pathName.split('/')[2]}/${item.key}`);
  }
  const handleParentOnClick = (item: parentType) => {
    setChild(item.children)
    if (item.name === '最新动态') {
      router.push(`/analysis/${pathName.split('/')[2]}`);
    } else {
      router.push(`/analysis/${pathName.split('/')[2]}/${item.children[0].key}`);
    }
  }
  const getFlag = (item: parentType) => {
    let arr = pathName.split('/');
    if (arr.length === 3 && item.name === '最新动态') {
      return true;
    }
    let str = arr[arr.length - 1];
    let flag = false;
    item.children.forEach(child => {
      if (child.key === str) {
        flag = true;
      }
    });
    return flag;
  }
  useEffect(() => {
    let initArr: childType[] = [];
    let arr = pathName.split('/');
    let str = arr[arr.length - 1];
    menu.map(item => {
      let res = item.children.find(x => x.key === str);
      if (res) {
        initArr = item.children;
      }
    });
    setChild(initArr);
  }, [pathName])
  return (
    <div className={styles.container}>
      <ul className={styles.parent}>
        {
          menu.map((item: any) => {
            return (
              <li
                className={`${styles.parentItem} ${
                  getFlag(item) && styles.parentActive
                }`}
                key={item.name}
                onClick={() => {
                  handleParentOnClick(item)
                }}
              >
                <div className={styles.parentItemIcon}>
                  <AccountBalanceIcon fontSize='small' color={item.color} />
                </div>
                <div className={styles.parentItemName}>
                  {item.name}
                </div>
              </li>
            )
          })
        }
      </ul>
      <ul className={styles.child} style={{
        display: child.length ? 'block' : 'none'
      }}>
        {
          child && child.map((item: childType) => {
            return (
              <li
                className={`${styles.childItem} ${
                  pathName.includes(item.key) && styles.childActive
                }`}
                key={item.name}
                onClick={() => {
                  handleChildOnClick(item)
                }}
              >
                <div className={styles.parentItemName}>
                  {item.name}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const menu = [
  {
    name: '最新动态',
    color: 'inherit',
    children: []
  },
  {
    name: '财务报表',
    color: 'action',
    children: [
      {
        name: '每月营收',
        key: 'monthly-revenue'
      },
      {
        name: '每股盈余',
        key: 'eps'
      },
      {
        name: '每股净值',
        key: 'nav'
      },
      {
        name: '损益表',
        key: 'income-statement'
      },
      {
        name: '总资产',
        key: 'assets'
      },
      {
        name: '负债和股东权益',
        key: 'liabilities-and-equity'
      },
      {
        name: '现金流量表',
        key: 'cash-flow-statement'
      },
      {
        name: '股利政策',
        key: 'dividend-policy'
      },
      {
        name: '电子书',
        key: 'e-report'
      }
    ]
  },
  {
    name: '获利能力',
    color: 'disabled',
    children: [
      {
        name: '利润比例',
        key: 'profit-margin'
      }
    ]
  },
  {
    name: '安全性分析',
    color: 'primary',
    children: [
      {
        name: '财务结构比例',
        key: 'financial-structure-ratio'
      }
    ]
  },
  {
    name: '成长力分析',
    color: 'secondary',
    children: [
      {
        name: '月营收成长率',
        key: 'monthly-revenue-growth-rate'
      }
    ]
  },
  {
    name: '价值评估',
    color: 'error',
    children: [
      {
        name: '本益比评价',
        key: 'pe'
      }
    ]
  },
  {
    name: '董监与筹码',
    color: 'info',
    children: [
      {
        name: '分点筹码动向',
        key: 'broker-trading'
      }
    ]
  },
  {
    name: '关键指标',
    color: 'success',
    children: [
      {
        name: '长短期月营收年增率',
        key: 'long-term-and-short-term-monthly-revenue-yoy'
      }
    ]
  },
  {
    name: '产品组合',
    color: 'warning',
    children: [
      {
        name: '产品销售额',
        key: 'product-sales-figure'
      }
    ]
  }
]
