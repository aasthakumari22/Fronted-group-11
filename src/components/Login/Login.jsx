import React, { useState } from 'react';
import './Login.css';
import {useSpring, animated} from 'react-spring';

const Login = () => {
    const [registrationFormStatus, setRegistrationFormStatus] = useState(false);

    const loginProps = useSpring({
        left: registrationFormStatus ? -500 : 0,
        // opacity: registrationFormStatus ? 0 : 1
    
      })

    const registerProps = useSpring({
       left: registrationFormStatus ? 0 : 500,
       // opacity: registrationFormStatus ? 1 : 0
    
    })


    const LoginForm = () => (
          <div>
            <label for='username'>USERNAME</label>
            <input type='text' id='username' />
            <label for='password'>PASSWORD</label>
            <input type='text' id='password' />
            <input type='submit' value='submit' className='submit'></input>
          </div>
    )

    const loginBtnProps = useSpring({borderBottom:registrationFormStatus ? 'solid 0px transparent' : 'solid 2px #1059FF'})
    const registerBtnProps = useSpring({borderBottom:registrationFormStatus ? 'solid 2px #1059FF' : 'solid 0px transparent'})

    function registerClicked() { setRegistrationFormStatus(true)}
    function loginClicked() { setRegistrationFormStatus(false)}

    const RegisterForm = () => (
          <div>
            <form>
              <label for='fullname'>full name</label>
              <input type='text' id='fullname' />
              <label for="email">email</label>
              <input type='text' id="email" />
              <label for="password">password</label>
              <input type='text' id="password" />
              <label for="confirmpassword">confirm password</label>
              <input type='text' id="confirmpassword" />
              <input type='submit' value='submit' className='submit'></input>
            </form>
          </div>
        )
    
  return (
    <div class="container">
    <div className="login-register-wrapper">
      <div className='nav-buttons'>
        <animated.button onClick = {loginClicked} id="loginBtn" style={loginBtnProps}>Login</animated.button>
        <animated.button onClick = {registerClicked} id="registrationBtn" style={registerBtnProps}>Register</animated.button>
      </div>
      <div className="form-group">
        <animated.form action='' id='loginform' style={loginProps}><LoginForm/></animated.form>
        <animated.form action='' id='registerform' style={registerProps}><RegisterForm /></animated.form>
        
      </div>
     
    </div>
  </div>
  )
}

export default Login