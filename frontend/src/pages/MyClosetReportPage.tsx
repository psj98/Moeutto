import * as React from 'react';
import ClosetReportMainOrganism from '../components/report/organisms/ClosetReportMainOrganism';
import MyClosetBar from '../components/common/MyClosetBar';
import rainbow from '../../src/assets/images/report/rainbow.jpg';
import frequency from '../../src/assets/images/report/frequency.jpg';
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
  {
    title: '나는 무슨 색을 많이 샀을까?',
    url: 'color',
    copy: '무슨 색을 가장 좋아하세요? 좋아하는 색과 가장 많은 색이 일치하는지 확인해봐요.',
    photo: rainbow,
  },
  {
    title: '나는 지금 어떤 계절에 살고 있을까?',
    url: 'season',
    copy: '혹시 시간 여행자인가요? 지금 옷장에서 어떤 계절의 옷이 가장 많은지 알려줄게요.',
    photo: season,
  },
  {
    title: '나는 어떤 옷을 많이 입을까?',
    url: 'frequency',
    copy: '가장 많이 입은 옷과 가장 적게 입은 옷을 알려줄게요. 자주 안 입는 옷을 기부한다면 기쁠 거예요.',
    photo: frequency,
  },
  {
    title: '나는 옷장에 얼마를 썼을까?',
    url: 'costs',
    copy: '옷장에 차가 한 대 있을지도 몰라요. 내가 지출한 금액을 모두 알려줄게요.',
    photo: money,
  },
  {
    title: '나는 다른 사람보다 옷이 많을까?',
    url: 'volume',
    copy: '옷장에서 옷의 개수를 모으또 유저와 비교한다면 맥시멀리스트인지 미니멀리스트인지 알 수 있을 거예요.',
    photo: volume,
  },
  {
    title: '나는 맨날 같은 옷만 입을까?',
    url: 'usability',
    copy: `스폰지밥 집에는 같은 옷만 가득하답니다. 스폰지밥처럼 같은 옷만 입고 사람인지 알려줄게요.`,
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
