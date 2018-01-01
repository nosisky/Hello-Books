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

jest.mock('../../../components/includes/NavBar');



describe('Component: HomePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = shallow(<HomePage />)
    expect(wrapper.find('div').length).toBe(5);
  })
  it('should render Footer component', () => {
    const footerWrapper = shallow(<Footer />);
    expect(footerWrapper).toBeDefined();
    expect(footerWrapper.find('div').length).toBe(6);
  });

})

