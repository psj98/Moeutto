import styled from 'styled-components';
import ReportCard from '../atoms/ReportCard';
import { CardProps } from '../../../pages/MyClosetReportPage';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ReportCardSection = ({ CardPropsArray }: { CardPropsArray: CardProps[] }) => {
  return (
    <Container>
      {CardPropsArray.map((item, index) => (
        <ReportCard key={index} contents={item.contents} url={item.url} />
      ))}
    </Container>
  );
};

export default ReportCardSection;
