import Calendar from "../organisms/Calendar";

const CalendarTemplates = ({
    setShowSelectedImg,
    setClothesId,
    setIsLikedOutFit,
    handleModalOpen
}) => {
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
