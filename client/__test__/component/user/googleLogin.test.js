import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { GoogleLogIn } from '../../../components/auth/GoogleLogIn';
import Footer from '../../../components/includes/Footer';
import GoogleLogin from 'react-google-login';
import { checkUserExist } from '../../../utils/validation';


window.localStorage = {}

//  jest.mock('GoogleLogin', ()=>'GoogleLogin')

configure({ adapter: new Adapter() });

const props = {
  emailExist: jest.fn(() => Promise.resolve(true))
}

describe('Component: GoogleLogIn', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<GoogleLogIn {...props}/>)
    wrapper.instance().reMap({ name: 'Thsh jddj',
    email: 'dealwap@test.com'
  })

  expect(wrapper.instance().reMap).toHaveBeenCalled;
  })

  it('should receive the response from Google', () => {
    const wrapper = shallow(<GoogleLogIn {...props}  />)
    
    wrapper.instance().responseGoogle({ Zi: {
      id_token: process.env.googleTestToken
    } })
    
  expect(wrapper.instance().responseGoogle).toHaveBeenCalled;
  })


  it(`should redirect to a new sign up page 
    when the response email from google does not exist in the database`, () => {

    const wrapper = shallow(<GoogleLogIn {...props}  />)
    
    wrapper.instance().responseGoogle({ Zi: { id_token: false } })
    
    expect(wrapper.instance().responseGoogle).toHaveBeenCalled;
  })
})

