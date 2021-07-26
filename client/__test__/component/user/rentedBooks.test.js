import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import hammerjs from 'hammerjs';
import Adapter from 'enzyme-adapter-react-15';
import  { RentedBooksPage,
        mapDispatchToProps, 
        mapStateToProps } from '../../../components/pages/RentedBooksPage';
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
  it('should render the component successfully', () => {
    const wrapper = mount(<RentedBooksPage {...props}/>)
    expect(wrapper.find('div').length).toBe(16);
  })

  it('should receive props', () => {
    const wrapper = mount(<RentedBooksPage {...props}/>)
    expect(wrapper.props().user.fullName).toBe('Test');
    expect(wrapper.props().user.plan).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('should called getRentedBooksAction when component is rendered', () => {
    const wrapper = mount(<RentedBooksPage {...props}/>)
    expect(wrapper.props().actions.getRentedBooksAction).toHaveBeenCalled();
    expect(wrapper.props().user).toBeTruthy();
  })

  it('Should receive the action creators', () => {
    const wrapper = shallow(<RentedBooksPage {...props}/>)
    
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.instance().handleClick();

    expect(wrapper.instance().handleClick).toHaveBeenCalled;
  })

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps().actions.getRentedBooksAction).toBeTruthy;
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      book:  [{ title: 'test book' }],
      auth: { user: { }, apiStatus: true }
    };
    expect(mapStateToProps(storeState).rentedBooks).toHaveLength(1);
  });
  
  
})
