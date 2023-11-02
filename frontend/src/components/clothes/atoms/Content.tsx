// import { colorList } from "../../mycloset/add/molecules/ColorInput";
import { colorList } from '../../add/molecules/ColorInput';
import SeasonBtn from './SeasonBtn';

interface PropsType {
  content: any;
  id: number;
}

const Content = ({ content, id }: PropsType) => {
  let renderContent = null;
  const selectedColor = colorList.find(color => color.name === content);

  switch (id) {
    case 5:
      renderContent = <div className="text-WebBody2 text-gray-dark">{content.toLocaleString()}원</div>;
      break;
    case 0:
    case 6:
      renderContent = <div className="text-WebBody2 text-gray-dark">{content}</div>;
      break;
    case 1:
      renderContent = <SeasonBtn season={content} />;
      break;
    case 2:
    case 4:
      renderContent = (
        <div className="text-WebBody2 rounded-2xl border w-[8vw] max-w-[110px] flex items-center justify-center border-black">
          {content}
        </div>
      );
      break;
    case 3:
      // 색이 안뜨네
      renderContent = <div className={`rounded-full border bg-[${selectedColor.background}] w-8 h-8`}></div>;
      break;
    default:
      renderContent = <div>{content}</div>;
  }

  return <>{renderContent}</>;
};

export default Content;
