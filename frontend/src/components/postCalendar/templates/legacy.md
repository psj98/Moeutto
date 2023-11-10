```javascript
/_ eslint-disable _/
import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { RootState } from '../../../redux/store';
import './style.css';

const CanvasSection = styled.div<{ w: string }>`  canvas,
  .sample-canvas,
  .canvas-container,
  .lower-canvas,
  .upper-canvas {
    width: ${props => props.w + 'px'};
    height: ${props => props.w + 'px'};
  }`;

// //to get points from svg;
// //https://shinao.github.io/PathToPoints/
// //https://github.com/Shinao/PathToPoints

const PostEditorTemplate = () => {
const [canvasWidth, setCanvasWidth] = useState('');
const [canvas, setCanvas] = useState('');
const [width, setWidth] = useState<string>('100');

// 이미지 url store에서 가져오기
const selectedClosetUrls = useSelector((state: RootState) => state.post.selectedClosetUrls);
let len = selectedClosetUrls.length;
let imgUrl = selectedClosetUrls[len - 1];

const { selectedObjects, editor, onReady } = useFabricJSEditor();

const element = document.getElementsByClassName('sample-canvas')[0];
const c = document.getElementsByTagName('canvas')[0];
// const ctx = c.getContext;

// Fabric.js 객체 설정
https: fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'pink';
fabric.Object.prototype.cornerStyle = 'circle';

// delete 기능 아이콘 생성
const deleteIcon =
"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const img = document.createElement('img');
img.src = deleteIcon;

// 출처: //gupu.tistory.com/66 [:3indblown Leaf:티스토리]

useEffect(() => {
// canvas 정사각형으로 정의함
// canvas를 정사각형으로 하기 위해 width 를 계산합니다
const canvasSection = document.getElementById('canvasSection');

    // canvas를 정사각형으로 만들기 위해 width를 계산
    const width = canvasSection.clientWidth;
    setWidth(width.toString());
    console.log(width);

}, []);

// 이미지 클릭하면 url이 store에 추가되고 이것이 canvas에 objects를 추가한다
useEffect(() => {
// loading of imageW
const img = new Image();
img.src = imgUrl;
img.crossOrigin = 'anonymous';

    onAddImage();
    img.onload = function () {
      try {
        // const context = editor?.canvas.getContext;
        // console.log(context);
      } catch (e) {
        alert(e);
        return;
      }
    };

    // editor?.canvas.add(img as Object);

}, [selectedClosetUrls.length]);

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
if (imgUrl) {
let image = new Image();
image.crossOrigin = 'anonymous'; // 핵심
image.src = imgUrl + '?timestamp=' + new Date().getTime(); // 핵심(url 뒤에 캐시막기용 파라미터 추가)

      image.onload = function () {
        //onload 함수 내의 명령은 웹브라우저 내의 모든 요소가 준비된 후 실행이 되도록 합니다.
        // editor?.canvas.getContext;
        // CanvasDrawImage(image, 0, 0);
      };
      // editor?.canvas.loadImage();
    }

    fabric.Image.fromURL(
      imgUrl,
      function (pic) {
        pic.setControlsVisibility(HideControls);
        pic.crossOrigin = 'anonymous'; // Set crossOrigin directly on the fabric.js image

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
        console.log('crossOrigin attribute of the image:', pic.crossOrigin);
        editor?.canvas.add(pic);
        editor?.canvas.renderAll;
      }
      // { crossOrigin: 'anonymous' }
    );
    // ---

};

const capture = e => {
// 이미지 추가 및 다른 오브젝트 추가 로직
e.preventDefault;

    // 캔버스 렌더링 강제 호출
    editor?.canvas.renderAll();
    // HTML2Canvas 실행
    html2canvas(c as HTMLElement, {
      allowTaint: true,
      foreignObjectRendering: true,
      useCORS: true,
    }).then(canvas => {
      console.log(canvas.toDataURL('image/png'), 'image.png');
      console.log(canvas);
    });

};

return (
<>
<div className="my-6">오늘 입은 옷을 선택해서 기록해봐요</div>
<button type="button" onClick={capture}>
capture
</button>
<CanvasSection className="w-[100%] rounded-xl border-4 mb-10" w={width} id="canvasSection">
<div>
{/_ <button onClick={onAddCircle}>Add Circle</button> _/}
{/_ <button onClick={onAddImage}>Add Image</button>
<button onClick={onDelete}>Delete</button> _/}
{width ? <FabricJSCanvas className={`sample-canvas`} onReady={onReady} /> : null}
</div>
</CanvasSection>
</>
);
};

export default PostEditorTemplate;
```
