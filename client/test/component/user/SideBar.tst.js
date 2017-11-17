import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  SideBar from '../../../components/includes/SideBar';

configure({ adapter: new Adapter() });


describe('Component: SideBar', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<SideBar />)
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('li').length).toBe(6);
    expect(wrapper.find('nav').length).toBe(1);    
  })
})

