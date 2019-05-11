import React, { useEffect, useState, useRef } from 'react'
import {
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import { takeSnapshotAsync, MediaLibrary } from 'expo'
import { Step } from './styled'
import styled from 'styled-components'
import { Button, WingBlank } from 'antd'
import InputModal from '../../components/InputModal'

const styles = StyleSheet.create({
  textWithShadow: {
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
})

const Black = styled.SafeAreaView`
  flex: 1;
  background: #202020;
`

const Wrapper = styled.View`
  flex: 1;
  position: relative;
  background: black;
`

const Container = styled.View`
  flex: 1;
  margin: 16px;
`

const Preview = styled.Image`
  width: ${props => props.imgWidth};
  height: ${props => props.imgHeight};
`

const DecorateContainer = styled.View`
  width: 100%;
  position: relative;
  margin-top: 16px;
`

const TopTextContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`

const BottomTextContainer = styled(TopTextContainer)`
  top: auto;
  bottom: 0;
`

const AddText = styled.TouchableOpacity`
  background: white;
  border-radius: 24px;
  padding: 8px 16px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 16px;
`

const MemeText = styled.Text`
  font-family: 'impact';
  text-align: center;
  font-size: 40px;
  line-height: 40px;
  color: white;
  padding: 16px;
`

const ButtonContainer = styled.View`
  background: #202020;
  padding: 8px;
`

const layer = Component => [1, 2, 3, 4, 5].map(v => <Component key={v} />)

export default props => {
  const { photoUri } = props.navigation.state.params
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [topDialogVisible, setTopDialogVisible] = useState(false)
  const [bottomDialogVisible, setBottomDialogVisible] = useState(false)
  const [topText, setTopText] = useState('พี่ดุนะ')
  const [bottomText, setBottomText] = useState('น้องไหวหรอ')
  const meme = useRef(null)

  // const photoUri =
  //   'file:///var/mobile/Containers/Data/Application/4CD7F258-A542-4D25-84E3-6BFC4A096D2F/Library/Caches/ExponentExperienceData/%2540anonymous%252Fthug-life-generator-abaa7a31-9515-47e1-9c7b-2039b3874be4/ImagePicker/A1AEE045-4DAC-4E4E-A75A-22CE418F83A8.jpg'
  // const photoUri = 'https://i.imgflip.com/5hg1b.jpg'

  const handleNext = async () => {
    let photoUri = await takeSnapshotAsync(meme.current)

    if (photoUri.startsWith('/')) {
      photoUri = 'file://' + photoUri
    }

    props.navigation.push('Finish', { photoUri })
  }

  useEffect(() => {
    Image.getSize(photoUri, (width, height) => {
      const screenWidth = Dimensions.get('window').width - 32
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      setImgWidth(screenWidth)
      setImgHeight(imageHeight)
    })
  }, [])

  return (
    <>
      <InputModal
        isVisible={topDialogVisible}
        title="Add Top Text"
        message="Text to display on the top"
        placeholder="Steals kids bicycle"
        onSubmit={setTopText}
        onClose={() => setTopDialogVisible(false)}
        initialValue={topText}
      />
      <InputModal
        isVisible={bottomDialogVisible}
        title="Add Bottom Text"
        message="Text to display on the bottom"
        placeholder="THUG LIFE"
        onSubmit={setBottomText}
        onClose={() => setBottomDialogVisible(false)}
        initialValue={bottomText}
      />
      <Black>
        <Wrapper>
          <ScrollView style={{ flex: 1 }}>
            <Container>
              <Step>Step 2: Add meme text</Step>

              <DecorateContainer ref={meme}>
                <Preview
                  source={{ uri: photoUri }}
                  imgWidth={imgWidth}
                  imgHeight={imgHeight}
                  resizeMode="contain"
                />
                {topText === '' ? (
                  <TopTextContainer>
                    <AddText onPress={() => setTopDialogVisible(true)}>
                      <Text>Add Top Text</Text>
                    </AddText>
                  </TopTextContainer>
                ) : (
                  layer(() => (
                    <TopTextContainer>
                      <TouchableOpacity
                        onPress={() => setTopDialogVisible(true)}
                      >
                        <MemeText style={styles.textWithShadow}>
                          {topText}
                        </MemeText>
                      </TouchableOpacity>
                    </TopTextContainer>
                  ))
                )}
                {bottomText === '' ? (
                  <BottomTextContainer>
                    <AddText onPress={() => setBottomDialogVisible(true)}>
                      <Text>Add Bottom Text</Text>
                    </AddText>
                  </BottomTextContainer>
                ) : (
                  layer(() => (
                    <BottomTextContainer>
                      <TouchableOpacity
                        onPress={() => setBottomDialogVisible(true)}
                      >
                        <MemeText style={styles.textWithShadow}>
                          {bottomText}
                        </MemeText>
                      </TouchableOpacity>
                    </BottomTextContainer>
                  ))
                )}
              </DecorateContainer>
            </Container>
          </ScrollView>
        </Wrapper>
        <ButtonContainer>
          <WingBlank size="md">
            <Button type="primary" onPress={handleNext}>
              Next
            </Button>
          </WingBlank>
        </ButtonContainer>
      </Black>
    </>
  )
}
