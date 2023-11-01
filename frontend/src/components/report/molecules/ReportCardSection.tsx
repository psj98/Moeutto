import styled from 'styled-components';
import ReportCard from '../atoms/ReportCard';
import { CardProps } from '../../../pages/MyClosetReportPage';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ReportCardSection = ({ CardPropsArray }: { CardPropsArray: CardProps[] }) => {
  return (
    <Container>
      {CardPropsArray.map(item => (
        <ReportCard contents={item.contents} url={item.url} />
      ))}
    </Container>
  );
};

export default ReportCardSection;
