import PickIcon from "../atoms/PickIcon"



const PickTap = () => {
    return (
        <>
            <div className="flex">
                <div className="bg-gray-button">
                    <PickIcon title="camera" content="찍어찍어 당장 너를 찍어" />
                </div>
                <div className="bg-gray-button">
                    <PickIcon title="closet" content="골라골라 옷장에서 골라" />
                </div>
            </div>
        </>
    )
}

export default PickTap;