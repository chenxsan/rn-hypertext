'use strict'
import React from 'react'
import { Text, Linking } from 'react-native'
import Link from './components/Link'
const urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/gi

export default class RNHyperText extends React.Component {
  openURL = (url) => {
    this.props.onPress(url)
  }
  render () {
    let body = []
    const str = this.props.children
    if (Object.prototype.toString.call(str).slice(8, -1) !== 'String') {
      console.warn('RNHypertext component only support plain text children.')
      return <Text {...this.props}>{this.props.children}</Text>
    } else {
      let urls = str.match(urlReg)
      let lastIndex = 0
      if (urls === null) {
        return <Text {...this.props}>{this.props.children}</Text>
      } else {
        urls.forEach((url) => {
          let index = str.indexOf(url)
          if (index === 0) {
            body.push(<Link {...this.props} url={url} onPress={this.openURL} key={index + url.length} style={{...this.props.linkStyle}}>{str.substring(index, index + url.length)}</Link>)
          } else {
            body.push(<Text {...this.props} key={index}>{str.substring(lastIndex, index)}</Text>)
            body.push(<Link {...this.props} url={url} onPress={this.openURL} key={index + url.length} style={{...this.props.linkStyle}}>{str.substring(index, index + url.length)}</Link>)
          }
          lastIndex = index + url.length
        })
        if (lastIndex < str.length) {
          body.push(<Text {...this.props} key={str.length}>{str.substring(lastIndex, str.length)}</Text>)
        }
      }
    }
    return (
      <Text>
        {body}
      </Text>
    )
  }
}
RNHyperText.propTypes = {
  children: React.PropTypes.string.isRequired,
  linkStyle: React.PropTypes.object,
  onPress: React.PropTypes.func
}
RNHyperText.defaultProps = {
  linkStyle: {
    color: 'blue'
  },
  children: '',
  onPress: (url) => {
    Linking.openURL(url)
  }
}
