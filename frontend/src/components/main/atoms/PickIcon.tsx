import React from "react";

interface PickIconPropsType {
    title: string;
    content: string;
}

const PickIcon: React.FC<PickIconPropsType> = ({ title, content }) => {
    return (
        <div>
            <img src={`/images/${title}3d.png`} alt="icon" className="w-32 h-32" />
            <div>{content}</div>
        </div>
    )
}

export default PickIcon;