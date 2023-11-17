import React from 'react';
import styled from 'styled-components';

interface ItemPropsType {
  imgUrl: string;
  clothesId: string;
}

const Image = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(106, 106, 106, 0.25));
  background-color: white;
`;

const ClothItem = ({ imgUrl, clothesId }: ItemPropsType) => {
  return (
    <>
      <Image
        src={imgUrl}
        id={clothesId}
        alt={clothesId}
        className={`w-[159px] h-[159px] border border-gray rounded-[10px] mb-4`}
      />
    </>
  );
};

export default ClothItem;
