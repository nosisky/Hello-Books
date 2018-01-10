import React from 'react';
import expect from 'expect';
import $ from 'jquery';

import { Simulate } from 'react-dom/test-utils';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-15';
import EditProfileModal from '../../../components/includes/EditProfileModal';
import mockData from '../../__mocks__/mockData';

configure({ adapter: new Adapter() });

global.$ = global.jQuery = $;

jest.mock('../../../components/includes/Header');
jest.mock('../../../components/includes/SideBar');

let props;

const setup = () => {
	props = {
		username: 'james',
		fullName: 'Nasiru Bola',
		email: 'nosisky@gmail.com',
		onSubmit: jest.fn(),
		actions: {
			editProfileAction: jest.fn()
		}
	};
	return mount(<EditProfileModal {...props} />);
};

describe('Component: EditProfileModal', () => {
	it('should render the component successfully', () => {
		const wrapper = setup();
		expect(wrapper.find('div').length).toBe(17);
	});

	it('should change email value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'email',
				value: 'nosisky@gmail.com'
			}
		};
		action.onChange(event);
		expect(action.state.email).toEqual('nosisky@gmail.com');
	});

	it('should change full name value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'fullName',
				value: 'James Ibori'
			}
		};
		action.onChange(event);
		expect(action.state.fullName).toEqual('James Ibori');
	});

	it('should set fullnameError for invalid input', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'fullName',
				value: 123
			}
		};
		action.onBlur(event);
    expect(action.state.fullnameError)
    .toEqual('Invalid input, only alphabets are allowed');
	});

	it('should set emailExist error message for invalid email', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'email',
				value: 'djdjdj'
			}
		};
		action.onBlur(event);
    expect(action.state.emailExist)
    .toEqual('Invalid email supplied!');
	});

	it('should check if emailExist then set error message', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'email',
				value: 'nosisky@gmail.com'
			}
		};
		action.onBlur(event);
    expect(action.state.emailExist)
    .toEqual('');
	});


	it('should clear fullName error when input box is targeted', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'fullName',
				value: 'Dealwap'
			}
		};
		action.onFocus(event);
		expect(action.state.fullnameError).toEqual('');
  });
  
  it('should clear emailError when inout box is targeted', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'email',
				value: 'dealwap@test.com'
			}
		};
		action.onFocus(event);
		expect(action.state.emailExist).toEqual('');
	});
	
	it('should call handleSubmit when edit profile form is submitted', () => {
		const wrapper = setup();
		const action = wrapper.instance();

		const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
		action.handleSubmit({ preventDefault: () => 1 });
		expect(handleSubmit).toBeCalled();
	});
  
});
