import React from "react";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

interface PropsType {
    imgUrl: string;
    star: boolean;
    setStar: React.Dispatch<React.SetStateAction<boolean>>;
}

// 그냥 여기서 즐겨찾기 api 불러오기

const ClothesDetailImg = ({ imgUrl, star, setStar }: PropsType ) => {
    const onClickBookMark = () => {
        setStar((prev) => !prev)
    }

    // let width: number = 15;
    // let c: string = "";

    // useEffect(() => {
    //     const setRightStyle = () => {
    //         const element = document.querySelector<HTMLElement>(".babo");
    
    //         if (element&& window.screen.availWidth > 390) {
    //             const width = Math.min(document.getElementById("img").clientWidth * 0.3, 50);
    //             const c = `${width.toString()}px`;
    
    //             console.log(c, typeof c, "11111");
    
    //             element.style.right = c;
    //         }else{
    //             const c = `20px`;
    
    //             console.log(c, typeof c, "11111");
    
    //             element.style.right = c;
    //         }
    //     };
    
    //     // Run the function after the initial render to ensure that the DOM is ready.
    //     setTimeout(setRightStyle, 0);
    // }, []);
    

    return (
        <>
            <div className="w-full baboParent flex flex-col items-center relative">
                <div className="relative">
                    <img 
                        id="img"
                        src={imgUrl} alt="clothes" 
                        className="w-2/3 h-2/3 min-w-[223px] m-auto border rounded-3xl border" 
                    />
                    <div className={`babo absolute -top-2 w-[60px] right-[20px] sm:right-[30px] md:right-[50px] lg:right-[60px]`}>
                        {star ? (
                                <RxBookmark size={60} color="FAA0BF" onClick={onClickBookMark} />
                            
                            ) : (
                                <RxBookmarkFilled size={60} color="FAA0BF" onClick={onClickBookMark} />
                                )}
                    </div>

                </div>
                </div>
        </>
    )
}

export default ClothesDetailImg;

// transform:translate(-50%,-50%)