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
