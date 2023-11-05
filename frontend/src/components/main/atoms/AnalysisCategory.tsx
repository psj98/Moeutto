import { useState, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

interface PropsType {
    width: number;
    title: string;
    comment: string;
    link: string;
}

const AnalysisCategory = ({ width, title, comment, link }: PropsType) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
        setIsHovered(true);
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
        setIsHovered(false);
    };

    const onClick = () => {
        navigate(`/mycloset/report/${link}`)
    }


    return (
        <>
            <div className={`flex items-center justify-center bg-gray-button w-1/${width} rounded-2xl shadow-md px-2`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                style={{
                    backgroundColor: isHovered ? 'rgba(163, 163, 163, 0.4)' : '',
                }}
            >
                <img src={`/images/${title}.png`} alt="season" />
                <p className="z-99 absolute flex items-center justify-center text-AppBody1 font-bold" style={{ display: isHovered ? 'block' : 'none', color: '#000000' }}>{comment}</p>
            </div>
        </>
    )
}

export default AnalysisCategory;