const LinearBright = () => {
  // 전체가 90%
  const position: number = 70;

  return (
    <>
      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="bg-gray-button w-[634px] h-[94px] rounded-lg flex justify-center items-center">
          <div className="text-WebBody2 tracking-wider p-2">시원</div>
          <img src="/images/cool.png" alt="시원" />
          <div className="w-[230px] h-[17px] rounded-2xl shadow-lg bg-white">
            <div
              className="w-7 h-5 bg-pink rounded-full relative"
              style={{
                left: `${position}%`,
              }}></div>
          </div>
          <img src="/images/hot.png" alt="시원" />
          <div className="text-WebBody2 tracking-wider p-2">보온</div>
        </div>
      </div>
    </>
  );
};

export default LinearBright;
