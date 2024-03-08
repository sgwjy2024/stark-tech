'use client';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SearchType {
  stock_name: string;
  stock_id: string;
  industry_category: string;
}
interface PropsType {
  size?: any;
  width?: number;
}

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo`);
  return res.json();
};

export default function Search(props: PropsType) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly SearchType[]>([]);
  const loading = open && options.length === 0;
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const { data } = await getData();
      const res = data.filter((item: { stock_id: any; }, index: any, self: any[]) => {
        return index === self.findIndex((t: { stock_id: any; }) => t.stock_id === item.stock_id)
      });
      setOptions(res);
    })();
  }, []);

  const handleOnValueChange = (event: any, newValue: SearchType | null) => {
    console.log(newValue);
    if(!newValue || !newValue.stock_id) {
      return;
    }
    setTimeout(() => {
      router.push(`/analysis/${newValue?.stock_id}/monthly-revenue`);
    }, 200);
  }

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: props.width || 500 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        size={props.size || 'medium'}
        onChange={handleOnValueChange}
        isOptionEqualToValue={(option, value) => option.stock_name === value.stock_name}
        getOptionLabel={(option) => `${option.stock_id} ${option.stock_name} ${option.industry_category}`}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="输入台/美股代号，查看公司市值"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
}