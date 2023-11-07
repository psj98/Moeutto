import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { authInstance } from "../../../api/api";
import { ClothesItem } from "../../../pages/PickPickPage";
import MainCategory from "../atoms/MainCategory";
import MiddleCategory from "../atoms/MiddleCategory";
import ClothesItemComponent from "../../clothes/atoms/ClothesItem";

const ScrollContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 4px;
  min-width: 100%;
  overflow-x: hidden; /* or 'auto' for scrollable */
  touch-action: pan-x;
`;


const CategoryTap = ({ title, id, categories, uniqueId }) => {
  const navigate = useNavigate();
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const [categoryId, setCategoryId] = useState<string>(id);
  const [sortBy , setSortBy] = useState<string>("initial");
  const [orderBy , setOrderBy] = useState<number>(0);

  const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>("전체");

  const fetchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/clothes/list', {
        categoryId,
        sortBy,
        orderBy,
      });

      console.log('옷 목록 데이터 조회 성공', response.data);

      if (response.data.data) {
        setClothesData(response.data.data);
      } else {
        // 옷 목록이 없는 경우
        setClothesData([]);
      }

      return response.data;
    } catch (error) {
      console.log('옷 목록 데이터 조회 실패', error);

      throw new Error('옷 목록 데이터 조회 실패');
    }
  };

  useEffect(() => {
    if (selectedOptionMiddle === '패딩') {
            setCategoryId('001001');
        } else if (selectedOptionMiddle === '코트') {
            setCategoryId('001002');
        } else if (selectedOptionMiddle === '자켓') {
            setCategoryId('001003');
        } else if (selectedOptionMiddle === '맨투맨') {
            setCategoryId('002001');
        } else if (selectedOptionMiddle === '후드') {
            setCategoryId('002002');
        } else if (selectedOptionMiddle === '반팔') {
            setCategoryId('002003');
        } else if (selectedOptionMiddle === '청바지') {
            setCategoryId('003001');
        } else if (selectedOptionMiddle === '반바지') {
            setCategoryId('003002');
        } else if (selectedOptionMiddle === '카고팬츠') {
            setCategoryId('003003');
        } else if (selectedOptionMiddle === '귀마개') {
            setCategoryId('004001');
        } else if (selectedOptionMiddle === '장갑') {
            setCategoryId('004002');
        } else if (selectedOptionMiddle === '목도리') {
            setCategoryId('004003');
        } else if (selectedOptionMiddle === '전체') {
            setCategoryId(id);
        }

     
    console.log(clothesData)  
    console.log('지금 선택한 카테고리', selectedOptionMiddle)                                                                                  
  }, [selectedOptionMiddle]);

  const [categoryValue, setCategoryValue] = useState<string>("");
  
  useEffect(() => {
    fetchData(); 
    console.log(categoryId)
  }, [categoryId, sortBy, categoryValue])


  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
    if (e.target.value) {
        setSortBy(e.target.value);
        setOrderBy(1);
      if (e.target.value === 'frequency1') {
            setSortBy('frequency')
            setOrderBy(1)
        } else if (e.target.value === 'frequency0') {
            setSortBy('frequency')
            setOrderBy(0)
        }
      } 
    }

    return (
        <div className="mb-8">
            <MainCategory title={title} />
            <div className="flex">
                <MiddleCategory 
                    selectedOptionMiddle={selectedOptionMiddle} 
                    setSelectedOptionMiddle={setSelectedOptionMiddle} 
                    categories={categories} 
                    uniqueId={uniqueId}
                />
                <div className="text-AppBody2 flex items-center ms-10">
                    <select value={categoryValue} defaultValue="initial" onChange={onChange} className="h-5">
                        <option value="initial">정렬</option>
                        <option value="regDate">등록</option>
                        <option value="frequency1">많이 입은</option>
                        <option value="frequency0">적게 입은</option>
                        <option value="color">색상</option>
                        
                    </select>
                </div>
            </div>
            <ScrollContainer>
                    {clothesData && clothesData.length > 0 ? (
                    clothesData.map((item, index) => (
                        <ClothesItemComponent imgUrl={item.imageUrl} clothesId={item.id.toString()} key={index} />
                    ))
                    ) : (
                    <div className="w-full h-[110px] rounded-xl flex items-center justify-center border-pink">
                        <div className="bg-pink text-white p-4 rounded-xl"
                            onClick={() => navigate('/mycloset/add-cloth')}
                        >옷 등록하기</div>
                    </div>
                    )}
            </ScrollContainer>
        </div>
    )
}

export default CategoryTap;