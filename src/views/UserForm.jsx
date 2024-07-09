import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../contexts/contextprovider";

export default function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification}= useStateContext()
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    // TODO show notification
                    setNotification("User was successfully updated")
                    navigate('/users');
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else {
                            setErrors({
                                email: [response.data.message]
                            });
                        }
                    }
                });
        } else {
            axiosClient.post('/register', user)
                .then(() => {
                    // TODO show notification
                    navigate('/users');
                    setNotification("User was successfully created");
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else {
                            setErrors({
                                email: [response.data.message]
                            });
                        }
                    }
                });
        }
    }

    return (
        <>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={ev => setUser({ ...user, name: ev.target.value })}
                            placeholder="Name"
                        />
                        <input
                            value={user.email}
                            onChange={ev => setUser({ ...user, email: ev.target.value })}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={ev => setUser({ ...user, password: ev.target.value })}
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
                            placeholder="Password Confirmation"
                        />
                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    );
}
