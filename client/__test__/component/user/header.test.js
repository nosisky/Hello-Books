import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';

import { Header,
   mapStateToProps, 
   mapDispatchToProps } from '../../../components/includes/Header';
import { getAllBooksAction } from '../../../actions/BookActions';

configure({ adapter: new Adapter() });

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
			logout: jest.fn(),
			editProfileAction: jest.fn()
		}
	};
	return shallow(<Header {...props} />);
};

describe('Component: Header', () => {
	it('should render the component successfully', () => {
		const wrapper = setup();
		expect(wrapper.find('div').length).toBe(8);
		expect(wrapper.find('Link').length).toBe(1);
		expect(wrapper.find('a').length).toBe(6);
	});
	it('should receive the user props', () => {
		const wrapper = setup();
		expect(wrapper.instance().props.user.fullName).toBe('test');
		expect(wrapper.find('a').length).toBe(6);
		expect(wrapper.instance().props.user.fullName).toBe('test');
		expect(wrapper.instance().props.user.plan).toBe('Silver');
		expect(wrapper.instance().props.user.isAdmin).toBe(0);
	});

	it('should receive the action creator', () => {
		const wrapper = setup();

		const logoutActionSpy = jest.spyOn(wrapper.instance(), 'logout');

		const event = {
			preventDefault: jest.fn()
		};

		wrapper.instance().logout(event);

		expect(wrapper.instance().props.actions.logout).toHaveBeenCalled;
		wrapper.instance().props.actions.logout();
		expect(wrapper.instance().props.actions.editProfileAction).toBeTruthy;
		expect(wrapper.instance().props.actions.logout).toHaveBeenCalled;
  });
  
  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: { user: { }, apiStatus: true },
    };
    expect(mapStateToProps(storeState).apiStatus).toBeTruthy;
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps().actions.searchActions).toBeTruthy;
  });
});
