const Coordinate = () => {
    return (
        <> 
        <div className="flex items-center justify-center">
            <div className="bg-gray-button h-[384px] w-[634px] flex justify-center items-center rounded-xl">
                <div className="flex items-center">
                    <img src={"/images/summar.png"} alt="" className="w-[40px] h-[40px]" />
                    <div className="text-WebBody2 p-2">여름</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center">
                        <img src={"/images/spring.png"} alt="" className="w-[45px] h-[45px]" />
                        <div className="text-WebBody2 p-2">봄</div>
                    </div>
                    <div className="bg-white h-[200px] w-[276px] relative rounded-md">
                        <div className="absolute top-1/2 left-0 border border-black w-full"></div>
                        <div className="absolute top-0 left-1/2 border border-black h-full"></div>
                    </div>
                    <div className="flex items-center">
                        <img src={"/images/fall.png"} alt="" className="w-[40px] h-[40px]" />
                        <div className="text-WebBody2 p-2">가을</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <img src={"/images/winter.png"} alt="" className="w-[40px] h-[40px]" />
                    <div className="text-WebBody2 p-2">겨울</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Coordinate;

// const SeasonInfo = ({ imgSrc, imgAlt, text }) => {
//     return (
//       <div className="flex items-center">
//         <img src={imgSrc} alt={imgAlt} className="w-[40px] h-[40px]" />
//         <div className="text-WebBody2 p-2">{text}</div>
//       </div>
//     );
//   };
  
//   const Line = () => {
//     return (
//       <div className="bg-white h-[200px] w-[276px] relative rounded-md">
//         <div className="absolute top-1/2 left-0 border border-black w-full"></div>
//         <div className="absolute top-0 left-1/2 border border-black h-full"></div>
//       </div>
//     );
//   };
  
//   const Coordinate = () => {
//     return (
//       <div className="flex items-center justify-center">
//         <div className="bg-gray-button h-[384px] w-[634px] flex justify-center items-center rounded-xl">
//           <SeasonInfo imgSrc="/images/summar.png" imgAlt="Summer Image" text="여름" />
//           <div className="flex flex-col items-center">
//             <SeasonInfo imgSrc="/images/spring.png" imgAlt="Spring Image" text="봄" />
//             <Line />
//             <SeasonInfo imgSrc="/images/fall.png" imgAlt="Fall Image" text="가을" />
//           </div>
//           <SeasonInfo imgSrc="/images/winter.png" imgAlt="Winter Image" text="겨울" />
//         </div>
//       </div>
//     );
//   };
  
//   export default Coordinate;
  