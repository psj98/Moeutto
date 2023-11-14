interface PropsType {
  title: string;
}

const MainCategory = ({ title }: PropsType) => {
  return (
    <>
      <div className="font-bold">{title}</div>
    </>
  );
};

export default MainCategory;
