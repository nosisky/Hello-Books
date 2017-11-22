import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { RentedBooksPage } from '../../../components/pages/RentedBooksPage';

configure({ adapter: new Adapter() });
jest.mock('../../../actions/BookActions');
jest.mock('../../../components/includes/Header')


const props = {
  user: {
    fullName: 'Test'
  },
  actions: {
    allRentedBooks: jest.fn()
  },
  rentedBooks: {
    allRentedBooks: [{id: 1}]
  }
}

describe('Component: Rented Books Page', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = shallow(<RentedBooksPage {...props}/>)
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('li').length).toBe(6);
    expect(wrapper.find('nav').length).toBe(1);    
  })
})

