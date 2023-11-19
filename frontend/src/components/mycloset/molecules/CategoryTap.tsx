// done
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { authInstance } from '../../../api/api';
import { ClothesItem } from '../../../pages/PickPickPage';
import MainCategory from '../atoms/MainCategory';
import MiddleCategory from '../atoms/MiddleCategory';
import ClothesItemComponent from '../../clothes/atoms/ClothesItem';

const CategoryTap = ({ title, id, categories, uniqueId }) => {
  const navigate = useNavigate();
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const [categoryId, setCategoryId] = useState<string>(id);
  const [sortBy, setSortBy] = useState<string>('initial');
  const [orderBy, setOrderBy] = useState<number>(0);

  const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>('전체');

  const fetchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/clothes/list', {
        categoryId,
        sortBy,
        orderBy,
      });

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
      setCategoryId('002012');
    } else if (selectedOptionMiddle === '코트') {
      setCategoryId('002007');
    } else if (selectedOptionMiddle === '자켓') {
      setCategoryId('002004');
    } else if (selectedOptionMiddle === '맨투맨') {
      setCategoryId('001005');
    } else if (selectedOptionMiddle === '후드') {
      setCategoryId('001004');
    } else if (selectedOptionMiddle === '반팔') {
      setCategoryId('001001');
    } else if (selectedOptionMiddle === '청바지') {
      setCategoryId('003002');
    } else if (selectedOptionMiddle === '반바지') {
      setCategoryId('003009');
    } else if (selectedOptionMiddle === '카고팬츠') {
      setCategoryId('003004');
    } else if (selectedOptionMiddle === '귀마개') {
      setCategoryId('011006');
    } else if (selectedOptionMiddle === '장갑') {
      setCategoryId('011011');
    } else if (selectedOptionMiddle === '목도리') {
      setCategoryId('011010');
    } else if (selectedOptionMiddle.slice(0, 2) === '전체') {
      setCategoryId(id);
    }
  }, [selectedOptionMiddle]);

  const [categoryValue, setCategoryValue] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [categoryId, sortBy, categoryValue]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
    if (e.target.value) {
      setSortBy(e.target.value);
      setOrderBy(1);
      if (e.target.value === 'frequency1') {
        setSortBy('frequency');
        setOrderBy(1);
      } else if (e.target.value === 'frequency0') {
        setSortBy('frequency');
        setOrderBy(0);
      }
    }
  };

  return (
    <div className="mb-8 mx-5">
      <div className="flex flex-row justify-between items-center">
        <MainCategory title={title} />
        <select className="text-base" value={categoryValue} defaultValue="initial" onChange={onChange}>
          <option value="initial">정렬</option>
          <option value="regDate">등록순</option>
          <option value="frequency1">많이 입은 순</option>
          <option value="frequency0">적게 입은 순</option>
          <option value="color">색상 순</option>
        </select>
      </div>
      <div className="text-AppBody2 flex flex-row items-center">
        <MiddleCategory
          selectedOptionMiddle={selectedOptionMiddle}
          setSelectedOptionMiddle={setSelectedOptionMiddle}
          categories={categories}
          uniqueId={uniqueId}
        />
        {/* <div className="text-AppBody2 ms-10 h-5"> */}

        {/* </div> */}
      </div>
      <div className="flex gap-1 overflow-x-auto mt-1">
        {clothesData && clothesData.length > 0 ? (
          clothesData.map((item, index) => (
            <ClothesItemComponent imgUrl={item.imageUrl} clothesId={item.id.toString()} key={index} />
          ))
        ) : (
          <div className="w-full h-[110px] rounded-xl flex items-center justify-center border-pink">
            <div className="bg-pink text-white p-4 rounded-xl" onClick={() => navigate('/mycloset/add-cloth')}>
              옷 등록하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTap;
