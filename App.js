import React, { useState, useEffect } from 'react'
import { AppLoading, Font } from 'expo'
import RouterView from './router'
import UploadPhotoScreen from './screens/create/UploadPhotoScreen'
import TextScreen from './screens/create/TextScreen'
import PropScreen from './screens/create/PropScreen'
import FinishScreen from './screens/create/FinishScreen'
import CameraScreen from './screens/CameraScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MyMemeScreen from './screens/MyMemeScreen'
import SettingScreen from './screens/SettingScreen'
import { Ionicons } from '@expo/vector-icons'
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import { zoomIn, fadeIn, fromBottom } from 'react-navigation-transitions'
import { KeyboardAvoidingView, StatusBar } from 'react-native'
import moment from 'moment-timezone'
import 'moment/locale/th'
import firebase from 'firebase'
import NavigationService from './utils/NavigationService'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAkMpudZ995ZGOoZdQYpZzUeAK_cq1VGzI',
  authDomain: 'mobiledev-264e8.firebaseapp.com',
  databaseURL: 'https://mobiledev-264e8.firebaseio.com',
  projectId: 'mobiledev-264e8',
  storageBucket: 'mobiledev-264e8.appspot.com',
  messagingSenderId: '871573321350',
  appId: '1:871573321350:web:7a62e3ebc2832557',
}

moment.locale('th')
moment.tz.setDefault('Asia/Bangkok')

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]

  const prevPage = prevScene && prevScene.route.routeName
  const nextPage = nextScene.route.routeName

  if (nextPage === 'Login' && prevPage !== 'Register') {
    return fadeIn()
  }
  if (
    nextPage === 'Main' &&
    (prevPage === 'Login' || prevPage === 'Register')
  ) {
    return fadeIn()
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Main: MyMemeScreen,
    Setting: SettingScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Main') {
          iconName = `md-home`
        } else if (routeName === 'Setting') {
          iconName = `md-settings`
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#202020',
        paddingTop: 4,
      },
    },
  },
)

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: `Register`,
      },
    },
    Main: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('title', 'Thug Life Generator'),
      }),
    },
    UploadPhoto: {
      screen: UploadPhotoScreen,
      // navigationOptions: { title: `Upload a Photo` },
      navigationOptions: { title: `Create New Meme` },
    },
    Text: {
      screen: TextScreen,
      // navigationOptions: { title: `Decorate Your Meme` },
      navigationOptions: { title: `Create New Meme` },
    },
    Prop: {
      screen: PropScreen,
      // navigationOptions: { title: `Decorate Your Meme` },
      navigationOptions: { title: `Create New Meme` },
    },
    Finish: {
      screen: FinishScreen,
      navigationOptions: { title: `Done` },
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: { header: null },
    },
  },
  {
    transitionConfig: nav => handleCustomTransition(nav),
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#202020',
        borderBottomColor: '#202020',
      },
      headerTintColor: 'white',
    },
  },
)

const AppContainer = createAppContainer(StackNavigator)

export default () => {
  const [isReady, setReady] = useState(false)

  const componentDidMount = async () => {
    firebase.initializeApp(firebaseConfig)
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
    await Font.loadAsync({
      impact: require('./assets/fonts/impact.ttf'),
    })

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // Signed in
        console.log('signed in')
        NavigationService.replace('Main')
      } else {
        // Signed out
        console.log('signed out')
        NavigationService.replace('Login')
      }
    })
    setReady(true)
  }

  useEffect(() => {
    componentDidMount()
  }, [])

  if (!isReady) {
    return <AppLoading />
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior="padding"
    >
      <StatusBar barStyle="light-content" />
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    </KeyboardAvoidingView>
  )
}
