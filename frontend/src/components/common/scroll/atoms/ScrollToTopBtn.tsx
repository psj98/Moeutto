import { BiSolidUpArrow } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    // Determine if the user has scrolled down enough to show the button
    if (scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Add a scroll event listener to determine when to show the button
    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className='bg-gray-dark hover:bg-black rounded-full w-12 h-12 flex justify-center items-center'>
          <button onClick={scrollToTop}>
            <BiSolidUpArrow color="white" size={40} />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTopBtn;
