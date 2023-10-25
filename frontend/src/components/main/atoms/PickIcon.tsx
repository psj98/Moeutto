import React from "react";

interface PickIconPropsType {
    title: string;
}

const PickIcon: React.FC<PickIconPropsType> = ({ title }) => {
    return (
        <div>
            <img src={`/images/${title}3d.png`} alt="icon" />
        </div>
    )
}

export default PickIcon;