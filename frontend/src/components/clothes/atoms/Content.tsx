import SeasonBtn from './SeasonBtn';
import { middleCategory } from '../../common/CategoryType';

interface PropsType {
    content: any;
    id: number;
}

interface Color {
    name: string;
    background: string;
}

const colorList: Color[] = [
    { name: 'red', background: '#FFA7A7' },
    { name: 'orange', background: '#FFA7A7' },
    { name: 'yellow', background: '#FDFF9E' },
    { name: 'green', background: '#A0FF90' },
    { name: 'blue', background: '#BEADFF' },
    { name: 'purple', background: '#D09AD9' },
    { name: 'pink', background: '#FF98D6' },
    { name: 'khaki', background: '#C0AE6F' },
    { name: 'black', background: '#131313' },
    { name: 'white', background: '#FFF' },
    { name: 'gray', background: '#E2E2E2' },
    { name: 'mix', background: 'linear-gradient(180deg, #F19494 0%, #FFFCBC 51.56%, #22D7FF 86.98%, #DF18FF 100%)' },
  ];

const Content = ({ content, id }: PropsType) => {

    let renderContent = null;
    let selectedColor: string = '#FFFFFF';
    
    

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
            renderContent = content > 0 ? (
                <div className="text-AppBody1 text-gray-dark tracking-wider">
                    {content.toLocaleString()}원
                </div>
            ) : null;
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
            
            selectedColor = colorList.find(color => color.name === content)?.background;
            renderContent = <div className={`rounded-full border bg-[${selectedColor}] w-8 h-8`}></div>;
            break;
        default:
            renderContent = <div>{content}</div>;
    }

    return <>{renderContent}</>;
};

export default Content;
