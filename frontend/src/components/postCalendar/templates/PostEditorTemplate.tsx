// /* eslint-disable */
import React, { useState, useEffect, useRef, MouseEventHandler } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import styled from 'styled-components';
import * as htmlToImage from 'html-to-image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface Props {
  setFile: any;
}

const CanvasSection = styled.div<{ w: string }>`
  .sample-canvas,
  .canvas-container {
    width: ${props => `${props.w}px`};
    height: ${props => `${props.w}px`};
  }
`;

const PostEditorTemplate = ({ setFile }: Props) => {
  const target = useRef(null);
  const selectedClosetUrls = useSelector((state: RootState) => state.post.selectedClosetUrls);
  const [width, setWidth] = useState('');
  let imgUrl = '';
  const { editor, onReady } = useFabricJSEditor();
  const [real, setReal] = useState<File>();

  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  const icon = document.createElement('img');

  icon.src = deleteIcon;

  // Fabric.js 객체 설정 : 이 설정은 active된 오브젝트에 영향을 준다
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = 'pink';
  fabric.Object.prototype.cornerStyle = 'circle';
  // delete icon을 생성한다.
  // eslint-disable //
  const renderIcon = (ctx, left, top, styleOverride, fabricObject) => {
    const size = 24;

    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };

  const onDelete = () => {
    editor?.deleteSelected();
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

  function loadAndAddImageFromServer() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = imgUrl;

    fetch(proxyUrl + targetUrl).then(response => {
      // if (!response.ok) {
      //   throw new Error(`HTTP error${response.status}`);
      // }
      return response.arrayBuffer();
    });

    function arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = [].slice.call(new Uint8Array(buffer));

      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    }

    fetch(proxyUrl + targetUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const base64Flag = 'data:image/jpeg;base64,';
        const imageStr = arrayBufferToBase64(buffer);

        fabric.Image.fromURL(base64Flag + imageStr, function (img) {
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

          editor?.canvas.add(img);
          editor?.canvas.renderAll();
        });
      })
      .catch(error => {
        console.error('Failed to load image from server:', error);
      });
  }

  const capture: MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // 이미지 추가 및 다른 오브젝트 추가 로직
    // htmlToImage library

    // function dataURLtoFile(dataurl, filename) {
    //   // 데이터 URL에서 Base64 부분을 추출
    //   const base64String = dataurl.split(',')[1];

    //   const byteCharacters = atob(base64String);
    //   const byteNumbers = new Array(byteCharacters.length);

    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }

    //   const byteArray = new Uint8Array(byteNumbers);

    //   // ArrayBuffer로 변환
    //   const buffer = byteArray.buffer;

    //   // Blob로 변환
    //   const blob = new Blob([buffer], { type: 'image/jpeg' }); // 원하는 MIME 타입으로 변경

    //   // Blob에서 File 생성
    //   const file = new File([blob], filename, { type: blob.type });

    //   return file;
    // }

    htmlToImage
      .toPng(target.current, { cacheBust: true })
      .then(function (dataUrl) {
        console.log(dataUrl);
        // setFile(dataUrl);
        // const IMG = dataURLtoFile(dataUrl, 'file.png');
        const formData = new FormData();

        formData.append('imageUrl', real); // 이제 파일 크기가 0이 아니어야 함
        console.log(formData);

        for (const values of formData.values()) {
          console.log('아 폼에 있냐고~~~~~~~~~', values);
        }
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });

    // htmlToImage
    //   .toBlob(target.current, { cacheBust: true })
    //   .then(function (dataUrl) {
    //     console.log(dataUrl);
    //     const payloadFile = new File([dataUrl], 'file.png', { type: dataUrl.type });
    //     const formData = new FormData();

    //     formData.append('imageUrl', payloadFile); // 이제 파일 크기가 0이 아니어야 함
    //     setFile(formData);
    //     console.log(formData, '%%%%%%%%%%%%%%%%%%%%%%%%');
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
  };

  useEffect(() => {
    // canvas를 정사각형으로 하기 위해 width 를 계산합니다
    const canvasSection = document.getElementById('canvasSection');

    // canvas를 정사각형으로 만들기 위해 현재 전체 영역 width를 계산
    const spaceWidth = canvasSection.clientWidth;

    setWidth(spaceWidth.toString());
  }, []);

  useEffect(() => {
    const len = selectedClosetUrls.length;

    imgUrl = selectedClosetUrls[len - 1];

    loadAndAddImageFromServer();
  }, [selectedClosetUrls.length]);

  return (
    <>
      <div className="my-6">오늘 입은 옷을 선택해서 기록해봐요</div>
      <button type="button" onClick={capture}>
        capture
      </button>
      <input
        type="file"
        onChange={e => {
          const selectedFile: File = e.target.files[0];

          console.log(selectedFile);
          console.log(real);
          setReal(prevReal => selectedFile); // Use a functional update here
        }}
      />

      <CanvasSection className="sample w-[100%] rounded-xl border-4 mb-10" w={width} id="canvasSection" ref={target}>
        <div>{width ? <FabricJSCanvas className={`sample-canvas`} onReady={onReady} /> : null}</div>
      </CanvasSection>
    </>
  );
};

export default PostEditorTemplate;
