import { BiSolidDownArrow } from 'react-icons/bi';

const ScrollToBottmBtn = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 100,
          behavior: 'smooth',
        });
      };
      
    return (
        <>
        <div className='bg-gray-dark hover:bg-black rounded-full w-12 h-12 flex justify-center items-center'>
            <button onClick={scrollToTop}>
                <BiSolidDownArrow color="white" size={40} />
            </button>
        </div>
        </>
    )
}

export default ScrollToBottmBtn;