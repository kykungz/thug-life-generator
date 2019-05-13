import React, { useEffect, useState } from 'react'
import MemeCard from '../components/MemeCard'
import styled from 'styled-components'
import { FlatGrid } from 'react-native-super-grid'
import ActionButton from 'react-native-action-button'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import cover from '../assets/cover.jpg'
import axios from 'axios'
import { Buffer } from 'buffer'

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
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest()
    //   xhr.onload = function() {
    //     resolve(xhr.response)
    //   }
    //   xhr.onerror = function(e) {
    //     console.log(e)
    //     reject(new TypeError('Network request failed'))
    //   }
    //   xhr.responseType = 'blob'
    //   xhr.open('GET', url, true)
    //   xhr.send(null)
    // })

    // let image = await axios.get(url, {
    //   responseType: 'arraybuffer',
    // })
    // let returnedB64 =
    //   'data:image/jpg;' + Buffer.from(image.data).toString('base64')

    props.navigation.push('Finish', { photoUri: url, url })
  }

  const renderItem = ({ item }) => {
    return (
      <MemeCard item={item} onPress={() => handlePress(item.url)} contain />
    )
  }

  const componentDidMount = async () => {
    const user = firebase.auth().currentUser
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .on('value', snapshot => {
        try {
          const value = snapshot.val()
          const memes = value.memes || {}
          setMemes(
            Object.keys(memes).map(key => ({
              key,
              url: memes[key],
              name: value.name,
              email: value.email,
            })),
          )
        } catch (error) {
          firebase.auth().signOut()
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
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => props.navigation.push('UploadPhoto')}
        />
      </Container>
    </Black>
  )
}
