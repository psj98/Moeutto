import { PiCoatHangerBold } from 'react-icons/pi';
import styled from 'styled-components';

const Balloon = styled.div`
    position:relative;
    width:180px;
    height:50px;
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

const RecommenedClothesForMain = () => {

    return (
        <div className="flex justify-center mb-6">
            <div className="w-[85%] bg-[#FDCEDF] shadow-md rounded-xl relative">

                {/* 친구 정보 */}
                <div className="flex items-end gap-4 p-4">
                    <div>
                        <div className="text-AppBody2">2023.11.12</div>
                        {/* 닉네임 */}
                        <div className="text-AppBody1 relative">
                            <span className='z-99'>모으또</span>
                            <span className="text-pink-hot">님의 추천</span>
                         
                                <Balloon>이렇게도 입어봐!</Balloon>
                      
                        </div>
                    </div>
                </div>
                <div className='absolute top-4 right-4'>
                    <PiCoatHangerBold size={60} className='text-pink-hot' /> 
                </div>

                {/* 옷 */}
                <div className="w-[90%] rounded-lg mx-auto flex justify-center px-6 pb-2">
                    <div className='flex-wrap flex gap-4 justify-start'>
                        <img src='images/clothes1.png' alt="clohtes" className='w-[100px] h-[100px] object-cover bg-white rounded-xl' />
                        <img src='images/clothes2.png' alt="clohtes" className='w-[100px] h-[100px] object-cover bg-white rounded-xl' />
                        <img src='images/clothes3.png' alt="clohtes" className='w-[100px] h-[100px] object-cover bg-white rounded-xl' />
                        <img src='images/clothes4.png' alt="clohtes" className='w-[100px] h-[100px] object-cover bg-white rounded-xl' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommenedClothesForMain;