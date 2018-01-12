import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import {getAllBooksAction} from '../../../actions/BookActions';
import { AllBooks } from '../../../components/admin/includes/AllBooks';

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
    getAllBooksAction: jest.fn(),
    modifyBookAction: jest.fn(),
    deleteBookAction: jest.fn(),
    books: mockData.modifiedBook
  }
  return mount(<AllBooks {...props} />)
}

describe('Component: AllBooks', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.truncate').length).toBe(1);
    expect(wrapper.find('.card').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  })

  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.fullName).toBe('test');
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.props().user.fullName).toBe('test');
    expect(wrapper.props().user.plan).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('should receive the action creators', () => {
    const wrapper = setup();
    const newState = wrapper.setState({ displayBook: true, edit: false });
    expect(wrapper.props().deleteBookAction).toBeTruthy;
    expect(wrapper.props().modifyBookAction).toBeTruthy;
    expect(wrapper.props().books.length).toBe(2);
    expect(wrapper.state().edit).toBeFalsy;
    expect(wrapper.state().displayBook).toBeTruthy;
    expect(wrapper.props().books[0].title).toBe('This is a test');
    expect(wrapper.props().books[0].author).toBe('dealwap');
  })

  it('should render Footer component', () => {
    const footerWrapper = shallow(<AllBooks />);
    expect(footerWrapper).toBeDefined();
    expect(footerWrapper.find('div').length).toBe(5);
  });

it('should receive the book props', () => {
  const wrapper = setup();
  expect(wrapper.props().books.length).toBe(2);
  expect(wrapper.props().books[0].title).toBe('This is a test');
  expect(wrapper.props().books[0].author).toBe('dealwap');
})

it('should call handleClick to delete book', () => {
  const wrapper = setup();
  const action = wrapper.instance();

  wrapper.find('#delete_button').simulate('click');
  
  expect(action.handleClick).toBeTruthy()
});

it('should call changeView to change page view', () => {
  const wrapper = setup();
  const action = wrapper.instance();
  
  wrapper.find('#edit_button').simulate('click');

  const handleFormSubmit = jest.spyOn(action, 'handleFormSubmit');
  wrapper.instance().handleFormSubmit({ preventDefault: () => 1 });
  
  expect(handleFormSubmit).toHaveBeenCalled()
});

it('should change username value as entered by user', () => {
  const wrapper = setup();
  
  const action = wrapper.instance();
  
  const event = {
    target: {
      name: 'productionYear',
      value: 'Test'
    }
  };
  action.onChange(event);
  expect(action.state.productionYear)
    .toEqual('Test');
});

})
