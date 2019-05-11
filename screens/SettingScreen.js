import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import firebase from 'firebase'

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 16px;
`

const SettingScreen = () => {
  const handleLogout = () => {
    firebase.auth().signOut()
  }

  return (
    <Container>
      <Button type="warning" onPress={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default SettingScreen
