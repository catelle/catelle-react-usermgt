// src/views/Users.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from "../contexts/contextprovider";

export default function Users() {

  const [users, setUsers] = useState([]);
  const {setNotification}= useStateContext();
  const [loading, setLoading] = useState(false);
  
  const getUser = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
        console.log(data);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const onDelete =(u)=>{
 
    if(!window.confirm("Are you sure you want delete this user")){
      return
    }
    axiosClient.delete(`/users/${u.id}`)
    .then(()=>{
      setNotification("User was successfully deleted");
     getUser()
    })
  }
  

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <div >
      <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>

        <h1>Users</h1>
        <Link to='/users/new' className='btn-add'>Add new user</Link>
      </div>

      <div className='card animated fadeInDown'>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create at</th>
              <th>Actions</th>
            </tr>
            </thead>
           {loading && <tbody>
              <tr>
                <td colspan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
            }
            <tbody>
              {
                users.map(u=>(

                  <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td> <Link to={'/users/'+u.id} className='btn-edit' >Edit user</Link>
                     &nbsp;
                      <button onClick={ev=>onDelete(u)} className='btn-delete'>Delete</button>     
                  </td>
                </tr>
                ))
              }
            </tbody>
        
        </table>

      </div>
     
    </div>
  );
}
