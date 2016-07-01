'use strict'
import { expect } from 'chai'
import React from 'react'
import { Text, Linking } from 'react-native'
import { shallow } from 'enzyme'
import RNHyperText from '../index'
describe('<RNHyperText />', () => {
  it('should render stuff', () => {
    const wrapper = shallow(<RNHyperText />)
    expect(wrapper.length).to.equal(1)
    expect(wrapper.find(Text)).to.have.length(1)
  })

  it('should render link', () => {
    const wrapper = shallow(<RNHyperText>what is that http://www.google.com</RNHyperText>)
    expect(wrapper.find(Text)).to.have.length(3)
  })

  it('should render links', () => {
    const wrapper = shallow(<RNHyperText>https://www.zfanw.com 什么鬼what is that http://www.google.com，我不知道。</RNHyperText>)
    expect(wrapper.find(Text)).to.have.length(5)
  })

  it('should render link text', () => {
    const wrapper = shallow(<RNHyperText>https://www.zfanw.com</RNHyperText>)
    expect(wrapper.find(Text)).to.have.length(2)
    expect(wrapper.find({
      style: {
        color: 'blue'
      }
    }).props().children).to.equal('https://www.zfanw.com')
    expect(wrapper.find({
      style: {
        color: 'blue'
      }
    }).prop('onPress')).to.be.a('function')
  })
})
