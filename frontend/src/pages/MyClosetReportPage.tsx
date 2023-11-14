import * as React from 'react';
import ClosetReportMainOrganism from '../components/report/organisms/ClosetReportMainOrganism';
import MyClosetBar from '../components/common/MyClosetBar';
import rainbow from '../../src/assets/images/report/rainbow.jpg';
import earth from '../../src/assets/images/report/earth.jpg';
import money from '../../src/assets/images/report/money.jpg';
import usability from '../../src/assets/images/report/usability.jpg';
import volume from '../../src/assets/images/report/volume.jpg';
import season from '../../src/assets/images/report/season.jpg';

export interface CardProps {
  title: string; // 카드 이름
  url: string; // 카드 클릭하면 가야하는 url
  copy: string; // 카드 내용
  photo: string;
}

export const cardArray: CardProps[] = [
  { title: '내 옷장은 알록달록할까요?', url: 'color', copy: '내 옷장에 무슨 색이 있는지 알려줄게요', photo: rainbow },
  {
    title: '내 옷장의 계절은 언제일까?',
    url: 'season',
    copy: '어떤 계절의 옷이 가장 많은지 알려줄게요',
    photo: season,
  },
  {
    title: '나는 어떤 옷을 많이 입을까?',
    url: 'frequency',
    copy: '가장 많이 입은 옷과 가장 적게 입은 옷을 알려줄게요',
    photo: earth,
  },
  {
    title: '내 옷장의 총 가격은 얼마일까?',
    url: 'costs',
    copy: '내가 지출한 금액을 모두 알려줄게요',
    photo: money,
  },
  {
    title: '나는 다른 사람보다 옷이 많을까?',
    url: 'volume',
    copy: '맥시멀리스트인지 미니멀리스트인지 판단해줄게요',
    photo: volume,
  },
  {
    title: '나는 맨날 같은 옷만 입을까?',
    url: 'usability',
    copy: '스폰지밥처럼 같은 옷만 입고 있는지 알려줄게요',
    photo: usability,
  },
];

function MyClosetReport() {
  return (
    <div className="w-[100%]">
      <MyClosetBar state={3} />
      <ClosetReportMainOrganism CardPropsArray={cardArray} />
    </div>
  );
}

export default MyClosetReport;
