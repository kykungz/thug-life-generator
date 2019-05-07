import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { AppLoading, Font } from 'expo'
import RouterView from './router'
import CreateMemeScreen from './screens/CreateMemeScreen'
import CameraScreen from './screens/CameraScreen'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { zoomIn, fadeIn, fromBottom } from 'react-navigation-transitions'
import moment from 'moment-timezone'
import 'moment/locale/th'

moment.locale('th')
moment.tz.setDefault('Asia/Bangkok')

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]

  if (nextScene.route.routeName === 'Camera') {
    // return fadeIn()
  }
}

const StackNavigator = createStackNavigator(
  {
    Main: {
      screen: RouterView,
      navigationOptions: { title: `My Memes` },
    },
    Create: {
      screen: CreateMemeScreen,
      navigationOptions: { title: `Create New Meme` },
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        title: `Camera`,
        header: null,
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: 'black' },
      },
    },
  },
  {
    transitionConfig: nav => handleCustomTransition(nav),
    initialRouteName: 'Create',
  },
)

const AppContainer = createAppContainer(StackNavigator)

export default () => {
  const [isReady, setReady] = useState(false)

  const componentDidMount = async () => {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line no-undef
      require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    )
    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line no-undef
      require('@ant-design/icons-react-native/fonts/antfill.ttf'),
    )
    setReady(true)
  }

  useEffect(() => {
    componentDidMount()
  }, [])

  if (!isReady) {
    return <AppLoading />
  }
  return <AppContainer />
  // return <RouterView />
}
