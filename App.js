import React from 'react'
import { Text, View } from 'react-native'
import { Icon, SearchBar, TabBar } from '@ant-design/react-native'
import { AppLoading, Font } from 'expo'
import RouterView from './router'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'redTab',
      isReady: false,
    }
  }

  renderContent(pageText) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    )
  }

  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    })
  }

  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    )

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf'),
    )
    // eslint-disable-next-line
    this.setState({ isReady: true })
  }

  render() {
    const { isReady } = this.state
    if (!isReady) {
      return <AppLoading />
    }
    return <RouterView />
  }
}
