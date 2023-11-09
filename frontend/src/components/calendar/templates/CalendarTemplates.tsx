import Calendar from "../organisms/Calendar";

const CalendarTemplates = ({
    setShowSelectedImg,
    setClothesId,
    setIsLikedOutFit
}) => {
    return (
        <div className="">
            <Calendar
                setShowSelectedImg={setShowSelectedImg}
                setClothesId={setClothesId}
                setIsLikedOutFit={setIsLikedOutFit}
            />
        </div>
    )
}

export default CalendarTemplates;
