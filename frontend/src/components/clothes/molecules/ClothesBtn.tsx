import DeleteBtn from "../atoms/DeleteBtn";
import EditBtn from "../atoms/EditBtn";

interface Clothes {
    id: number
}

const ClothesBtn = ({ id }: Clothes) => {
    return (
        <>
            <EditBtn id={id} />
            <DeleteBtn id={id} />
        </>
    )
}

export default ClothesBtn;