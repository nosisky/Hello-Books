import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import hammerjs from 'hammerjs';
import Adapter from 'enzyme-adapter-react-15';
import  { RentedBooksPage } from '../../../components/pages/RentedBooksPage';
import mockData from '../../__mocks__/mockData';

configure({ adapter: new Adapter() });
jest.mock('../../../components/includes/Header')
jest.mock('../../../components/includes/SideBar');

const props = {
  user: {
    fullName: 'Test',
    plan: 'Silver',
    isAdmin: 0
  },
  actions: {
    getRentedBooksAction: jest.fn(),
    returnBook: jest.fn(),
  },
  rentedBooks: {
    allRentedBooks: mockData.modifiedBook
  }
}

describe('Component: Rented Books Page', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<RentedBooksPage {...props}/>)
    expect(wrapper.find('div').length).toBe(16);
  })

  it('tests that the component received props', () => {
    const wrapper = mount(<RentedBooksPage {...props}/>)
    expect(wrapper.props().user.fullName).toBe('Test');
    expect(wrapper.props().user.plan).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('tests that the component called getRentedBooksAction', () => {
    const wrapper = mount(<RentedBooksPage {...props}/>)
    expect(wrapper.props().actions.getRentedBooksAction).toHaveBeenCalled();
    expect(wrapper.props().user).toBeTruthy();
  })
})
