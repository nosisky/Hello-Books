import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { Dashboard } from '../../../components/pages/Dashboard';
import {getAllBooksAction} from '../../../actions/BookActions';
import DashboardFooter from '../../../components/includes/DashboardFooter';

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
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(17);
    expect(wrapper.find('img').length).toBe(2);
    expect(wrapper.find('.truncate').length).toBe(2);
    expect(wrapper.find('.card').length).toBe(2);
    expect(wrapper.find('span').length).toBe(2);
  })

  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.fullName).toBe('test');
    expect(wrapper.find('a').length).toBe(3);
    expect(wrapper.props().user.fullName).toBe('test');
    expect(wrapper.props().user.plan).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('should receive the action creators', () => {
    const wrapper = setup();

    const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');

    
    wrapper.instance().handleClick(1);    
    wrapper.instance().handlePageChange({ page: { selected: 1 } });

    expect(wrapper.props().actions.getAllBooksAction).toHaveBeenCalled();
    expect(wrapper.props().books.length).toBe(2);
    expect(wrapper.props().books[0].title).toBe('This is a test');
    expect(wrapper.props().books[0].author).toBe('dealwap');
  })

  it('should render Footer component', () => {
    const footerWrapper = shallow(<DashboardFooter />);
    expect(footerWrapper).toBeDefined();
    expect(footerWrapper.find('div').length).toBe(2);
  });

it('should receive the book props', () => {
  const wrapper = setup();
  expect(wrapper.props().books.length).toBe(2);
  expect(wrapper.props().books[0].title).toBe('This is a test');
  expect(wrapper.props().books[0].author).toBe('dealwap');
})
})
