import { BiSolidDownArrow } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const ScrollToBottomBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    // Determine if the user has scrolled down enough to show the button
    if (scrollHeight - scrollTop > windowHeight * 1.5) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className='bg-gray-dark hover:bg-black rounded-full w-12 h-12 flex justify-center items-center'>
          <button onClick={scrollToBottom}>
            <BiSolidDownArrow color="white" size={40} />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToBottomBtn;
