import { useContext, useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../../Context/AppContext';

function Login() {
  const [currState, setCurrState] = useState('Sign up');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login, fetchCurrentUser} = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = currState === 'Login' 
      ? 'http://localhost:8002/login' 
      : 'http://localhost:8002/register';

    const requestBody = currState === 'Login' 
      ? { email, password } 
      : { username, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Something went wrong");
      }

      const data = await response.json();
      console.log("Response:", data);

      if (currState === 'Login') {
        toast.success('Login successful');
        login(data.token);
        navigate('/chat');
      } else {
        toast.success('Registration successful, please log in');
        setCurrState('Login');
      }

    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };
      
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