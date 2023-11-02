import * as React from 'react';
import ClosetReportMainOrganism from '../components/report/organisms/ClosetReportMainOrganism';
import MyClosetBar from '../components/common/MyClosetBar';

export interface CardProps {
  contents: string; // 카드 내용
  url: string; // 카드 클릭하면 가야하는 url
}

export const cardArray: CardProps[] = [
  { contents: '나는 어떤 색의 옷이 많을까?', url: 'color' },
  { contents: '내 옷장의 계절은 언제일까?', url: 'season' },
];

function MyClosetReport() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      {/* <AddClothFormTemplate /> */}
      <MyClosetBar state={3} />
      <ClosetReportMainOrganism CardPropsArray={cardArray} />
      {/* <ClosetReportTemplate colorProps={myAnalysisColor} /> */}
    </div>
  );
}

export default MyClosetReport;
