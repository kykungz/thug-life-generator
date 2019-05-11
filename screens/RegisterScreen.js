import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Input'
import { Button, ActivityIndicator } from 'antd'
import {
  Image,
  SafeAreaView,
  View,
  Platform,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native'
import firebase from 'firebase'
import logo from '../assets/logo.png'

const Container = styled.SafeAreaView`
  /* background: white; */
  margin: 16px;
  flex: 1;
`

const RegisterButton = styled(Button)`
  margin-top: 8px;
`

const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

const Logo = styled.Image`
  height: 200px;
  width: 80%;
  margin-bottom: 16px;
`
export default props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      setLoading(false)
      props.navigation.replace('Main')
    } catch (error) {
      Alert.alert(
        'The Thug rejects you...',
        error.message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    setEmail(props.navigation.state.params.email)
    setPassword(props.navigation.state.params.password)
    setConfirmPassword(props.navigation.state.params.password)
  }, [])

  return (
    <>
      <ActivityIndicator
        animating={loading}
        toast
        size="large"
        text="Loading..."
      />
      <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
        <Container>
          <LogoContainer>
            <Logo source={logo} resizeMode="contain" />
          </LogoContainer>
          <Input value={name} onChangeText={setName} placeholder="Thug Name" />
          <Input value={email} onChangeText={setEmail} placeholder="Email" />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
          <RegisterButton type="warning" onPress={handleRegister}>
            Join the Thug
          </RegisterButton>
        </Container>
      </ScrollView>
    </>
  )
}
