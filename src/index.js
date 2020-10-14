import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import loThrottle from 'lodash.throttle'

const useVisibiltyPerctange = ({
  throttle = 16,
  offsetTop = 0,
  offsetBottom = 0,
} = {}) => {
  const ref = useRef()

  const [percentageAndPosition, setPercentageAndPosition] = useState([
    0,
    'center',
  ])

  const scrollHandler = useCallback(
    loThrottle(() => {
      const [nextPercentage, nextPosition] = getPercentageAndPosition(
        ref,
        window,
        offsetTop,
        offsetBottom
      )
      const [currentPrecentage] = percentageAndPosition
      //rerender only if percentage has changed
      if (nextPercentage !== currentPrecentage) {
        setPercentageAndPosition([nextPercentage, nextPosition])
      }
    }, throttle),
    []
  )

  useLayoutEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [scrollHandler])

  return [ref, ...percentageAndPosition]
}

const getPercentageAndPosition = (ref, window, offsetTop, offsetBottom) => {
  const windowHeight = window.innerHeight
  let nearPercentage = 0
  let position = 'center'

  const { top, bottom } = ref.current.getBoundingClientRect()
  const height = Math.abs(top - bottom)
  const ratio = (bottom - offsetTop) / height
  const bottomRatio = (windowHeight - top - offsetBottom) / height
  if (bottom + offsetBottom > windowHeight) {
    nearPercentage = bottomRatio
    position = 'bottom'
  } else {
    nearPercentage = ratio
    position = 'top'
  }
  const percentage =
    nearPercentage > 1 ? 1 : nearPercentage < 0 ? 0 : nearPercentage
  if (percentage === 0) {
    position = position === 'top' ? 'above' : 'below'
  } else if (percentage === 1) {
    position = 'center'
  }
  return [percentage, position]
}

export default useVisibiltyPerctange
