import React, { SetStateAction } from 'react';
import { Fade } from 'react-awesome-reveal';
import Label from '../atoms/Label';
import ColorRadioInput from '../atoms/ColorRadioInput';
import ColorPalette from '../../common/ColorPalette';

interface Color {
  name: string;
  background: string;
  number?: number;
}

interface AddClothFormProps {
  onChange: (value: SetStateAction<string>) => void;
}

// 서영의 코드에서 리팩토링하면 지울 data
export const colorList: Color[] = [
  { name: '빨강', background: '#FFA7A7' },
  { name: '주황', background: '#FFA7A7' },
  { name: '노랑', background: '#FDFF9E' },
  { name: '초록', background: '#A0FF90' },
  { name: '파랑', background: '#BEADFF' },
  { name: '보라', background: '#D09AD9' },
  { name: '핑크', background: '#FF98D6' },
  { name: '카키', background: '#C0AE6F' },
  { name: '검정', background: '#131313' },
  { name: '하양', background: '#FFF' },
  { name: '회색', background: '#E2E2E2' },
  { name: '혼합', background: 'linear-gradient(180deg, #F19494 0%, #FFFCBC 51.56%, #22D7FF 86.98%, #DF18FF 100%)' },
];

const ColorInput = ({ onChange }: AddClothFormProps) => {
  return (
    <>
      <Label id="color" value="옷의 색깔" isEssential={true} />
      <div className="flex flex-wrap">
        <Fade delay={1e1} cascade direction="down" damping={0.1} triggerOnce>
          {ColorPalette.map((option, index) => {
            return (
              <ColorRadioInput
                key={index}
                type="radio"
                option={option}
                value="color"
                onChange={event => onChange(event.target.checked ? option.name : '')}
              />
            );
          })}
        </Fade>
      </div>
    </>
  );
};

export default ColorInput;
