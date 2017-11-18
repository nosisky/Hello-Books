import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  {HomePage} from '../../../components/pages/HomePage';
import localStorageMock from '../../__mocks__/mockLocalStorage';

window.localStorage = new localStorageMock()

configure({ adapter: new Adapter() });


describe('Component: HomePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<HomePage />)
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('li').length).toBe(6);
    expect(wrapper.find('nav').length).toBe(1);    
  })
})
