import { useLayoutEffect, useRef, useState } from 'react';
import loThrottle from 'lodash.throttle';

const useVisibiltyPerctange = ({
  throttle = 16,
  offsetTop = 0,
  offsetBottom = 0,
} = {}) => {
  const ref = useRef();
  const [percentage, setPercentage] = useState(0);
  useLayoutEffect(() => {
    setPercentage(getPercentage(ref, window, offsetTop, offsetBottom));
    const scrollHandler = loThrottle(
      () => setPercentage(getPercentage(ref, window, offsetTop, offsetBottom)),
      throttle
    );
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [throttle, offsetTop, offsetBottom]);
  return [ref, percentage];
};

const getPercentage = (ref, window, offsetTop, offsetBottom) => {
  const windowHeight = window.innerHeight;
  let value = 0;
  const { top, bottom } = ref.current.getBoundingClientRect();
  const height = Math.abs(top - bottom);
  const ratio = (bottom - offsetTop) / height;
  const bottomRatio = (windowHeight - top - offsetBottom) / height;
  if (bottom + offsetBottom > windowHeight) value = bottomRatio;
  else value = ratio;
  return value > 1 ? 1 : value < 0 ? 0 : value;
};

export default useVisibiltyPerctange;
