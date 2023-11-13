import { useState } from "react";

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
            />
            {isAlertModalOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-pink-hot w-[300px]">
                        <div>방명록</div>
                    </div>
                </div>
            )}
        </>
    )

}

export default Alert;