import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './Users';
import Pagination from '@mui/material/Pagination';
import { usePagination } from '../hooks/Pagination';


import usersData from '../data';
// ! import {edit} from '../utility/helper'; 

function UserList(searchKeywords, setSearchKeywords) {
  const [users, setUsers] = useState(usersData);
  const [isLoading, setIsLoading] = useState(false);

  // update users data to user list
  const edit = (id,name,email,role)=> {
    console.log("edited",id);
    const newUsers = users.map((currElement) => {
        if (currElement.id === id) {
            return { ...currElement,
              name: name,
              email: email,
              role: role,
            };
        } else {
            return currElement;
        }
    });
    // console.log("newUsers",newUsers);
    setUsers(newUsers);
  }

  const deleteCurrentUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  }
  

  const filteredUsers = users.filter(user => {
    if(searchKeywords == "")return user;
    else{
      return user.name.includes(searchKeywords) || user.email.includes(searchKeywords) || user.role.includes(searchKeywords)
    }
  });

  useEffect((id)=>{
    deleteCurrentUser(id);
  },[]);
  
  

  const totalRecords = users.length;
  console.log("total records",totalRecords);
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
                <Users key={i}
                 user={user}
                 editcurrentUser={edit}
                 deleteCurrentUser= {deleteCurrentUser}
                 searchKeywords
                 setSearchKeywords
                />
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
