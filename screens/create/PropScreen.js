import React, { useRef, useEffect, useState } from 'react'
import {
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native'
import { Step } from './styled'
import { FaceDetector, takeSnapshotAsync } from 'expo'
import sun from '../../assets/sun.png'
import weed from '../../assets/weed.png'
import styled from 'styled-components'
import { Button, WingBlank, ActivityIndicator } from 'antd'

const sunSize = { width: 597, height: 120 }
const weedSize = { width: 240, height: 194 }

const Black = styled.SafeAreaView`
  flex: 1;
  background: #202020;
`

const Container = styled.View`
  flex: 1;
  margin: 16px;
`

const ImageContainer = styled.View`
  position: relative;
`

const SunGlasses = styled.Image`
  height: ${props => sunSize.height * (props.width / sunSize.width)}px;
  width: ${props => props.width}px;
  position: absolute;
  transform: scale(3);
`

const Weed = styled.Image`
  height: ${props => weedSize.height * (props.width / weedSize.width)}px;
  width: ${props => props.width}px;
  position: absolute;
`

const ButtonContainer = styled.View`
  background: #202020;
  padding: 8px;
`

const toRelative = (actualAmount, relativeAmount) => amount =>
  (amount * relativeAmount) / actualAmount

export default props => {
  const { photoUri } = props.navigation.state.params
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [leftEye, setLeftEye] = useState({ x: 0, y: 0 })
  const [rightEye, setRightEye] = useState({ x: 0, y: 0 })
  const [leftMouth, setLeftMouth] = useState({ x: 0, y: 0 })
  const [rightMouth, setRightMouth] = useState({ x: 0, y: 0 })
  const [face, setFace] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const meme = useRef(null)

  const handleNext = async () => {
    let photoUri = await takeSnapshotAsync(meme.current)

    if (photoUri.startsWith('/')) {
      photoUri = 'file://' + photoUri
    }

    props.navigation.push('Text', { photoUri })
  }

  const addProps = () => {
    setLoading(true)
    const toRelativeX = toRelative(image.width, imgWidth)
    const toRelativeY = toRelative(image.height, imgHeight)
    setLeftEye({
      x: toRelativeX(face.leftEyePosition.x),
      y: toRelativeY(face.leftEyePosition.y),
    })
    setRightEye({
      x: toRelativeX(face.rightEyePosition.x),
      y: toRelativeY(face.rightEyePosition.y),
    })
    setLeftMouth({
      x: toRelativeX(face.leftMouthPosition.x),
      y: toRelativeY(face.leftMouthPosition.y),
    })
    setRightMouth({
      x: toRelativeX(face.rightMouthPosition.x),
      y: toRelativeY(face.rightMouthPosition.y),
    })
    setLoading(false)
  }

  const componentDidMount = async () => {
    const { faces, image } = await FaceDetector.detectFacesAsync(photoUri, {
      mode: FaceDetector.Constants.Mode.accurate,
      detectLandmarks: FaceDetector.Constants.Landmarks.all,
    })
    const screenWidth = Dimensions.get('window').width - 32
    const scaleFactor = image.width / screenWidth
    const imageHeight = image.height / scaleFactor
    setImgWidth(screenWidth)
    setImgHeight(imageHeight)
    setFace(faces[0])
    setImage(image)
  }

  useEffect(() => {
    if (face) {
      Alert.alert(
        'The Thug sees you...',
        'We found a person, should we make him a thug?',
        [{ text: 'No', style: 'cancel' }, { text: 'Yes', onPress: addProps }],
        { cancelable: false },
      )
    }
  }, [image])

  useEffect(() => {
    componentDidMount()
  }, [])

  return (
    <>
      <ActivityIndicator
        animating={loading}
        toast
        size="large"
        text="Loading..."
      />
      <Black>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Container>
            <ScrollView style={{ flex: 1 }}>
              <Step>Step 3: Add props</Step>
              <ImageContainer ref={meme}>
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: imgWidth, height: imgHeight }}
                  resizeMode="contain"
                />
                {face && (
                  <>
                    <SunGlasses
                      width={rightEye.x - leftEye.x}
                      source={sun}
                      style={{ left: leftEye.x, top: leftEye.y }}
                      resizeMode="contain"
                    />
                    <Weed
                      width={rightMouth.x - leftMouth.x}
                      source={weed}
                      style={{
                        right:
                          imgWidth -
                          leftMouth.x -
                          (rightMouth.x - leftMouth.x) / 4,
                        top: leftMouth.y,
                      }}
                      resizeMode="contain"
                    />
                  </>
                )}
              </ImageContainer>
            </ScrollView>
          </Container>
          <ButtonContainer>
            <WingBlank size="md">
              <Button type="primary" onPress={handleNext}>
                Next
              </Button>
            </WingBlank>
          </ButtonContainer>
        </View>
      </Black>
    </>
  )
}
