// import { colorList } from '../../add/molecules/ColorInput';
import SeasonBtn from './SeasonBtn';
import { middleCategory } from '../../common/CategoryType';

interface PropsType {
    content: any;
    id: number;
}

const Content = ({ content, id }: PropsType) => {
    let renderContent = null;
    // const selectedColor = colorList.find(color => color.name === content);

    const getNameById = (idToFind: string): string | undefined => {
        const foundCategory = middleCategory.find(category => category.id === idToFind);

        return foundCategory ? foundCategory.name : undefined;
    };

    let name: string = "";

    if (id === 0) {
        name = getNameById(content);
    }

    switch (id) {
        case 5:
            renderContent = <div className="text-AppBody1 text-gray-dark tracking-wider">{content.toLocaleString()}원</div>;
            break;
        case 0:
            renderContent = <div className="text-AppBody1 text-gray-dark tracking-wider">{name}</div>;
            break
        case 6:
            renderContent = <div className="text-AppBody1 text-gray-dark tracking-wider">{content}</div>;
            break;
        case 1:
            renderContent = <SeasonBtn season={content} />;
            break;
        case 2:
        case 4:
            renderContent = (
                <div className="text-AppBody1 rounded-2xl border min-w-[80px] max-w-[110px] flex items-center justify-center border-black tracking-wider">
                    {content}
                </div>
            );
            break;
        case 3:
            renderContent = <div className={`rounded-full border bg-[${content}] w-8 h-8`}></div>;
            break;
        default:
            renderContent = <div>{content}</div>;
    }

    return <>{renderContent}</>;
};

export default Content;
