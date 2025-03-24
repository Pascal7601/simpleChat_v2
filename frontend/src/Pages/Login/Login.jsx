import { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [currState, setCurrState] = useState('Sign up');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currState === 'Login') {
      try {
        const response = await fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json();
      console.log("Response", data);
      if(response.ok) {
        navigate('/chat');
      }
      }
      catch (error) {
        console.log(error);
      }
    } else {

    try {
      const response = await fetch('http://localhost:8001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    const data = await response.json();
    console.log("Response", data)
    if(response.ok) {
      setCurrState('Login');
    }
    }
    catch (error) {
      console.log(error);
    }
  }
}
      
  return (

    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>{currState === "Sign up" ? 'Sign up' : 'Login'}</h3>
        {currState === 'Sign up' && 
          <input  type="text" placeholder="username" 
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
        }
        <input type="email" placeholder="email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="password" 
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>

        {currState === 'Sign up' && 
        <div className='login-terms'>
          <input type="checkbox" />
          <p>Agree to terms and conditions</p>
        </div>
        }
        <p>
          {currState === 'Sign up' ? 'Already have an account?' : 'Create account here '} 
          <span onClick={()=> currState === 'Sign up'? setCurrState('Login') : setCurrState('Sign up')} className='login-link'>click here</span>
        </p>
        <button type='submit'>{currState}</button>
      </form>
    </div>
  )
}
export default Login