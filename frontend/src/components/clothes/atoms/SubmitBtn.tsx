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
        <button
          className={
            'bg-pink-hot w-[150px] text-center rounded-xl shadow-xl hover:text-black focus:text-black text-white text-AppBody1 p-4 pe-3 tracking-[5px] font-bold mr-[150px]'
          }
          onClick={handleSubmit}>
          {path === 'notmycloset' ? '제안하기' : '제출하기'}
        </button>
      </div>
    </>
  );
};

export default SubmitBtn;
