import React, { useEffect, useState } from 'react'
import MemeCard from '../components/MemeCard'
import styled from 'styled-components'
import { FlatGrid } from 'react-native-super-grid'
import ActionButton from 'react-native-action-button'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import cover from '../assets/cover.jpg'

const Black = styled.SafeAreaView`
  flex: 1;
  background: black;
`

const Container = styled.View`
  flex: 1;
`

export default props => {
  const [memes, setMemes] = useState([])

  const handlePress = async url => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function() {
        resolve(xhr.response)
      }
      xhr.onerror = function(e) {
        console.log(e)
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', url, true)
      xhr.send(null)
    })
    props.navigation.push('Finish', { photoUri: url, url })
  }

  const renderItem = ({ item }) => {
    return (
      <MemeCard item={item} onPress={() => handlePress(item.url)} contain />
    )
  }

  const componentDidMount = async () => {
    console.log('mounted')
    firebase
      .database()
      .ref(`users`)
      .on('value', snapshot => {
        console.log('value')
        console.log(snapshot.val())
        try {
          const users = snapshot.val()
          setMemes(
            Object.keys(users)
              .map(key => {
                const user = users[key]
                const memes = user.memes || {}
                return Object.keys(memes).map(key => ({
                  key,
                  url: memes[key],
                  name: user.name,
                  email: user.email,
                }))
              })
              .reduce((acc, cur) => acc.concat(cur), []),
          )
        } catch (error) {
          firebase.auth().signOut()
          console.log(error)
        }
      })
  }

  useEffect(() => {
    componentDidMount()
  }, [])

  return (
    <Black>
      <Container>
        <FlatGrid
          itemDimension={120}
          items={memes}
          spacing={8}
          renderItem={renderItem}
        />
      </Container>
    </Black>
  )
}
