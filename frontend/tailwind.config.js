/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'gray-button': '#F5F5F5', // 옷장보기 탭 버튼 배경 그레이
        'gray-dark': '#9A9A9A', // 위로가기 아래로 가기 버튼 배경 그레이
        deepblack: '#131313',
        'pink-light': '#FFEBF6', // 옷장보기 탭 버튼 배경 핑크
        pink: '#FAA0BF', // 북마크 핑크
        'pink-dark': '#FFBAD2', // 방명록 모달 배경 핑크
        'pink-hot': '#FF78A5', // 메인 옷 제안 today 장식 배경 핑크
      },
      fontSize: {
        WebTitle: '48px',
        WebBody1: '24px',
        WebBody2: '20px',
        WebBody3: '16px',
        WebBody4: '12px',
        AppTitle1: '32px',
        AppTitle2: '20px',
        AppBody1: '20px',
        AppBody2: '16px',
        AppBody3: '12px',
      },
    },
  },
  plugins: [],
};
