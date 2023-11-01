// 대분류 카테고리
export interface LargeCategory {
  id: '001' | '002' | '003' | '004'; // typeof id 은 string
  name: '아우터' | '상의' | '하의' | '아이템'; // typeof name 은 string
}

export const largeCategory: LargeCategory[] = [
  {
    id: '001',
    name: '아우터',
  },
  {
    id: '002',
    name: '상의',
  },
  {
    id: '003',
    name: '하의',
  },
  {
    id: '004',
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
  { id: '001001', name: '패딩', largeCategory: { id: '001', name: '아우터' } },
  { id: '001002', name: '코트', largeCategory: { id: '001', name: '아우터' } },
  { id: '001003', name: '자켓', largeCategory: { id: '001', name: '아우터' } },
  { id: '002001', name: '맨투맨', largeCategory: { id: '002', name: '상의' } },
  { id: '002002', name: '후드', largeCategory: { id: '002', name: '상의' } },
  { id: '002003', name: '반팔', largeCategory: { id: '002', name: '상의' } },
  { id: '003001', name: '청바지', largeCategory: { id: '003', name: '하의' } },
  { id: '003002', name: '반바지', largeCategory: { id: '003', name: '하의' } },
  { id: '003003', name: '카고팬츠', largeCategory: { id: '003', name: '하의' } },
  { id: '004001', name: '귀마개', largeCategory: { id: '004', name: '아이템' } },
  { id: '004002', name: '장갑', largeCategory: { id: '004', name: '아이템' } },
  { id: '004003', name: '목도리', largeCategory: { id: '004', name: '아이템' } },
];
