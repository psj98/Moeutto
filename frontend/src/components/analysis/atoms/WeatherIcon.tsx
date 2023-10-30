interface WeatherIcon {
  name: string;
  num: number;
  icon: string;
}

const WeatherIconList: WeatherIcon[] = [
  { name: '맑음', num: 0, icon: 'sun/26.png' },
  { name: '흐림', num: 1, icon: 'sun/27.png' },
  { name: '비', num: 2, icon: 'cloud/7.png' },
  { name: '바람', num: 3, icon: 'sun/6.png' },
  { name: '눈', num: 4, icon: 'cloud/18.png' },
  { name: '천둥', num: 5, icon: 'cloud/12.png' },
  { name: '안개', num: 6, icon: 'cloud/35.png' },
];

export default WeatherIconList;
