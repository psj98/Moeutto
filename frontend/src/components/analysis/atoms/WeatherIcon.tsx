interface WeatherIcon {
  name: string;
  num: number;
  icon: string;
}

  // 해: 1, 구름: 2, 해&구름: 3, 비: 4, 눈: 5, 번개: 6 
const WeatherIconList: WeatherIcon[] = [
  { name: '안개', num: 7, icon: 'cloud/35.png' },
  { name: '맑음', num: 1, icon: 'sun/26.png' },
  { name: '흐림', num: 2, icon: 'sun/27.png' },
  { name: '바람', num: 3, icon: 'sun/6.png' },
  { name: '비', num: 4, icon: 'cloud/7.png' },
  { name: '눈', num: 5, icon: 'cloud/18.png' },
  { name: '천둥', num: 6, icon: 'cloud/12.png' },
];

export default WeatherIconList;
