import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import { Icon, Button } from 'antd'

const ModalContainer = styled.View`
  background: white;
  border-radius: 4px;
  margin-bottom: ${props => (props.keyboardShow ? '100px' : '0')};
`

const ModalContent = styled.View`
  padding: 16px;
`

const ModalBar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 14px 8px;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  position: relative;
`

const ModalClose = styled.TouchableOpacity`
  position: absolute;
  top: 14px;
  left: 8px;
  z-index: 9999;
`

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  text-align: center;
`

const ModalInput = styled.TextInput`
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  background: #f0f0f0;
  margin: 16px 0;
  margin-top: 8px;
`

const Message = styled.Text``

export default props => {
  const {
    isVisible,
    title,
    message,
    placeholder,
    onSubmit,
    onClose,
    initialValue,
  } = props
  const [inputText, setInputText] = useState('')
  const [keyboardShow, setKeyboardShow] = useState(false)

  const handleSubmit = () => {
    onClose()
    onSubmit(inputText.trim())
  }

  useEffect(() => {
    const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardShow(true),
    )
    const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardShow(false),
    )

    setInputText(initialValue)

    return () => {
      keyboardDidShowSub.remove()
      keyboardDidHideSub.remove()
    }
  }, [])

  return (
    <Modal isVisible={isVisible}>
      <ModalContainer keyboardShow={keyboardShow}>
        <ModalBar>
          <ModalClose onPress={onClose}>
            <Icon name="close" color="gray" />
          </ModalClose>
          <ModalTitle>{title}</ModalTitle>
        </ModalBar>
        <ModalContent>
          <Message>{message}</Message>
          <ModalInput
            autoFocus
            clearButtonMode="while-editing"
            value={inputText}
            placeholder={placeholder}
            onChangeText={setInputText}
          />
          <Button type="warning" onPress={handleSubmit}>
            Submit
          </Button>
        </ModalContent>
      </ModalContainer>
    </Modal>
  )
}
