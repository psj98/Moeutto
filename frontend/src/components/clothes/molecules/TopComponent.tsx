import React, { Dispatch } from 'react';
import styled from 'styled-components';

import PickTitle from '../../pickpick/atoms/PickTitle';
import SelectedCategory from '../../common/category/molecules/SelectedCategory';
import SubmitBtn from '../atoms/SubmitBtn';

const ButtonSection = styled.div`
  position: fixed;
  right: calc(50% - 200px); /* 중앙에서 오른쪽으로 175px 떨어진 위치 */
  transform: translate(0, -50%); /* 요소를 수직으로 중앙 정렬 */
  bottom: 100px;
`;

interface PropsType {
  selectedOptionMain: string;
  setSelectedOptionMain: Dispatch<React.SetStateAction<string>>;
  selectedOptionMiddle: string;
  setSelectedOptionMiddle: Dispatch<React.SetStateAction<string>>;
  selectedOptionSort: string;
  setSelectedOptionSort: Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const TopComponent: React.FC<PropsType> = ({
  selectedOptionMain,
  setSelectedOptionMain,
  selectedOptionMiddle,
  setSelectedOptionMiddle,
  selectedOptionSort,
  setSelectedOptionSort,
  handleSubmit,
}) => {
  return (
    <div className="mt-[50px] text-center  relative w-[100%]">
      <PickTitle />
      <div className="flex justify-between">
        <div>
          <SelectedCategory
            selectedOptionMain={selectedOptionMain}
            setSelectedOptionMain={setSelectedOptionMain}
            selectedOptionMiddle={selectedOptionMiddle}
            setSelectedOptionMiddle={setSelectedOptionMiddle}
            selectedOptionSort={selectedOptionSort}
            setSelectedOptionSort={setSelectedOptionSort}
          />
        </div>
        <ButtonSection>
          <SubmitBtn handleSubmit={handleSubmit} />
        </ButtonSection>
      </div>
    </div>
  );
};

export default TopComponent;
