import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Image, TouchableOpacity, Share, Platform } from 'react-native'
import { Button, WingBlank, Toast, ActivityIndicator } from 'antd'
import { MediaLibrary, IntentLauncherAndroid } from 'expo'

import share from '../../assets/share.png'
import save from '../../assets/save.png'

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background: #202020;
`

const Black = styled.View`
  flex: 1;
  background: black;
`

const Container = styled.View`
  flex: 1;
  margin: 16px;
`

const ButtonContainer = styled.View`
  background: #202020;
  padding: 8px;
`

const Preview = styled.Image`
  flex: 1;
  width: 100%;
  margin: 16px 0;
`

const ActionButton = styled.View`
  align-items: center;
`

const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 16px;
`

export default props => {
  const { photoUri, title, url } = props.navigation.state.params
  const [loading, setLoading] = useState(false)

  const handleShare = () => {
    if (Platform.OS === 'ios') {
      Share.share({
        title: title,
        url: photoUri,
      })
    } else {
      Share.share({
        title: title,
        message: url,
      })
    }
  }

  const handleSave = async () => {
    setLoading(true)
    await MediaLibrary.createAssetAsync(photoUri)
    setLoading(false)
  }

  return (
    <>
      <ActivityIndicator
        animating={loading}
        toast
        size="large"
        text="Saving..."
      />
      <Wrapper>
        <Black>
          <Container>
            <Preview source={{ uri: photoUri }} resizeMode="contain" />
            <ActionContainer>
              <TouchableOpacity onPress={handleSave}>
                <ActionButton>
                  <Image
                    style={{ width: 40, height: 40, marginBottom: 8 }}
                    source={save}
                    resizeMode="contain"
                  />
                  <Text style={{ color: 'white' }}>Save</Text>
                </ActionButton>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <ActionButton>
                  <Image
                    style={{ width: 40, height: 40, marginBottom: 8 }}
                    source={share}
                    resizeMode="contain"
                  />
                  <Text style={{ color: 'white' }}>Share</Text>
                </ActionButton>
              </TouchableOpacity>
            </ActionContainer>
          </Container>
        </Black>
        <ButtonContainer>
          <WingBlank size="md">
            <Button
              type="warning"
              onPress={() => props.navigation.navigate('Main')}
            >
              Done
            </Button>
          </WingBlank>
        </ButtonContainer>
      </Wrapper>
    </>
  )
}
