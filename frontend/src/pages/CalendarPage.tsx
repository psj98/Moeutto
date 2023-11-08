import { Link } from 'react-router-dom';
import CalendarTemplates from '../components/calendar/templates/CalendarTemplates';

const CalendarPage = () => {
  return (
    <>
      <button>
        <Link to="post">포스트</Link>
        <br />
      </button>
      <div className='flex justify-center items-center border rounded-2xl shadow-md border-pink border-2 p-4 shadow-md relative'>
        <CalendarTemplates />
      </div>
    </>
  );
};

export default CalendarPage;
