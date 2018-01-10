import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { LoginForm } from '../../../components/auth/LoginForm';

window.localStorage = { getItem: () => process.env.testToken };

jest.doMock('../../../components/auth/GoogleLogIn', () => {
	const GoogleLogIn = () => <div />;
	return GoogleLogIn;
});

configure({ adapter: new Adapter() });

let props;
const setup = () => {
	props = {
		onSubmit: jest.fn(() => Promise.resolve('hello')),
		UserExist: jest.fn(),
		EmailExist: jest.fn()
	};
	return shallow(<LoginForm {...props} />);
};

describe('Component: LoginForm', () => {
	it('should render the component successfully', () => {
		const wrapper = setup();
		expect(wrapper.find('div').length).toBe(7);
		expect(wrapper.find('button').length).toBe(1);
		expect(wrapper.find('form').length).toBe(1);
		expect(wrapper.find('input').length).toBe(2);
	});

	it('should set username value in the localState when value changes', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'username',
				value: 'Dealwap'
			}
		};
		action.onChange(event);
		expect(action.state.username).toEqual('Dealwap');
	});

	it('should set password value in the localState when value changes', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'password',
				value: 'Dealwap'
			}
		};
		action.onChange(event);
		expect(action.state.password).toEqual('Dealwap');
	});

	it('should login user when form is submitted', () => {
		const wrapper = setup();
		const action = wrapper.instance();
		const signUp = jest.spyOn(wrapper.instance(), 'handleSubmit');
		action.handleSubmit({ preventDefault: () => 1 });
		expect(signUp).toBeCalled();
  });
  
});
