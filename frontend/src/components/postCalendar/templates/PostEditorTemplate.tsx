/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
// import './style.css';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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

const PostEditorTemplate = () => {
  const target = useRef(null);
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
    // onAddImage(); // 방법1
    // 클라이언트에서 이미지 로드 실행
    loadAndAddImageFromServer(); // 방법 2
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

  //   /////////////////// 제대로 작동함 ///////////////////////////////////
  //   ///////////////// URL  캐싱을 방지하기 위해 무의미한 파람을 추가함 ////////
  // const onAddImage = () => {
  //   ////////////////////////////////////////////////////////////////////

  //   fabric.Image.fromURL(imgUrl + '?timestamp=' + new Date().getTime(), function (pic) {
  //     pic.setControlsVisibility(HideControls);
  //     pic.crossOrigin = 'anonymous'; // 필수
  //     pic.setSrc(imgUrl + '?v=' + new Date().getTime());
  //     console.log(pic.getSrc(), '******************************');
  //     const canvasWidth = editor?.canvas.width || 0;
  //     const canvasHeight = editor?.canvas.height || 0;
  //     const imgWidth = pic.width || 0;
  //     const imgHeight = pic.height || 0;

  //     if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
  //       const scale = Math.min((canvasWidth / imgWidth) * 0.5, (canvasHeight / imgHeight) * 0.5);
  //       pic.scale(scale);
  //     }

  //     pic.set({
  //       left: (canvasWidth - pic.width * pic.scaleX) / 2,
  //       top: (canvasHeight - pic.height * pic.scaleY) / 2,
  //     });

  //     editor?.canvas.add(pic); // 이미지를 캔버스에 추가
  //     editor?.canvas.renderAll();
  //   });

  //   ////////////////////////////////////////////////////////////

  // };
  function loadAndAddImageFromServer() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = imgUrl;

    fetch(proxyUrl + targetUrl).then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.arrayBuffer();
    });

    fetch(proxyUrl + targetUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const base64Flag = 'data:image/jpeg;base64,';
        const imageStr = arrayBufferToBase64(buffer);

        fabric.Image.fromURL(base64Flag + imageStr, function (img) {
          console.log(img);
          img.setControlsVisibility(HideControls);
          img.crossOrigin = 'anonymous'; // Set crossOrigin directly on the fabric.js image

          const canvasWidth = editor?.canvas.width || 0;
          const canvasHeight = editor?.canvas.height || 0;
          const imgWidth = img.width || 0;
          const imgHeight = img.height || 0;
          if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
            const scale = Math.min((canvasWidth / imgWidth) * 0.5, (canvasHeight / imgHeight) * 0.5);
            img.scale(scale);
          }
          img.set({
            left: (canvasWidth - img.width * img.scaleX) / 2,
            top: (canvasHeight - img.height * img.scaleY) / 2,
          });
          console.log('crossOrigin attribute of the image:', img.crossOrigin);
          editor?.canvas.add(img);
          editor?.canvas.renderAll;
        });
      })
      .catch(error => {
        console.error('Failed to load image from server:', error);
      });

    function arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    }
  }

  const capture = e => {
    // 이미지 추가 및 다른 오브젝트 추가 로직
    e.preventDefault;
    // const c = document.querySelector('#canvasSection');
    const cc = document.getElementsByClassName('sample-canvas')[0];
    // 1번
    htmlToImage
      .toPng(target.current, { cacheBust: true })
      .then(function (dataUrl) {
        // var img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(img);
        console.log(dataUrl);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    // // 2번
    // // 캔버스 렌더링 강제 호출
    // editor?.canvas.renderAll();
    // // HTML2Canvas 실행
    // html2canvas(cc as HTMLElement, {
    //   allowTaint: true,
    //   foreignObjectRendering: true,
    //   useCORS: true,
    // }).then(canvas => {
    //   console.log(canvas.toDataURL('image/png'), 'image.png');
    //   console.log(canvas);
    // });
  };

  return (
    <>
      <div className="my-6">오늘 입은 옷을 선택해서 기록해봐요</div>
      <button type="button" onClick={capture}>
        capture
      </button>
      <CanvasSection className="sample w-[100%] rounded-xl border-4 mb-10" w={width} id="canvasSection" ref={target}>
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
