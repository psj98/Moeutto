import React from 'react';
import styled from 'styled-components';

interface LabelProps {
  id: string;
  value: string;
  isEssential?: boolean;
}

const Labelsection = styled.div`
  width: 100%;
  text-align: left;
  margin: 20px 0 5px 0;
  font-weight: 800;
`;

const Label = ({ id, value, isEssential }: LabelProps) => {
  return (
    <Labelsection>
      <label htmlFor={id} className="font-WebBody2">
        {value}
      </label>
      {!isEssential ? <span className="ms-1 text-grey text-[12px]">(선택사항)</span> : null}
    </Labelsection>
  );
};

export default Label;
