import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { Dashboard } from '../../../components/pages/Dashboard';
import getAllBooksActions from '../../../actions/BookActions';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/Header');

const props = {
  user: {
    fullName: 'Test'
  },
  actions: {
    getAllBooksActions: jest.fn().dispatch
  }
}

describe('Component: Dashboard', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<Dashboard {...props}/>)
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('li').length).toBe(6);
    expect(wrapper.find('nav').length).toBe(1);    
  })
})
