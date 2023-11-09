import MainComment from './MainComment';

const AddTap = () => {
  const userName: string = `${sessionStorage.getItem('nickname')}`;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-4 mt-10">
        <MainComment title={`${userName}님 \n이런 옷은 어떤가요?`} />
        <img src="" alt="" />
      </div>
    </>
  );
};

export default AddTap;
