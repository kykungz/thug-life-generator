import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { Camera, Permissions, MediaLibrary } from 'expo'
import { Icon } from 'antd'
import styled from 'styled-components'

const StyledCamera = styled(Camera)`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

const PreviewImage = styled.Image`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
`

const Container = styled.SafeAreaView`
  flex: 1;
  background: black;
  position: relative;
  /* padding-bottom: 160px; */
`

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background: transparent;
  width: 100%;
  padding: 16px;
`

const CameraToolbar = styled.View`
  width: 100%;
  background: black;
  padding: 16px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const PreviewToolbar = styled(CameraToolbar)`
  justify-content: space-between;
`

const Retake = styled.Text`
  font-size: 18px;
  color: white;
`

const Next = styled.View`
  background: white;
  border-radius: 24px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
`

const CaptureButton = styled.TouchableOpacity`
  background: white;
  width: 76px;
  height: 76px;
  border-radius: 76px;
  border-width: 8px;
  border-color: rgba(0, 0, 0, 0.2);
`

export default class CameraScreen extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    photoUri: null,
  }

  constructor(props) {
    super(props)
    this.camera = React.createRef()
  }

  async componentDidMount() {
    const { status: cameraStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
    )
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    )
    this.setState({
      hasPermission:
        cameraStatus === 'granted' && cameraRollStatus === 'granted',
    })
  }

  // upload = async () => {
  //   const { assets } = await MediaLibrary.getAssetsAsync({ first: 100 })
  //   const promises = assets
  //     .filter(asset => asset.mediaSubtypes.length === 0)
  //     .map(asset => {
  //       console.log('fetching ' + asset.filename)
  //       const data = new FormData()
  //       data.append('photo', {
  //         name: 'test',
  //         type: 'multipart/form-data',
  //         uri: asset.uri,
  //       })
  //       return fetch(
  //         'https://api-dot-nisitgeneration-c2a35.appspot.com/mobile-dev/upload',
  //         {
  //           method: 'POST',
  //           body: data,
  //         },
  //       )
  //     })
  //   await Promise.all(promises)
  // }

  toggleFlashMode = () => {
    this.setState(prevState => ({
      flashMode:
        prevState.flashMode === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off,
    }))
  }

  flipCamera = () => {
    this.setState(prevState => ({
      type:
        prevState.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    }))
  }

  capture = async () => {
    console.log('taking picture')
    const { uri } = await this.camera.current.takePictureAsync()
    this.setState({ photoUri: uri })
  }

  ok = async () => {
    console.log('creating image')
    console.log(this.state.photoUri)
    const asset = await MediaLibrary.createAssetAsync(this.state.photoUri)
    console.log('creating album')
    await MediaLibrary.createAlbumAsync('Thug Life Memes', asset, false)
    console.log('finished')
  }

  render() {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <Container>
          {this.state.photoUri ? (
            <PreviewImage source={{ uri: this.state.photoUri }} />
          ) : (
            <StyledCamera
              ref={this.camera}
              type={this.state.type}
              flashMode={this.state.flashMode}
              autoFocus={Camera.Constants.AutoFocus.on}
            >
              <TopBar>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon color="white" size={30} name="left" />
                </TouchableOpacity>
              </TopBar>
            </StyledCamera>
          )}

          {this.state.photoUri ? (
            <PreviewToolbar>
              <TouchableOpacity
                onPress={() => this.setState({ photoUri: null })}
              >
                <Retake>Retake</Retake>
              </TouchableOpacity>
              <TouchableOpacity>
                <Next>
                  <Text style={{ fontSize: 14 }}>Next</Text>
                  <Icon size="sm" color="black" name="right" />
                </Next>
              </TouchableOpacity>
            </PreviewToolbar>
          ) : (
            <CameraToolbar>
              <TouchableOpacity onPress={this.toggleFlashMode}>
                <Icon color="white" size={30} name="thunderbolt" />
              </TouchableOpacity>
              <CaptureButton onPress={this.capture} />
              <TouchableOpacity onPress={this.flipCamera}>
                <Icon color="white" size={30} name="sync" />
              </TouchableOpacity>
            </CameraToolbar>
          )}
        </Container>
      )
    }
  }
}
