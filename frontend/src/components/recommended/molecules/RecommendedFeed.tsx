import { PiCoatHangerBold } from 'react-icons/pi';

const RecommenedFeed = () => {
    return (
        <div className="flex justify-center mb-8">
            <div className="w-[80%] bg-pink rounded-xl relative">

                {/* 친구 정보 */}
                <div className="flex items-center gap-4 p-4">
                    {/* 프로필 사진 */}
                    <img src="/images/dog.jpeg" alt="profile" className="w-[60px] h-[60px] rounded-full object-cover" />
                    {/* 닉네임 */}
                    <div className="text-AppBody1">
                        모드리치
                        <span className="text-white">님의 추천</span>
                    </div>
                </div>

                {/* 옷 */}
                <div className="bg-white w-[90%] h-[230px] rounded-lg mx-auto relative">
                    <div className='absolute -top-5 -right-2'>
                        <PiCoatHangerBold size={60} className='text-pink-hot' /> 
                    </div>
                    <div className='flex-wrap flex gap-2 justify-center pt-2'>
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[100px] h-[100px] object-cover' />
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[100px] h-[100px] object-cover' />
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[100px] h-[100px] object-cover' />
                        <img src="/images/clothes1.png" alt="clohtes1" className='w-[100px] h-[100px] object-cover' />
                    </div>
                </div>

                {/* 내용 너무 길어도 이상하니까 20자 정도로 제한 */}
                <div className='ms-[5%] max-w-[90%] my-2'>이렇게 입어보는 것이 어떻겠니?</div>
            </div>
        </div>
    )
}

export default RecommenedFeed;