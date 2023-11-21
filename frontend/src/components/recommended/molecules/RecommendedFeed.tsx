import { PiCoatHangerBold } from 'react-icons/pi';
import styled from 'styled-components';

const Balloon = styled.div`
    position:relative;
    width:180px;
    height:80px;
    background: #F9F5F6;
    border-radius: 10px;
    z-index: 0;
    margin-top: 4px;
    padding: 10px;

  &:after {
    border-top:0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #F9F5F6;
    content:"";
    position:absolute;
    top:-8px;
    left:20px;
  }
`;

const RecommenedFeed = ({ index, date, nickname, clothesList, comment }) => {
    return (
        <div className="flex justify-center mb-6">
            <div className="w-[85%] bg-[#FDCEDF] shadow-md rounded-xl relative">

                {/* 친구 정보 */}
                <div className="flex items-end gap-4 p-4">
                    <div>
                        <div className="text-AppBody2">{date}</div>
                        {/* 닉네임 */}
                        <div className="text-AppBody1 relative">
                            <span className='z-99'>{nickname}</span>
                            <span className="text-pink-hot">님의 추천</span>
                            {comment && (
                                <>
                                    <Balloon>{comment}</Balloon>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='absolute top-4 right-4'>
                    <PiCoatHangerBold size={60} className='text-pink-hot' /> 
                </div>

                {/* 옷 */}
                <div className="w-[90%] rounded-lg mx-auto flex justify-center px-6 pb-2">
                    <div className='flex-wrap flex gap-4 justify-start'>
                        {clothesList?.map((item) => {
                            return (
                                <img src={item.image} alt="clohtes" className='w-[130px] h-[130px] object-cover bg-white rounded-xl' />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommenedFeed;