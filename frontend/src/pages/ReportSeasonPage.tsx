import ClosetReportSeasonTemplate from '../components/report/templates/ClosetReportSeasonTemplate';

export interface CategoryAmountType {
  largeCategoryId: string;
  amount: number;
}

export interface SeasonClothesType {
  springClothes: CategoryAmountType[];
  summerClothes: CategoryAmountType[];
  autumnClothes: CategoryAmountType[];
  winterClothes: CategoryAmountType[];
}

export interface SeasonDataType {
  fourSeason: SeasonClothesType;
}

const data: SeasonClothesType = {
  springClothes: [
    {
      largeCategoryId: '001',
      amount: 3,
    },
    {
      largeCategoryId: '002',
      amount: 0,
    },
    {
      largeCategoryId: '003',
      amount: 0,
    },
    {
      largeCategoryId: '004',
      amount: 1,
    },
  ],
  summerClothes: [
    {
      largeCategoryId: '001',
      amount: 12,
    },
    {
      largeCategoryId: '002',
      amount: 0,
    },
    {
      largeCategoryId: '003',
      amount: 0,
    },
    {
      largeCategoryId: '004',
      amount: 0,
    },
  ],
  autumnClothes: [
    {
      largeCategoryId: '001',
      amount: 8,
    },
    {
      largeCategoryId: '002',
      amount: 0,
    },
    {
      largeCategoryId: '003',
      amount: 0,
    },
    {
      largeCategoryId: '004',
      amount: 4,
    },
  ],
  winterClothes: [
    {
      largeCategoryId: '001',
      amount: 8,
    },
    {
      largeCategoryId: '002',
      amount: 0,
    },
    {
      largeCategoryId: '003',
      amount: 0,
    },
    {
      largeCategoryId: '004',
      amount: 1,
    },
  ],
};

const ReportSeasonPage = () => {
  return (
    <div>
      <ClosetReportSeasonTemplate fourSeason={data} />
    </div>
  );
};

export default ReportSeasonPage;
