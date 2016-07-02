import React from 'react'
import { Text } from 'react-native'
class Link extends React.Component {
  onPress = () => {
    this.props.onPress(this.props.url)
  }
  render () {
    return (
      <Text {...this.props} onPress={this.onPress}>{this.props.children}</Text>
    )
  }
}
Link.propTypes = {
  children: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired
}
Link.defaultProps = {
  children: '',
  url: '',
  onPress: () => {}
}
export default Link
