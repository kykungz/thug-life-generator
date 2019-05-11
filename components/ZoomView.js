import React, { Component } from 'react'
import { View, PanResponder, Dimensions } from 'react-native'

class ZoomView extends Component {
  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
      onPanResponderMove: (e, { dy }) => {
        const touches = e.nativeEvent.touches
        const { height: windowHeight } = Dimensions.get(`window`)

        if (touches.length >= 2) {
          return this.props.onZoomProgress(
            Math.min(Math.max((dy * -1) / windowHeight, 0), 0.5),
          )
        }
      },
      onMoveShouldSetPanResponder: (ev, { dx }) => {
        return dx !== 0
      },
      onPanResponderGrant: () => {
        return this.props.onZoomStart && this.props.onZoomStart()
      },
      onPanResponderRelease: () => {
        return this.props.onZoomEnd && this.props.onZoomEnd()
      },
    })
  }
  render() {
    return (
      <View
        style={{ flex: 1, width: `100%` }}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}
      </View>
    )
  }
}

export default ZoomView
