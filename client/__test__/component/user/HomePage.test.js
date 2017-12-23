import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  {HomePage} from '../../../components/pages/HomePage';
import Footer from '../../../components/includes/Footer';

import localStorageMock from '../../__mocks__/mockLocalStorage';

window.localStorage = new localStorageMock()

configure({ adapter: new Adapter() });

jest.mock('../../../components/auth/GoogleLogin');

describe('Component: HomePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<HomePage />)
    expect(wrapper.find('div').length).toBe(46);
    expect(wrapper.find('li').length).toBe(11);
    expect(wrapper.find('nav').length).toBe(1);    
    expect(wrapper.find('button').length).toBe(3);    
    expect(wrapper.find('a').length).toBe(14);    
  })
  it('should render Footer component', () => {
    const footerWrapper = shallow(<Footer />);
    expect(footerWrapper).toBeDefined();
    expect(footerWrapper.find('div').length).toBe(6);
  });

})

