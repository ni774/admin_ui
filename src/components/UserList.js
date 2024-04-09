import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './Users';
import Pagination from '@mui/material/Pagination';
import { usePagination } from '../hooks/Pagination';

import { Data } from '../data'; 

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("usersDAta",Data)




  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setUsers(response.data); // Update state with fetched data
        console.log("res",response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers(); // Call the async function to fetch data
  }, []); // Empty dependency array ensures this effect runs only once


  console.log("users",users)
  const totalRecords = users.length;
  const perPageRecords = 10;

  const totalPages = Math.ceil(totalRecords / perPageRecords);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndx, setStartIndx] = useState(0);
  const [endIndx, setEndIndx] = useState(perPageRecords-1);

  const setDisplayPage = (pageNo)=> {
    setCurrentPage(pageNo);
    setStartIndx((pageNo-1)*perPageRecords);
    setEndIndx(pageNo*perPageRecords-1);

  }

  // console.log(totalPages, startIndx, endIndx);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
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
              {users.slice(startIndx, endIndx).map((user, i) => (
                <Users key={i} user={user}/>
              ))}
            </tbody>
          </table>
          <Pagination 
            color='primary' 
            count={totalPages}
            onChange={(event, value) => setDisplayPage(value)}
          />
        </>
      )}
    </div>
  );
}

export default UserList;
