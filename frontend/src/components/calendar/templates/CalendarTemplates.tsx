import React from "react";
import Calendar from "../organisms/Calendar";

interface TemplateProps {
    setShowSelectedImg: React.Dispatch<React.SetStateAction<string>>;
    setClothesId: React.Dispatch<React.SetStateAction<number>>;
    setIsLikedOutFit: React.Dispatch<React.SetStateAction<number>>;
    // setShowSelectedImg: any
    // setClothesId: any
    // setIsLikedOutFit: any
    handleModalOpen: () => void;
}

const CalendarTemplates = ({
    setShowSelectedImg,
    setClothesId,
    setIsLikedOutFit,
    handleModalOpen
}: TemplateProps) => {
    return (
        <div className="">
            <Calendar
                setShowSelectedImg={setShowSelectedImg}
                setClothesId={setClothesId}
                setIsLikedOutFit={setIsLikedOutFit}
                handleModalOpen={handleModalOpen}
            />
        </div>
    )
}

export default CalendarTemplates;
