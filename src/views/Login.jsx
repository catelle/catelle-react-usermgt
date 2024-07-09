import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client'; // Ensure the correct path to axios-client
import { useStateContext } from '../contexts/contextprovider'; // Ensure the correct path to context provider

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

		setErrors(null)
        axiosClient.post('/login', payload)
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
            <h1 className="title">Login to your account</h1>

            {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))
					}
                </div>
            }

            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered <Link to="/register">Sign Up</Link>
            </p>
        </form>
    );
}
