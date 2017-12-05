import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import { BrowserRouter, Route } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-15';
import  { Profile } from '../../../components/pages/Profile';
import mockData from '../../__mocks__/mockData';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/Header');
jest.mock('../../../components/includes/SideBar');

let props;

const setup = () => {
  props = {
      user: mockData.user,
      actions: {
        getAllBooksAction: jest.fn()
      },
  }
  return mount(<BrowserRouter>
                  <Profile {...props} />
              </BrowserRouter>)
}

describe('Component: Profile', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup()
    expect(wrapper.find('div').length).toBe(29);
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('img').length).toBe(1);
  })

  it('tests that it receives the user details', () => {
    const wrapper = setup()
    expect(wrapper.props().children.props.user.fullName).toBe('test');
    expect(wrapper.props().children.props.user.plan).toBe('Silver');
    expect(wrapper.props().children.props.user.isAdmin).toBe(0);
  })
})

