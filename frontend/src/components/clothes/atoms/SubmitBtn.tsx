import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface PropsType {
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const themeLight = createTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
});

const SubmitBtn: React.FC<PropsType> = ({ handleSubmit }) => {
  const pathname = window.location.href;
  const path = pathname.split('/')[3];

  return (
    <>
      <div className="flex w-full h-full items-center justify-center">
        <ThemeProvider theme={themeLight}>
          <button
            className={
              'bg-pink-hot w-[150px] text-center rounded-xl shadow-xl text-white text-AppBody1 p-4 tracking-[10px] font-bold mr-[150px]'
            }
            onClick={handleSubmit}></button>
          <Button
            variant="contained"
            // color="success"
            className="bg-pink-hot w-[150px] text-center rounded-xl shadow-xl text-white text-AppBody1 p-4 tracking-[10px] font-bold mr-[150px]">
            {path === 'notmycloset' ? '제안하기' : '제출하기'}
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
};

export default SubmitBtn;
