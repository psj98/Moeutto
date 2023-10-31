import React from "react";

const SeasonLabel = ({ imagePath, label }) => (
    <div className="flex items-center">
        <img src={imagePath} alt="" className="w-[40px] h-[40px]" />
        <div className="text-WebBody2 p-2">{label}</div>
    </div>
);

const SeasonDot = ({ position }) => (
    <div
        className="absolute rounded-full w-3 h-3 bg-black border-2 border-pink z-99 flex"
        style={{
            top: position.top,
            left: position.left
        }}
    />
);

const Coordinate = () => {
    const position = { top: '20%', left: '30%' };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-gray-button h-[384px] w-[634px] flex justify-center items-center rounded-xl">
                <SeasonLabel imagePath="/images/summar.png" label="여름" />
                <div className="flex flex-col items-center">
                    <SeasonLabel imagePath="/images/spring.png" label="봄" />
                    <div className="bg-white h-[200px] w-[276px] relative rounded-md">
                        <div className="absolute top-1/2 left-0 border border-black w-full z-1" />
                        <SeasonDot position={position} />
                        <div className="absolute top-0 left-1/2 border border-black h-full z-1" />
                    </div>
                    <SeasonLabel imagePath="/images/fall.png" label="가을" />
                </div>
                <SeasonLabel imagePath="/images/winter.png" label="겨울" />
            </div>
        </div>
    );
}

export default Coordinate;
