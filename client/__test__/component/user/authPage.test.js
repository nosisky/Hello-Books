import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  AuthPage  from '../../../components/auth/AuthPage';
import Footer from '../../../components/includes/Footer';


window.localStorage = {}

configure({ adapter: new Adapter() });

jest.mock('../../../components/auth/GoogleLogin');

jest.mock('../../../components/includes/NavBar');


describe('Component: AuthPage', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<AuthPage />)
    expect(wrapper.find('div').length).toBe(3);
  })

  it('should render Footer component', () => {
    const footerWrapper = shallow(<Footer />);
    expect(footerWrapper).toBeDefined();
    expect(footerWrapper.find('div').length).toBe(6);
  });

})

