import PickIcon from "../atoms/PickIcon"



const PickTap = () => {
    return (
        <>
            <div className="flex">
                <div className="bg-gray-button">
                    <PickIcon title="camera" />
                    <div>찍어찍어 당장 너를 찍어</div>
                </div>
                <div className="bg-gray-button">
                    <PickIcon title="closet" />
                    <div>골라골라 옷장에서 골라</div>
                </div>
            </div>
        </>
    )
}

export default PickTap;