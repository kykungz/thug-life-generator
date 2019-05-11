import React from 'react'
import { Text, View, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { Camera, Permissions, MediaLibrary, Constants } from 'expo'
import { Icon } from 'antd'
import styled from 'styled-components'
import ZoomView from '../components/ZoomView'

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
  margin-top: ${Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}px;
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
  height: ${props => props.height}px;
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
  border-width: 10px;
  border-color: rgba(0, 0, 0, 0.2);
`

export default class CameraScreen extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    photo: null,
    bottomBarLayout: null,
    loading: false,
    zoom: 0,
  }

  constructor(props) {
    super(props)
    this.camera = React.createRef()
    console.log(Constants.statusBarHeight)
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
    console.log('capturing...')
    const photo = await this.camera.current.takePictureAsync()
    this.setState({ photo: photo })
    console.log('captured')
  }

  submit = () => {
    this.props.navigation.goBack()
    this.props.navigation.state.params.setPhotoUri(this.state.photo.uri)
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
          <ZoomView
            onZoomProgress={zoom => {
              console.log(zoom)
              this.setState({ zoom })
            }}
          >
            <StatusBar barStyle="light-content" />
            {this.state.photo ? (
              <PreviewImage source={{ uri: this.state.photo.uri }} />
            ) : (
              <StyledCamera
                zoom={this.state.zoom}
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

            {this.state.photo ? (
              <PreviewToolbar height={this.state.bottomBarLayout.height}>
                <TouchableOpacity
                  onPress={() => this.setState({ photo: null })}
                >
                  <Retake>Retake</Retake>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.submit}>
                  <Next>
                    <Text style={{ fontSize: 14 }}>Next</Text>
                    <Icon size="sm" color="black" name="right" />
                  </Next>
                </TouchableOpacity>
              </PreviewToolbar>
            ) : (
              <CameraToolbar
                onLayout={e =>
                  this.setState({ bottomBarLayout: e.nativeEvent.layout })
                }
              >
                <TouchableOpacity onPress={this.toggleFlashMode}>
                  <Icon
                    color={
                      this.state.flashMode === Camera.Constants.FlashMode.off
                        ? 'white'
                        : 'orange'
                    }
                    size={30}
                    name="thunderbolt"
                  />
                </TouchableOpacity>
                <CaptureButton onPress={this.capture} />
                <TouchableOpacity onPress={this.flipCamera}>
                  <Icon color="white" size={30} name="sync" />
                </TouchableOpacity>
              </CameraToolbar>
            )}
          </ZoomView>
        </Container>
      )
    }
  }
}
