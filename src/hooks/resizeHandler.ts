import { useEffect, useState } from 'react';

interface IResize {
  windowWidth: number;
}

// thanks to https://gist.github.com/gaearon/cb5add26336003ed8c0004c4ba820eae?source=post_page
export const useResizeHandler = () => {
  const [windowWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return { windowWidth };
};

export const ResizeHandler = ({ children }: { children: (resize: IResize) => any }) => {
  const resize = useResizeHandler();

  return children(resize);
};
