const RecommenedFeed = () => {
    return (
        <div className="flex justify-center">
            <div className="w-[70%] bg-pink rounded-xl h-[330px] relative">

                {/* 친구 정보 */}
                <div className="flex items-center gap-4 p-4">
                    {/* 프로필 사진 */}
                    <img src="/images/dog.jpeg" alt="profile" className="w-[60px] h-[60px] rounded-full object-cover" />
                    {/* 닉네임 */}
                    <div className="text-AppBody1">모드리치님의 추천</div>
                </div>

                <div className="bg-white w-[90%] h-2/3 rounded-lg mx-auto">
                    <div className="bg-pink-hot rounded-full w-full h-6 relative">
                        <div className="bg-pink shadow-lg h-full absolute w-6 rounded-full right-0 flex-col">
             
                        </div>
                    </div>
                    <div className="bg-pink-hot rounded-full w-full h-6 relative">
                        <div className="bg-pink shadow-lg h-full absolute w-6 rounded-full right-0">
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommenedFeed;