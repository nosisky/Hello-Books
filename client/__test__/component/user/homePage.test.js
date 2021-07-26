import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  {HomePage, mapStateToProps} from '../../../components/pages/HomePage';
import Footer from '../../../components/includes/Footer';

window.localStorage = {}

configure({ adapter: new Adapter() });

jest.mock('../../../components/auth/GoogleLogin');

jest.mock('../../../components/includes/NavBar');


describe('Component: HomePage', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<HomePage />)
    expect(wrapper.find('div').length).toBe(5);
  })
  it('should render Footer component', () => {
    const footerWrapper = shallow(<Footer />);
    expect(footerWrapper).toBeDefined();
    expect(footerWrapper.find('div').length).toBe(6);
  });


  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: { user: { }, apiStatus: true, message: 'Hello test' },
    };
    expect(mapStateToProps(storeState).message).toEqual('Hello test');
  });

})

