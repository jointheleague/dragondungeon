import { useEffect } from 'react';

import './useDisableScroll.css'

let scrollCount = 0;

export const useDisableScroll = () => {
  return useEffect(() => {
    document.body.classList.add("scroll-disabled")
    scrollCount++;
    return () => {
      scrollCount--;
      if (scrollCount === 0) {
        document.body.classList.remove("scroll-disabled")
      }
    }
  }, [])
}
