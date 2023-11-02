import { BiSolidUpArrow } from 'react-icons/bi';

const ScrollToTopBtn = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

    return (
        <>
        <div className='bg-gray-dark hover:bg-black rounded-full w-12 h-12 flex justify-center items-center'>
            <button onClick={scrollToTop}>
                <BiSolidUpArrow color="white" size={40} />
            </button>
        </div>
        </>
    )
}

export default ScrollToTopBtn;