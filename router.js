import React, { useState, useEffect } from 'react'
import { Icon, TabBar } from 'antd'
import MyMemeScreen from './screens/MyMemeScreen'
import SettingScreen from './screens/SettingScreen'

const router = [
  {
    title: 'My Memes',
    icon: 'home',
    screen: MyMemeScreen,
  },
  {
    title: 'World Memes',
    icon: 'shop',
    screen: MyMemeScreen,
  },
  {
    title: 'Settings',
    icon: 'setting',
    screen: SettingScreen,
  },
]

const tabBarOptions = {
  unselectedTintColor: 'gray',
  tintColor: 'white',
  barTintColor: '#202020',
  borderColor: 'black',
}

export default props => {
  const [currentTab, setCurrentTab] = useState(router[0].title)

  useEffect(() => {
    props.navigation.setParams({ title: currentTab })
  }, [])

  const handleTabPress = title => {
    setCurrentTab(title)
    props.navigation.setParams({ title })
  }

  return (
    <TabBar {...tabBarOptions} style={{ borderTopWidth: 0 }}>
      {router.map(route => (
        <TabBar.Item
          key={route.title}
          title={route.title}
          icon={<Icon name={route.icon} />}
          selected={currentTab === route.title}
          onPress={() => handleTabPress(route.title)}
        >
          {route.screen(props)}
        </TabBar.Item>
      ))}
    </TabBar>
  )
}
