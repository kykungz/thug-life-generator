import React, { useState, useEffect } from 'react'
import { AppLoading, Font } from 'expo'
import RouterView from './router'

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
  return <RouterView />
}
