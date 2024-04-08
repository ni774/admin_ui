import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './Users';

function UserList() {
  const [users, setUsers] = useState([]);
  const [next, setNext] = useState(1);
  const [startIndx, setStartIndx] = useState(0);
  const offset = 10;



  useEffect(() => {
    const offset = 10;
    async function fetchUsers() {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setUsers(response.data); // Update state with fetched data
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers(); // Call the async function to fetch data
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <table>
        <thead>
          <tr style={{display:'flex', justifyContent:'space-between', gap:'15rem'}}>
            <th><input type='checkbox' /></th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(startIndx,startIndx + (next * offset)).map((user,i) => (
            <Users key={i} user={user}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;