import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { RegisterationForm } from '../../../components/auth/RegisterationForm';

window.localStorage = {}

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onSubmit: jest.fn(() => Promise.resolve('hello')),
      UserExist: jest.fn(() => Promise.resolve('hello')),
      EmailExist: jest.fn(() => Promise.resolve(''))
  }
  return mount(<RegisterationForm {...props} />)
}
describe('Component: RegisterationForm', () => {
  
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(18);
    expect(wrapper.find('button').length).toBe(1);    
    expect(wrapper.find('form').length).toBe(1);    
    expect(wrapper.find('input').length).toBe(5);    
  })

  it('should recieve the input validators', () => {
    const wrapper = setup();
    expect(wrapper.props().UserExist).toBeTruthy;    
    expect(wrapper.props().EmailExist).toBeTruthy;  
  })

  it('should change username value as entered by user', () => {
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'username',
        value: 'Test'
      }
    };
    action.onChange(event);
    expect(action.state.username)
      .toEqual('Test');
  });

  it('should change fullName value as entered by user', () => {
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'fullName',
        value: 'Test'
      }
    };
    action.onChange(event);
    expect(action.state.fullName)
      .toEqual('Test');
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
    expect(action.state.email)
      .toEqual('nosisky@gmail.com');
  });

  it('should set passwordError value for password with 5 characters', () => {
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'password',
        value: 'test'
      }
    };
    action.onBlur(event);
    expect(action.state.passwordError)
      .toEqual('Password must be a minimum of 5 characters');
  });

  it('should set usernameError value for username with 4 characters', () => {
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'username',
        value: 'test'
      }
    };
    action.onBlur(event);
    expect(action.state.usernameError)
      .toEqual('');
  });

  it('should set emailError value for email with 4 characters', () => {
    
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'email',
        value: 'test@test.com'
      }
    };
    action.onBlur(event);
    expect(action.state.emailExist)
      .toEqual('');
  });

  it('should empty passwordError value for password with 5 characters and above', () => {
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'password',
        value: 'ThisIsMyPAssword'
      }
    };
    action.onBlur(event);
    expect(action.state.passwordError)
      .toEqual('');
  });


  it('should clear usernameError value for username with 5 characters and above', () => {
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'username',
        value: 'Dealwap'
      }
    };
    action.onFocus(event);
    expect(action.state.usernameError)
      .toEqual('');
  });

  it('should clear passwordError value for password with 5 characters and above', () => {
    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'password',
        value: 'Dealwap'
      }
    };
    action.onFocus(event);
    expect(action.state.passwordError)
      .toEqual('');
  });

  it('should create user when form is submitted', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    
    const signUp = jest.spyOn(wrapper.instance(), 'handleSubmit');
    action.handleSubmit({ preventDefault: () => 1 });
    expect(signUp).toBeCalled();
  });


  it('should clear passwordConfirm error when password matches', () => {

    const wrapper = setup();
    
    const action = wrapper.instance();
    
    const event = {
      target: {
        name: 'passwordConfirm',
        value: 'Dealwap'
      }
    };
    action.onFocus(event);
    expect(action.state.passwordConfirmError)
      .toEqual('');
  });
})
