// done
// 대분류 카테고리
export interface LargeCategory {
  id: '002' | '001' | '003' | '011'; // typeof id 은 string
  name: '아우터' | '상의' | '하의' | '아이템'; // typeof name 은 string
}

export const largeCategory: LargeCategory[] = [
  {
    id: '002',
    name: '아우터',
  },
  {
    id: '001',
    name: '상의',
  },
  {
    id: '003',
    name: '하의',
  },
  {
    id: '011',
    name: '아이템',
  },
];

// 중분류 카테고리
export interface MiddleCategory {
  id: string;
  name: string;
  largeCategory: LargeCategory;
}

export const middleCategory: MiddleCategory[] = [
  { id: '002012', name: '패딩', largeCategory: { id: '002', name: '아우터' } },
  { id: '002007', name: '코트', largeCategory: { id: '002', name: '아우터' } },
  { id: '002004', name: '자켓', largeCategory: { id: '002', name: '아우터' } },
  { id: '001005', name: '맨투맨', largeCategory: { id: '001', name: '상의' } },
  { id: '001004', name: '후드', largeCategory: { id: '001', name: '상의' } },
  { id: '001001', name: '반팔', largeCategory: { id: '001', name: '상의' } },
  { id: '003002', name: '청바지', largeCategory: { id: '003', name: '하의' } },
  { id: '003009', name: '반바지', largeCategory: { id: '003', name: '하의' } },
  { id: '003004', name: '카고팬츠', largeCategory: { id: '003', name: '하의' } },
  { id: '011006', name: '귀마개', largeCategory: { id: '011', name: '아이템' } },
  { id: '011011', name: '장갑', largeCategory: { id: '011', name: '아이템' } },
  { id: '011010', name: '목도리', largeCategory: { id: '011', name: '아이템' } },
];
