import { UserLogin } from "../interfaces/UserLogin";

const login = async (loginData: UserLogin) => {
  try {
    const resp = await fetch('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const loginResponse = await resp.json();

    if(!resp.ok) {
      throw new Error('Error in fetch response, is the users login information correct? Check network tab for more information')
    }

    return loginResponse;

  } catch (err: any) {
    console.error('Error when attempting to authenticate user:', err)
    return Promise.reject('Is the users login information correct?')
  }
}



export { login };
