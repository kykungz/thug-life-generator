import { useState, useEffect } from 'react'
import { Keyboard, Animated, Platform } from 'react-native'

export default duration => {
  const [animation] = useState(new Animated.Value(0))

  const animateTo = toValue => {
    Animated.timing(animation, {
      toValue,
      duration, // Make it take a while
    }).start()
  }

  return [animation, animateTo]
}
