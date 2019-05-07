import React from 'react'
import styled from 'styled-components'
import {
  Text,
  Image,
  TouchableHighlight,
  Alert,
  View,
  TouchableOpacity,
} from 'react-native'
import cover from '../assets/cover.jpg'
import { Icon, Grid } from 'antd'
import { Camera, Permissions } from 'expo'

const Container = styled.View`
  padding: 16px;
`

const Step = styled.Text`
  font-size: 22px;
  font-weight: bold;
`

const Cover = styled.Image`
  width: 100%;
  margin: 32px 0;
`

const Album = styled(TouchableHighlight)`
  border-radius: 8px;
  background: #f0f0f0;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 8px;
  ${props => (props.left ? 'margin-left: -4px' : 'margin-right: -4px')};
`

const data = [{ icon: 'picture' }, { icon: 'camera' }]

export default props => {
  const renderItem = (item, index) => (
    <Album
      underlayColor="#f5f5f5"
      onPress={() => props.navigation.push('Camera')}
      left={index % 2 === 0}
    >
      <Icon size={50} color="black" name={item.icon} />
    </Album>
  )
  return (
    <Container>
      <Step>Step 1:</Step>
      <Cover source={cover} resizeMode="contain" />
      <Grid hasLine={false} data={data} columnNum={2} renderItem={renderItem} />
    </Container>
  )
}
