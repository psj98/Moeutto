// import { PiCoatHangerBold } from 'react-icons/pi';

const RecommenedFeed = () => {
    return (
        <div className="flex justify-center mb-6">
            <div className="w-[85%] bg-pink shadow-md rounded-xl relative">

                {/* 친구 정보 */}
                <div className="flex items-end gap-4 p-4">
                    {/* 프로필 사진 */}
                    <img src="/images/dog.jpeg" alt="profile" className="w-[60px] h-[60px] rounded-full object-cover" />
                    <div>
                        <div className="text-AppBody2">2023.08.01</div>
                        {/* 닉네임 */}
                        <div className="text-AppBody1">
                            모드리치
                            <span className="text-white">님의 추천</span>
                        </div>
                    </div>
                </div>

                {/* 옷 */}
                <div className="w-[90%] h-[80px] rounded-lg mx-auto relative">
                    {/* <div className='absolute -top-16 right-0'>
                        <PiCoatHangerBold size={60} className='text-pink-hot' /> 
                    </div> */}
                    <div className='flex-wrap flex gap-3 pt-2 justify-center'>
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[70px] h-[70px] object-cover bg-white rounded-xl' />
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[70px] h-[70px] object-cover bg-white rounded-xl' />
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[70px] h-[70px] object-cover bg-white rounded-xl' />
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[70px] h-[70px] object-cover bg-white rounded-xl' />
                    </div>
                </div>

                {/* 내용 너무 길어도 이상하니까 20자 정도로 제한 */}
                <div className='ms-[7%] max-w-[90%] my-2'>이렇게 입어보는 것이 어떻겠니?</div>
            </div>
        </div>
    )
}

export default RecommenedFeed;