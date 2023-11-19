import React, { ChangeEvent, Ref } from 'react';
import styled from 'styled-components';
import { PiTShirtDuotone } from 'react-icons/pi';
import { Bounce } from 'react-awesome-reveal';

interface PictureInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: Ref<HTMLInputElement>;
}

const Image = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  input {
    display: none;
  }

  label {
    border: 1px solid black;
    border-radius: 35px;
    width: calc(70vw * 0.8 * 0.7);
    height: calc(70vw * 0.8 * 0.7);
    max-width: 460px;
    max-height: 460px;
    position: relative;
    display: flex;
    flex-direction: col;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    @media screen and (max-width: 500px) {
      width: calc(70vw * 0.8);
      height: calc(70vw * 0.8);
    }
  }
`;

const ImageInput = ({ onChange, inputRef }: PictureInputProps) => {
  return (
    <Image>
      <label htmlFor="pic">
        <input id="pic" type="file" onChange={onChange} ref={inputRef} />
        <Bounce triggerOnce>
          <PiTShirtDuotone size={80} />
        </Bounce>
      </label>
    </Image>
  );
};

export default ImageInput;
