'use strict'
import React from 'react'
import { Text, Linking } from 'react-native'
import Link from './components/Link'
const urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/gi
// 1. plain text won't accept onPress prop
// 2. link text action can't be customized
export default class RNHyperText extends React.Component {
  openURL = (url) => {
    Linking.openURL(url)
  }
  onPressPlainText = () => {}
  render () {
    let body = []
    const str = this.props.children
    if (Object.prototype.toString.call(str).slice(8, -1) !== 'String') {
      console.warn('RNHypertext component only support plain text children.')
      // no link, no need to pass linkStyle prop
      return <Text {...this.props} onPress={this.onPressPlainText}>{this.props.children}</Text>
    } else {
      let urls = str.match(urlReg)
      let lastIndex = 0
      if (urls === null) {
        return <Text {...this.props} onPress={this.onPressPlainText}>{this.props.children}</Text>
      } else {
        urls.forEach((url) => {
          let index = str.indexOf(url)
          if (index === 0) {
            console.log(this.props.style)
            body.push(<Link {...this.props} url={url} onPress={this.openURL} key={index + url.length} style={[this.props.style, {color: 'blue'}, this.props.linkStyle]}>{str.substring(index, index + url.length)}</Link>)
          } else {
            body.push(<Text {...this.props} onPress={this.onPressPlainText} key={index}>{str.substring(lastIndex, index)}</Text>)
            body.push(<Link {...this.props} url={url} onPress={this.openURL} key={index + url.length} style={[this.props.style, {color: 'blue'}, this.props.linkStyle]}>{str.substring(index, index + url.length)}</Link>)
          }
          lastIndex = index + url.length
        })
        if (lastIndex < str.length) {
          body.push(<Text {...this.props} onPress={this.onPressPlainText} key={str.length}>{str.substring(lastIndex, str.length)}</Text>)
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
  onPress: React.PropTypes.func,
  style: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array])
}
RNHyperText.defaultProps = {
  children: ''
}
