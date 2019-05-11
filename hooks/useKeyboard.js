import { useState, useEffect } from 'react'
import { Keyboard, Platform } from 'react-native'

export default ({ onShow, onHide }) => {
  const [keyboardShow, setKeyboardShow] = useState(false)

  useEffect(() => {
    const keyboardShowEvent = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardShow(true)
        onShow && onShow()
      },
    )
    const keyboardHideEvent = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardShow(true)
        onHide && onHide()
      },
    )

    return () => {
      keyboardShowEvent.remove()
      keyboardHideEvent.remove()
    }
  }, [])

  return keyboardShow
}
