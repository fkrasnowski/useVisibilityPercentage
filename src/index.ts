import { useCallback, useLayoutEffect, useState } from 'react'
// @ts-ignore
import loThrottle from 'lodash.throttle'

type Position = 'above' | 'top' | 'center' | 'bottom' | 'below'
type PercentageHook = <T>(
  ref: React.RefObject<T>,
  options?: { throttle?: number; offsetTop?: number; offsetBottom?: number }
) => [number, Position]

const useVisibiltyPercentage: PercentageHook = (
  ref,
  { throttle = 16, offsetTop = 0, offsetBottom = 0 } = {}
) => {
  const [percentageAndPosition, setPercentageAndPosition] = useState<
    [number, Position]
  >([0, 'center'])

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

  return percentageAndPosition
}

const getPercentageAndPosition = <T>(
  ref: React.RefObject<T>,
  window: Window,
  offsetTop: number,
  offsetBottom: number
): [number, Position] => {
  const windowHeight = window.innerHeight
  let nearPercentage = 0
  let position: Position = 'center'
  // @ts-ignore
  if (ref.current.getBoundingClientRect) {
    // @ts-ignore
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
  } else {
    return [0, position]
  }
}

export default useVisibiltyPercentage
