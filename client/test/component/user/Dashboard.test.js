import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { Dashboard } from '../../../components/pages/Dashboard';
import getAllBooksActions from '../../../actions/BookActions';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/Header');
jest.mock('../../../components/includes/SideBar');


let props;

const setup = () => {
  this.props = {
    user: {
      fullName: 'test',
    },
      getAllBooksActions: jest.fn(() => Promise.resolve()),
  }
  return shallow(<Dashboard {...props} />)
}
describe('Component: Dashboard', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
  })
})
