import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Input'
import { Button, ActivityIndicator } from 'antd'
import {
  Image,
  SafeAreaView,
  View,
  Platform,
  Animated,
  Alert,
} from 'react-native'
import logo from '../assets/logo.png'
import firebase from 'firebase'
import useKeyboard from '../hooks/useKeyboard'
import useAnimation from '../hooks/useAnimation'

const Black = styled.SafeAreaView`
  flex: 1;
  background: black;
`

const Container = styled.View`
  margin: 16px;
  flex: 1;
  justify-content: center;
  margin-bottom: 80px;
`

const LoginButton = styled(Button)`
  margin-top: 8px;
`

const Logo = styled.Image`
  height: 300px;
  width: 100%;
  margin-bottom: 16px;
`

export default props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  // const [animation, animateTo] = useAnimation(200)
  // useKeyboard({ onHide: () => animateTo(0) })

  const login = async () => {
    setLoading(true)
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      Alert.alert(
        'The Thug rejects you...',
        error.message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      )
    }
  }

  return (
    <>
      <ActivityIndicator
        animating={loading}
        toast
        size="large"
        text="Loading..."
      />
      <Black>
        <Container>
          <Logo source={logo} resizeMode="contain" />
          <Input
            // onFocus={() => animateTo(180)}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <Input
            // onFocus={() => animateTo(240)}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <LoginButton type="primary" onPress={login}>
            Login
          </LoginButton>
          <LoginButton
            onPress={() =>
              props.navigation.push('Register', { email, password })
            }
          >
            Register
          </LoginButton>
        </Container>
      </Black>
    </>
  )
}
