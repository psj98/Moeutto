import React from 'react';
import { FiMapPin } from "react-icons/fi";

interface colorPropsType {
    color: string;
}

const MapIcon: React.FC<colorPropsType> = ({ color }) => {
    return (
        <>
            <FiMapPin color={`${color}`} size={25} />
        </>
    )
}

export default MapIcon;