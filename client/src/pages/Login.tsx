import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import type { UserLogin } from "../interfaces/UserLogin";

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  // variable to hold error message when a user attempts to login, if any
  const [errMsg, setErrMsg] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // check to ensure userdata is present, if not, throw error and return
    if(!loginData.username) {
      setErrMsg('A username must be entered');
      return;
    }
    if(!loginData.password) {
      setErrMsg('A password must be entered');
      return;
    }
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login;', err);
      setErrMsg('Username or password was incorrect!');
      setLoginData({
        username: '',
        password: ''
      });
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errMsg && (
        <p style={{'color': 'red', 'textShadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', 'textAlign': 'center'}}>{errMsg}</p>
      )}
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;
