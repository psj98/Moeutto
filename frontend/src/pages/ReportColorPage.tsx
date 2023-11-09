import * as React from 'react';
// import { Link } from 'react-router-dom';
// import AddClothFormTemplate from '../components/add/templates/AddClothFormTemplate';
import ClosetReportTemplate from '../components/report/templates/ClosetReportTemplate';
import { ColorAmountProp } from '../components/report/atoms/DonutChart';

export interface AnalysisData {
  myAnalysisColor: ColorAmountProp[];
  otherAnalysisColor: ColorAmountProp[];
}

const myAnalysisColor: ColorAmountProp[] = [
  { color: 'red', amount: 2 },
  { color: 'blue', amount: 10 },
  { color: 'purple', amount: 22 },
];

const otherAnalysisColor: ColorAmountProp[] = [
  { color: 'red', amount: 2 },
  { color: 'blue', amount: 22 },
  { color: 'pink', amount: 2 },
  { color: 'yellow', amount: 10 },
];

// value 기준으로 내림차순 정렬
myAnalysisColor.sort(function (a, b) {
  if (a.amount > b.amount) {
    return -1;
  }
  if (a.amount < b.amount) {
    return 1;
  }
  // a must be equal to b
  return 0;
});

// value 기준으로 내림차순 정렬
otherAnalysisColor.sort(function (a, b) {
  if (a.amount > b.amount) {
    return -1;
  }
  if (a.amount < b.amount) {
    return 1;
  }
  // a must be equal to b
  return 0;
});

const analysisData: AnalysisData = { myAnalysisColor, otherAnalysisColor };

function ReportColorPage() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      <ClosetReportTemplate analysisData={analysisData} />
    </div>
  );
}

export default ReportColorPage;
