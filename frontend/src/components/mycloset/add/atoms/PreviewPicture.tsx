// 미리보기 이미지를 위한 컴포넌트
import React from 'react';

const PreviewImage = ({ imageSrc }) => {
  return <img src={imageSrc} alt="Preview" />;
};

export default PreviewImage;
