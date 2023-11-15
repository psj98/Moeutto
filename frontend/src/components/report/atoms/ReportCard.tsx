/* eslint-disable */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CardProps } from '../../../pages/MyClosetReportPage';

const Card = styled.div<{ photo?: string }>`
  position: relative;
  width: 90%;
  height: 160px;
  flex-shrink: 0;
  text-align: left;
  display: flex;
  align-items: end;
  justify-content: start;
  margin-bottom: 40px;
  color: black;
  background: none;
  font-weight: 800;
  padding: 10px;
  word-wrap: break-word;
  box-sizing: border-box;
  border: 1px rgba(233, 233, 233, 0.25) solid;
  border-radius: 10px;
  &:hover {
    /* font-weight: 900; */
    color: white;
  }
  &::after {
    box-sizing: border-box;
    content: ''; // Added content property for the pseudo-element
    position: absolute;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 160px;
    background-image: url(${props => props.photo});
    background-size: 120%;
    background-position: left 80%;
    filter: grayscale(0.9) blur(1px);
    opacity: 0.8;
    border-radius: 10px;
  }

  &:hover::after {
    filter: grayscale(0);
    /* box-shadow: 0 0 0 3px #000 inset; */
    background-image: linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0.009) 11.7%,
        hsla(0, 0%, 0%, 0.034) 22.1%,
        hsla(0, 0%, 0%, 0.072) 31.2%,
        hsla(0, 0%, 0%, 0.123) 39.4%,
        hsla(0, 0%, 0%, 0.182) 46.6%,
        hsla(0, 0%, 0%, 0.249) 53.1%,
        hsla(0, 0%, 0%, 0.32) 58.9%,
        hsla(0, 0%, 0%, 0.394) 64.3%,
        hsla(0, 0%, 0%, 0.468) 69.3%,
        hsla(0, 0%, 0%, 0.54) 74.1%,
        hsla(0, 0%, 0%, 0.607) 78.8%,
        hsla(0, 0%, 0%, 0.668) 83.6%,
        hsla(0, 0%, 0%, 0.721) 88.7%,
        hsla(0, 0%, 0%, 0.762) 94.1%,
        hsla(0, 0%, 0%, 0.79) 100%
      ),
      url(${props => props.photo});
    transition: background-size 0.3s ease; // Added transition for a smoother effect
    background-size: 130%; // Adjust this value to control the amount of enlargement
    /* border: 3px black solid; */
    border-radius: 10px;
  }
`;

const ReportCard = ({ title, copy, url, photo }: CardProps) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(url);
  }
  return (
    <Card photo={photo} onClick={() => handleClick()}>
      <div className="text-AppBody1 card">
        {title}
        <div className="text-AppBody2 font-400">{copy}</div>
      </div>
    </Card>
  );
};

export default ReportCard;
