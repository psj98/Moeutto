import * as React from 'react';
// import { Link } from 'react-router-dom';
// import AddClothFormTemplate from '../components/add/templates/AddClothFormTemplate';
import ClosetReportTemplate from '../components/report/templates/ClosetReportTemplate';
import { ColorAmountProp } from '../components/report/atoms/DonutChart';

const myAnalysisColor: ColorAmountProp[] = [
  { color: 'red', amount: 2 },
  { color: 'blue', amount: 22 },
];

function ReportColorPage() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      {/* <AddClothFormTemplate /> */}

      <ClosetReportTemplate colorProps={myAnalysisColor} />
    </div>
  );
}

export default ReportColorPage;
