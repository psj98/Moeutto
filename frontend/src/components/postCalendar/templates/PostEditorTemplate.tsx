/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
// import './style.css';

const CanvasSection = styled.div<{ w: string }>`
  .sample-canvas,
  .canvas-container {
    width: ${props => props.w + 'px'};
    height: ${props => props.w + 'px'};
  }
`;

// //to get points from svg;
// //https://shinao.github.io/PathToPoints/
// //https://github.com/Shinao/PathToPoints

const PostEditorTemplate = ({ useRef }) => {
  const selectedClosetUrls = useSelector((state: RootState) => state.post.selectedClosetUrls);
  const [canvasWidth, setCanvasWidth] = useState('');
  const [width, setWidth] = useState('');
  let imgUrl =
    'https://images.khan.co.kr/article/2023/06/11/news-p.v1.20230611.77624bb028e644958ffbebeb00a404cb_P1.png';
  const { selectedObjects, editor, onReady } = useFabricJSEditor();

  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  const img = document.createElement('img');
  img.src = deleteIcon;

  // Fabric.js 객체 설정
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = 'pink';
  fabric.Object.prototype.cornerStyle = 'circle';

  useEffect(() => {
    // canvas를 정사각형으로 하기 위해 width 를 계산합니다
    // const width = document.getElementById('canvasSection').clientWidth;

    // setCanvasWidth(width.toString());

    const canvasSection = document.getElementById('canvasSection');

    // canvas를 정사각형으로 만들기 위해 width를 계산
    const width = canvasSection.clientWidth;
    setWidth(width.toString());
  }, []);

  useEffect(() => {
    const len = selectedClosetUrls.length;
    imgUrl = selectedClosetUrls[len - 1];
    onAddImage();
  }, [selectedClosetUrls.length]);

  // const onAddCircle = () => {
  //   //console.log(editor);
  //   editor?.addCircle();
  // };
  // let color = 55;
  // const onAddLine = () => {
  //   //console.log(editor);
  //   editor?.addLine();
  // };

  const renderIcon = (ctx, left, top, styleOverride, fabricObject) => {
    var size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
  const onDelete = () => {
    editor?.deleteSelected();
    console.log(selectedObjects);
    return false;
  };
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: onDelete,
    render: renderIcon,
    // cornerSize: 24,
  });

  const HideControls = {
    tl: true,
    tr: true,
    bl: true,
    br: true,
    mt: false, // middle top disable
    mb: false, // midle bottom
    ml: false, // middle left
    mr: false, // I think you get it
    mtr: true,
  };

  const onAddImage = () => {
    console.log('imgUrl:', imgUrl);

    fabric.Image.fromURL(imgUrl, function (pic) {
      pic.setControlsVisibility(HideControls);
      const canvasWidth = editor?.canvas.width || 0;
      const canvasHeight = editor?.canvas.height || 0;
      const imgWidth = pic.width || 0;
      const imgHeight = pic.height || 0;

      if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
        const scale = Math.min((canvasWidth / imgWidth) * 0.5, (canvasHeight / imgHeight) * 0.5);
        pic.scale(scale);
      }

      pic.set({
        left: (canvasWidth - pic.width * pic.scaleX) / 2,
        top: (canvasHeight - pic.height * pic.scaleY) / 2,
      });

      editor?.canvas.add(pic); // 이미지를 캔버스에 추가
    });
  };

  return (
    <>
      <div className="my-6">오늘 입은 옷을 선택해서 기록해봐요</div>
      <CanvasSection className="w-[100%] rounded-xl border-4 mb-10" w={width} id="canvasSection">
        <div>
          {/* <button onClick={onAddCircle}>Add Circle</button> */}
          {/* <button onClick={onAddImage}>Add Image</button>
        <button onClick={onDelete}>Delete</button> */}
          {width ? <FabricJSCanvas className={`sample-canvas`} onReady={onReady} /> : null}
        </div>
      </CanvasSection>
    </>
  );
};

export default PostEditorTemplate;
