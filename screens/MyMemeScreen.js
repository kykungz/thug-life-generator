import React from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import MemeCard from '../components/MemeCard'
import styled from 'styled-components'
import { FlatGrid } from 'react-native-super-grid'
import cover from '../assets/cover.jpg'

const Container = styled.SafeAreaView``

const items = new Array(20).fill(0)

const renderItem = ({ item, index }) => {
  return <MemeCard cover={cover} contain />
}

const Grid = styled(FlatGrid)`
  /* background: #f0f0f0; */
`

export default () => {
  return (
    <Container>
      <Grid
        itemDimension={120}
        items={items}
        spacing={8}
        renderItem={renderItem}
      />
    </Container>
  )
}
