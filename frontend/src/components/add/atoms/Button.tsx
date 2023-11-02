import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = styled.button`
  width: 100%;
  border-radius: 20px;
  margin: 10px 0 50px 0;
  height: 60px;
  padding: 10px;
  background: var(--button-bg-gray, rgba(245, 245, 245, 0.64));
  box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const StyledButton = ({ value, onClick }: Props) => {
  return (
    <>
      <Button onClick={onClick}>{value}</Button>
    </>
  );
};

export default StyledButton;
