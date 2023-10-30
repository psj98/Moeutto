import React from 'react';
import styled from 'styled-components';

interface LabelProps {
  id: string;
  value: string;
}

const Labelsection = styled.div`
  width: 100%;
  text-align: left;
  margin: 20px 0 5px 0;
`;

const Label = ({ id, value }: LabelProps) => {
  return (
    <Labelsection>
      <label htmlFor={id} className="font-WebBody2">
        {value}
      </label>
    </Labelsection>
  );
};

export default Label;
