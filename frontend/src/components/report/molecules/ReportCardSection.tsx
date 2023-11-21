import styled from 'styled-components';
import ReportCard from '../atoms/ReportCard';
import { CardProps } from '../../../pages/MyClosetReportPage';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ReportCardSection = ({ CardPropsArray }: { CardPropsArray: CardProps[] }) => {
  return (
    <Container>
      {CardPropsArray.map((item, index) => (
        <ReportCard key={index} title={item.title} url={item.url} copy={item.copy} photo={item.photo} />
      ))}
    </Container>
  );
};

export default ReportCardSection;
