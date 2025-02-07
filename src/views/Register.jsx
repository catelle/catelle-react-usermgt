import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextprovider';


export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors,setErrors]=useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    setErrors(null)
    axiosClient.post('/register', payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);

        const response = error.response;

        if (response && response.status === 422) {
          if(response.data.errors){

						setErrors(response.data.errors);

					}else{

					setErrors({
						email:[response.data.message]
					})
					}
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className='title'>
        Signup for free
      </h1>
      {errors && <div className='alert'>

        {Object.keys(errors).map(key =>(
          <p key={key}>{errors[key][0]}</p>
        ))
        }
      </div>
      
      }
      <input ref={nameRef} type="text" placeholder="Full name" />
      <input ref={emailRef} type="email" placeholder="Email Address" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation" />
      <button className="btn btn-block">Sign up</button>
      <p className="message">
        Already Registered <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}
