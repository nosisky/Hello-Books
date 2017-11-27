import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { Dashboard } from '../../../components/pages/Dashboard';
import {getAllBooksAction} from '../../../actions/BookActions';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/Header');
jest.mock('../../../components/includes/SideBar');


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
        getAllBooksAction: jest.fn()
      },
      books: mockData.modifiedBook
  }
  return mount(<Dashboard {...props} />)
}

describe('Component: Dashboard', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(15);
    expect(wrapper.find('img').length).toBe(2);
    expect(wrapper.find('.truncate').length).toBe(2);
    expect(wrapper.find('.card').length).toBe(2);
  })

  it('tests that the component received the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.fullName).toBe('test');
    expect(wrapper.props().user.fullName).toBe('test');
    expect(wrapper.props().user.plan).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('tests that the component received the action creator', () => {
    const wrapper = setup();
    expect(wrapper.props().actions.getAllBooksAction).toHaveBeenCalled();
  })
})
