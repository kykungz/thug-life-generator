import React, { useState } from 'react'
import { Icon, TabBar } from '@ant-design/react-native'
import { Text, View } from 'react-native'

const router = [
  {
    title: 'My Memes',
    icon: 'home',
    screen: () => <Text>My memes</Text>,
  },
  {
    title: 'Memes Market',
    icon: 'shop',
    screen: () => <Text>My memes</Text>,
  },
]

const tabBarOptions = {
  unselectedTintColor: '#949494',
  tintColor: '#33A3F4',
  barTintColor: '#f5f5f5',
}

export default () => {
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
          {route.screen()}
        </TabBar.Item>
      ))}
    </TabBar>
  )
}
