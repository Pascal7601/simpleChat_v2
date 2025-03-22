import { useState } from 'react'
import './Login.css'

function Login() {
  const [currState, setCurrState] = useState('Sign up');

  return (

    <div className="login">
      <div className="login-form">
        <h3>{currState === "Sign up" ? 'Sign up' : 'Login'}</h3>
        {currState === 'Sign up' && 
          <input  type="text" placeholder="username" required/>
        }
        <input type="email" placeholder="email" required/>
        <input type="password" placeholder="password" required/>
        {currState === 'Sign up' && 
        <div className='login-terms'>
          <input type="checkbox" />
          <p>Agree to terms and conditions</p>
        </div>
        }
        <p>{currState === 'Sign up' ? 'Already have an account?' : 'Create account here'} <span className='login-link'>click here</span></p>
        <button type='submit'>{currState}</button>
      </div>
    </div>
  )
}

export default Login