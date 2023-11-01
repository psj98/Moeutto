import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CardProps } from '../../../pages/MyClosetReportPage';

const Card = styled.div`
  width: 366px;
  height: 204px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: end;
  padding: 30px;
  margin: 30px;
`;

const ReportCard = ({ contents, url }: CardProps) => {
  return (
    <Link to={url}>
      <Card>
        <div className="text-WebBody2">{contents}</div>
      </Card>
    </Link>
  );
};

export default ReportCard;
