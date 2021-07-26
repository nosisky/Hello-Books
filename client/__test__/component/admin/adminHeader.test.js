import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { AdminHeader, 
  mapDispatchToProps,
  mapStateToProps } from '../../../components/admin/includes/AdminHeader';
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
  return mount(<AdminHeader {...props} />)
}

describe('Component: AdminHeader', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('a').length).toBe(6);
  })
  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.instance().props.user.fullName).toBe('test');
    expect(wrapper.find('a').length).toBe(6);
    expect(wrapper.instance().props.user.fullName).toBe('test');
    expect(wrapper.instance().props.user.plan).toBe('Silver');
    expect(wrapper.instance().props.user.isAdmin).toBe(0);
  })

  it('should ensure mapDispatchToProps returns binded actions creators', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps().actions.logoutAction).toBeTruthy;
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: { user: { }, apiStatus: true }
    };
    expect(mapStateToProps(storeState).apiStatus).toBeTruthy;
  });

})
