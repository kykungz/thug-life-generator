import { useState, useEffect } from 'react'
import { Keyboard, Animated, Platform } from 'react-native'

export default (padding = 80) => {
  const [animation, setAnimation] = useState(new Animated.Value(0))
  const [keyboardShow, setKeyboardShow] = useState(false)

  const onKeyboardShow = () => {
    Animated.timing(animation, {
      toValue: padding,
      duration: 200, // Make it take a while
    }).start() // Starts the animation
  }

  const onKeyboardHide = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200, // Make it take a while
    }).start() // Starts the animation
  }

  useEffect(() => {
    const keyboardShowEvent = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      onKeyboardShow,
    )
    const keyboardHideEvent = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      onKeyboardHide,
    )

    return () => {
      keyboardShowEvent.remove()
      keyboardHideEvent.remove()
    }
  }, [])

  return animation
}
