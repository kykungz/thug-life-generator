import React from 'react'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components'

const Cover = styled.ImageBackground`
  padding-top: 100%;
  height: 0;
  width: 100%;
  background: white;
`

const CoverTopContainer = styled.View`
  overflow: hidden;
  height: 0;
  padding-top: 100%;
  width: 100%;
`

const CoverTopImage = styled.Image`
  position: absolute;
  width: 100%;
  top: 0;
`

const CoverTop = ({ source }) => (
  <CoverTopContainer>
    <CoverTopImage source={source} />
  </CoverTopContainer>
)

const CoverContain = ({ source }) => (
  <Cover imageStyle={{ resizeMode: 'contain' }} source={source} />
)

const Container = styled.View`
  border-radius: 4px;
  overflow: hidden;
`

const Wrapper = styled.View`
  shadow-opacity: 1;
  shadow-radius: 2px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 1px 1px;
`

const InfoContainer = styled.View`
  background: white;
  padding: 8px;
`

export default props => {
  const { contain } = props
  const { cover, name } = props.item

  return (
    <Wrapper>
      <Container>
        {contain ? (
          <CoverContain source={cover} />
        ) : (
          <CoverTop source={cover} />
        )}
        <InfoContainer>
          <Text>{name}</Text>
        </InfoContainer>
      </Container>
    </Wrapper>
  )
}
