import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Text,
  Image,
  TouchableHighlight,
  Alert,
  View,
  TouchableOpacity,
} from 'react-native'
import { Step } from './styled'
import cover from '../../assets/cover.jpg'
import { Icon, Grid, Button, WingBlank } from 'antd'
import { Camera, Permissions, ImagePicker } from 'expo'

const Black = styled.SafeAreaView`
  flex: 1;
  background: #202020;
`

const Container = styled.View`
  flex: 1;
  margin: 16px;
`

const Preview = styled.Image`
  flex: 1;
  width: 100%;
  margin: 16px 0;
`

const Placeholder = styled.View`
  flex: 1;
  background: lightgray;
  margin: 16px -16px;
`

const Action = styled(TouchableHighlight)`
  border-radius: 2px;
  background: white;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 8px;
  ${props => (props.left ? 'margin-left: -4px' : 'margin-right: -4px')};
`

const ButtonContainer = styled.View`
  background: #202020;
  padding: 8px;
`

export default props => {
  const [photoUri, setPhotoUri] = useState(null)

  const data = useMemo(
    () => [
      {
        icon: 'picture',
        text: 'Import from album',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync()
          if (!result.cancelled) {
            setPhotoUri(result.uri)
          }
        },
      },
      {
        icon: 'camera',
        text: 'Take a photo',
        // onPress: () => props.navigation.push('Camera', { setPhotoUri }),
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync()
          if (!result.cancelled) {
            setPhotoUri(result.uri)
          }
        },
      },
    ],
    [],
  )

  const renderItem = (item, index) => (
    <Action
      underlayColor="#f5f5f5"
      onPress={item.onPress}
      left={index % 2 === 0}
    >
      <View style={{ alignItems: 'center' }}>
        <Icon
          size={50}
          color="black"
          name={item.icon}
          style={{ marginBottom: 8 }}
        />
        <Text>{item.text}</Text>
      </View>
    </Action>
  )

  const componentDidMount = async () => {
    const { status: cameraStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
    )
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    )
  }

  useEffect(() => {
    componentDidMount()
  }, [])

  return (
    <Black>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Container>
          <Step>Step 1: Add a photo</Step>
          {photoUri ? (
            <Preview source={{ uri: photoUri }} resizeMode="contain" />
          ) : (
            <Placeholder />
          )}
          <Grid
            hasLine={false}
            data={data}
            columnNum={2}
            renderItem={renderItem}
          />
        </Container>
        <ButtonContainer>
          <WingBlank size="md">
            <Button
              type="warning"
              disabled={!photoUri}
              onPress={() => props.navigation.push('Prop', { photoUri })}
            >
              Next
            </Button>
          </WingBlank>
        </ButtonContainer>
      </View>
    </Black>
  )
}
