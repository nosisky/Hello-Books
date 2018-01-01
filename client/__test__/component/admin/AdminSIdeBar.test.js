import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import firebase from 'firebase';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { AdminSideBar } from '../../../components/admin/includes/AdminSideBar';
import {getAllBooksAction} from '../../../actions/BookActions';

configure({ adapter: new Adapter() });

jest.mock('../../../components/admin/includes/AddBookModal', () => 'AddBookModal');
jest.mock('../../', () => { storage: jest.fn() });

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
  return shallow(<AdminSideBar {...props} />)
}

describe('Component: AdminSideBar', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(12);
    expect(wrapper.find('Link').length).toBe(4);
  })
  it('tests that the component received the user props', () => {
    const wrapper = setup();
    expect(wrapper.instance().props.user.fullName).toBe('test');
    expect(wrapper.instance().props.user.plan).toBe('Silver');
    expect(wrapper.instance().props.user.isAdmin).toBe(0);
  })

})
