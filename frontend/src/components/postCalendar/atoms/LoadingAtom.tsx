import styled from 'styled-components';

const LoadingSection = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 추가된 부분 */
  opacity: 1;
  .loader {
    display: flex;

    justify-content: space-evenly;
    margin: auto auto;
  }

  .ball {
    list-style: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 3px 3px 1px 0 black;
  }

  .ball:nth-child(1) {
    animation: bounce-1 2.1s ease-in-out infinite;
  }

  @keyframes bounce-1 {
    50% {
      transform: translateY(-18px);
      background-color: #ff78a5;
    }
  }

  .ball:nth-child(2) {
    animation: bounce-3 2.1s ease-in-out 0.3s infinite;
    margin-left: 10px;
  }

  @keyframes bounce-2 {
    50% {
      transform: translateY(-18px);
      background-color: #ff78a5;
    }
  }

  .ball:nth-child(3) {
    animation: bounce-3 2.1s ease-in-out 0.6s infinite;
    margin-left: 10px;
  }

  @keyframes bounce-3 {
    50% {
      transform: translateY(-18px);
      background-color: #ff78a5;
    }
  }
`;

const Loading = () => {
  return (
    <LoadingSection>
      <div className="loader">
        <li className="ball"></li>
        <li className="ball"></li>
        <li className="ball"></li>
      </div>
    </LoadingSection>
  );
};

export default Loading;
