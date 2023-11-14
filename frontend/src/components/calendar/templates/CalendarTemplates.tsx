import React from "react";
import Calendar from "../organisms/Calendar";

interface TemplateProps {
    setShowSelectedImg: React.Dispatch<React.SetStateAction<string>>;
    setClothesId: React.Dispatch<React.SetStateAction<number>>;
    setIsLikedOutFit: React.Dispatch<React.SetStateAction<number>>;
    handleModalOpen: () => void;
    updateCalendar: boolean;
}

const CalendarTemplates = ({
    setShowSelectedImg,
    setClothesId,
    setIsLikedOutFit,
    handleModalOpen,
    updateCalendar
}: TemplateProps) => {
    return (
        <div className="">
            <Calendar
                setShowSelectedImg={setShowSelectedImg}
                setClothesId={setClothesId}
                setIsLikedOutFit={setIsLikedOutFit}
                handleModalOpen={handleModalOpen}
                updateCalendar={updateCalendar}
            />
        </div>
    )
}

export default CalendarTemplates;
