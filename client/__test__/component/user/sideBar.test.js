import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { SideBar } from '../../../components/includes/SideBar';
import {getAllBooksAction} from '../../../actions/BookActions';

configure({ adapter: new Adapter() });


let props;

const setup = () => {
  props = {
    user: {
      fullName: 'test',
      id: 1,
      plan: 'Silver',
      isAdmin: 0
    },
      actions: {
        logoutAction: jest.fn(),
        editProfileAction: jest.fn()
      },
  }
  return shallow(<SideBar {...props} />)
}

describe('Component: SideBar', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('Link').length).toBe(5);
  })
  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.instance().props.user.fullName).toBe('test');
    expect(wrapper.instance().props.user.plan).toBe('Silver');
    expect(wrapper.instance().props.user.isAdmin).toBe(0);
  })

})
