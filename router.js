import React, { useState } from 'react'
import { Icon, TabBar } from 'antd'
import MyMemeScreen from './screens/MyMemeScreen'

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
    title: 'Setting',
    icon: 'setting',
    screen: MyMemeScreen,
  },
]

const tabBarOptions = {
  unselectedTintColor: '#949494',
  tintColor: '#33A3F4',
  barTintColor: '#f5f5f5',
}

export default props => {
  const [currentTab, setCurrentTab] = useState(router[0].title)

  return (
    <TabBar {...tabBarOptions}>
      {router.map(route => (
        <TabBar.Item
          key={route.title}
          title={route.title}
          icon={<Icon name={route.icon} />}
          selected={currentTab === route.title}
          onPress={() => setCurrentTab(route.title)}
        >
          {route.screen(props)}
        </TabBar.Item>
      ))}
    </TabBar>
  )
}
