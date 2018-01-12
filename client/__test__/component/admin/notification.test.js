import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { AdminHome } from '../../../components/admin/AdminHome';
import {} from '../../../actions/UserActions';
import DashboardFooter from '../../../components/includes/DashboardFooter';

configure({ adapter: new Adapter() });

jest.mock('../../../components/admin/includes/AdminHeader');
jest.mock('../../../components/admin/includes/AdminSideBar');


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
  return shallow(<AdminHome {...props} />)
}

describe('Component: AdminHome', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.instance().props.user.fullName).toBe('test');
    expect(wrapper.instance().props.user.plan).toBe('Silver');
    expect(wrapper.instance().props.user.isAdmin).toBe(0);
  })

  it('should receive the action creator', () => {
    const wrapper = setup();
    expect(wrapper.instance().props.actions.getAllBooksAction).toHaveBeenCalled();
    expect(wrapper.instance().props.books[0].title).toBe('This is a test');
    expect(wrapper.instance().props.books[0].author).toBe('dealwap');
  })

  it('should render Footer component', () => {
    const footerWrapper = shallow(<DashboardFooter />);
    expect(footerWrapper).toBeDefined();
  });

it('should receive the book props', () => {
  const wrapper = setup();
  expect(wrapper.instance().props.books[0].title).toBe('This is a test');
  expect(wrapper.instance().props.books[0].author).toBe('dealwap');
})
})
