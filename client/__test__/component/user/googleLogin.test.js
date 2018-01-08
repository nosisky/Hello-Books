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
  it('tests that the component successfully rendered', () => {
    const wrapper = shallow(<GoogleLogIn {...props}/>)
    wrapper.instance().reMap({ name: 'Thsh jddj',
    email: 'dealwap@test.com'
  })

  expect(wrapper.instance().reMap).toHaveBeenCalled;
  })

  it('tests that the component receives the response from Google', () => {
    const wrapper = shallow(<GoogleLogIn {...props}  />)
    
    wrapper.instance().responseGoogle({ Zi: {
      id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyMzNkYWFkOTdlNzBmYjljMTJmZDc2NzkxMDA5ZjJjMGRjYzE4NjkifQ.eyJhenAiOiI5OTM0ODA3MDYzNTgtcDZxbjcwdWU4cXVjY2UwMGNwYmZoc2I1MmE4N3Q0NTEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5OTM0ODA3MDYzNTgtcDZxbjcwdWU4cXVjY2UwMGNwYmZoc2I1MmE4N3Q0NTEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc4NzIzMjA5NDA1Nzg3MzUxNDgiLCJlbWFpbCI6Im5vc2lza3lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJKdWY2cHo4aVFHRnEwZmRUZjhVM3F3IiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6ImJkOTYzYzY2YjM4MDVlNDVjZTc0ODg2ZjdiYzY4NjZiZjNhZGNmMDUiLCJpYXQiOjE1MTU0Mjk2NTksImV4cCI6MTUxNTQzMzI1OSwibmFtZSI6IlJhc2FxIE5vc2lydWRlZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1ud0R0clNhclJwQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUVXRS9Ba1pQajFWVXJHdy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiUmFzYXEiLCJmYW1pbHlfbmFtZSI6Ik5vc2lydWRlZW4iLCJsb2NhbGUiOiJlbiJ9.vOJuQFOyOG7_-Dixtz0AXu5vxJ6h2px4CvlXEUYZwLyE7ns6Qyw_-YqoPBNlK0ITnFA0CjhG8kJeze0symKvVPTZ2KUJXt0xLUFN4jlW5jAoWIvaqPjI1dR7gyohtTkAwKJbgGqsiWFXEAaCkihoH7ZM54PbQpgp6p8AIKg3DWFX9S_VnNsIROIEPQV7eKe8sTzBv4FX5wpyXAAyFN_UoNiYZ8lVr0D4SkFqiaFM8JPFMUHnxOxEHpsxxLMjCciZJIR4pxjECRYw-JVASay9oE4uUioMg2uW0RTZ7MdMEyV7Wi-pDwSU05J9miYeqVMjl80cpoT30IyHchklFAY_AA'
    } })
    
  expect(wrapper.instance().responseGoogle).toHaveBeenCalled;
  })


  it(`tests that the component redirects to a new sign up page 
    when the response email from google does not exist in the database`, () => {

    const wrapper = shallow(<GoogleLogIn {...props}  />)
    
    wrapper.instance().responseGoogle({ Zi: { id_token: false } })
    
    expect(wrapper.instance().responseGoogle).toHaveBeenCalled;
  })
})

