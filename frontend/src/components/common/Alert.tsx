import { useState } from "react";
import MyGuestBook from "../main/organisms/MyGuestBook";

const Alert = () => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

    const showAlertModal = () => {
        setIsAlertModalOpen(!isAlertModalOpen)
    }

    if (isAlertModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    return (
        <>
        <div className="">
            <img 
                src="/images/alert.png" 
                alt="alert" 
                className="w-[5%] min-w-[70px] absolute mt-[3%] -right-6"
                onClick={showAlertModal} 
                style={{ position: 'fixed', top: 0, zIndex: 50 }}
            />
            {isAlertModalOpen && (
                <MyGuestBook setIsAlertModalOpen={setIsAlertModalOpen} />
            )}
        </div>
        </>
    )

}

export default Alert;