import React from 'react'
import MemeCard from '../components/MemeCard'
import styled from 'styled-components'
import { FlatGrid } from 'react-native-super-grid'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import cover from '../assets/cover.jpg'

const Container = styled.View`
  flex: 1;
`

const items = [
  { name: 'Test1', cover },
  { name: 'Test2', cover },
  { name: 'Test3', cover },
  { name: 'Test4', cover },
]

const renderItem = ({ item, index }) => {
  return <MemeCard item={item} contain />
}

const Grid = styled(FlatGrid)`
  /* background: #f0f0f0; */
`

export default props => {
  const createNewMeme = () => {
    props.navigation.push('Create')
  }

  return (
    <Container>
      <Grid
        itemDimension={120}
        items={items}
        spacing={8}
        renderItem={renderItem}
      />
      <ActionButton buttonColor="rgba(231,76,60,1)" onPress={createNewMeme} />
    </Container>
  )
}
