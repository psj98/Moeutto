import React, { useEffect, useState } from "react";

const TempBarAnimation = () => {
    const [position, setPosition] = useState<number>(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setPosition(prevPosition => (prevPosition === 80 ? 0 : 80));
      }, 2000); // 2초 간격으로 변경

      return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="flex items-center justify-center mt-10 mb-6">
            <div className="bg-gray-button w-full h-[80px] rounded-[30px] flex justify-center items-center">
                <img src="/images/bright.png" alt="밝음" />
                <div className="w-[230px] h-[17px] rounded-2xl shadow-lg bg-white m-2">
                    <div
                        className="w-7 h-5 bg-pink rounded-full relative"
                        style={{
                            left: `${position}%`,
                            transition: 'left 2s ease-in-out'
                        }}
                    ></div>
                </div>
                <img src="/images/dark.png" alt="어두움" />
            </div>
        </div>
    )
}

export default TempBarAnimation;
