// /* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
// import './style.css';

const CanvasSection = styled.div<{ w: string }>`
  canvas {
    width: ${props => props.w}px;
    height: ${props => props.w}px;
  }
`;

// //to get points from svg;
// //https://shinao.github.io/PathToPoints/
// //https://github.com/Shinao/PathToPoints

const PostEditorTemplate = () => {
  const canvasRef = useRef(null);
  // const [canvas, setCanvas] = useState(null);
  const [width, setWidth] = useState<string>('');
  let canvas = null;
  // 이미지 url store에서 가져오기
  const selectedClosetUrls = useSelector((state: RootState) => state.post.selectedClosetUrls);
  const imgUrl = selectedClosetUrls[selectedClosetUrls.length - 1];

  const capture = e => {
    e.preventDefault(); // preventDefault 함수를 호출해 이벤트를 중지

    // 캔버스 렌더링 강제 호출
    canvas.renderAll();
    // canvasRef.current.renderAll();
    window.scroll(0, 0);
    // HTML2Canvas 실행
    html2canvas(window.document.querySelector('#canvas'), {
      // canvasRef에서 실제 캔버스 엘리먼트를 가져와서 사용
      allowTaint: true,
      foreignObjectRendering: true,
      useCORS: true,
    }).then(pic => {
      console.log(pic.toDataURL('image/png'), 'image.png');
      console.log(pic);
    });

    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();

      console.log(dataUrl);
    }
  };
  const handleAddImage = () => {
    if (!imgUrl || !canvas) {
      return; // Return early if imgUrl or canvas is not available
    }

    const image = new Image() as HTMLImageElement;

    image.onload = function () {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      const imgWidth = image.width;
      const imgHeight = image.height;

      // Calculate the scale to fit the image within the canvas
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

      image.crossOrigin = 'anonymous'; // Set crossOrigin after creating the image

      image.src = imgUrl; // Load the image after setting crossOrigin

      image.addEventListener('load', function () {
        image.onload = null; // Remove the onload listener

        image.set({
          scaleX: scale,
          scaleY: scale,
          left: (canvasWidth - imgWidth * scale) / 2,
          top: (canvasHeight - imgHeight * scale) / 2,
        });

        // Add the image to the canvas
        canvas.add(new fabric.Image(image));
      });
    };
  };

  // canvas 정사각형으로 정의하기 위함

  useEffect(() => {
    canvas = new fabric.Canvas('canvas'); // 'canvas'는 캔버스 엘리먼트의 ID나 DOM 엘리먼트로 변경

    // canvas를 정사각형으로 하기 위해 width 를 계산합니다
    const canvasSection = document.getElementById('canvasSection');

    // canvas를 꽉 차는 정사각형으로 만들기 위해 width를 설정
    setWidth(canvasSection.clientWidth.toString());

    console.log('******width:', width);
    console.log(imgUrl);
  }, []);

  useEffect(() => {
    handleAddImage();
  }, [selectedClosetUrls.length]);

  return (
    <>
      <div className="my-6">오늘 입은 옷을 선택해서 기록해봐요</div>
      <button type="button" onClick={capture}>
        capture
      </button>
      <CanvasSection className={`w-[100%] h-[${width}px] rounded-xl border-4 mb-10`} w={width} id="canvasSection">
        <canvas id="canvas" ref={canvasRef} />
      </CanvasSection>
    </>
  );
};

export default PostEditorTemplate;
