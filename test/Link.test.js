'use strict'
import { expect } from 'chai'
import React from 'react'
import { Text } from 'react-native'
import Link from '../components/Link'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
describe('<Link />', () => {
  it('should render stuff', () => {
    const wrapper = shallow(<Link />)
    expect(wrapper.length).to.equal(1)
    expect(wrapper.find(Text)).to.have.length(1)
  })

  it('should render children when passed in', () => {
    const wrapper = shallow(<Link>hello world</Link>)
    expect(wrapper.contains('hello world')).to.equal(true)
  })

  it('simulates press event', () => {
    const onLinkClicked = spy()
    const wrapper = shallow(<Link onPress={onLinkClicked} />)
    wrapper.find(Text).simulate('press')
    expect(onLinkClicked.calledOnce).to.equal(true)
  })
})
