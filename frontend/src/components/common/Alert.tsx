import { useState } from "react";
import MyGuestBook from "../main/organisms/MyGuestBook";

const Alert = () => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

    const showAlertModal = () => {
        setIsAlertModalOpen(!isAlertModalOpen)
    }

    return (
        <>
            <img 
                src="/images/alert.png" 
                alt="alert" 
                className="w-[5%] min-w-[70px] absolute mt-[3%] right-0"
                onClick={showAlertModal} 
                style={{ position: 'fixed', top: 0, right: 0, zIndex: 50 }}
            />
            {isAlertModalOpen && (
                <MyGuestBook setIsAlertModalOpen={setIsAlertModalOpen} />
            )}
        </>
    )

}

export default Alert;