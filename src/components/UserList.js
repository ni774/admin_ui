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

  // console.log("filteredUsers",filteredUsers);

  const deleteCurrentUser = (id) => {
    console.log("deleteCurrentUser",id);
    const updatedUsers = users.filter((user) => user.id !== id);
    console.log("updatedUsers after delete",updatedUsers);
    setUsers(updatedUsers);
  }

  
 //...........................SEARCH FUNCTIONALITY.................. 
  useEffect(()=>{
    const searchInput = searchKeywords.searchKeywords.toLowerCase();
    const filteredUsers = (usersData) => {
      let newArray = [];
      for(let i=0;i<usersData.length;i++) {
        if(usersData[i].name?.toLowerCase().includes(searchInput) || usersData[i].email?.toLowerCase().includes(searchInput) || usersData[i].role?.toLowerCase().includes(searchInput)){
          newArray.push(usersData[i]);
        }
        console.log("searched");
      }
      console.log("newArray",newArray)
      return newArray;
    }
    console.log("searchinput",searchKeywords)
    console.log(searchInput.length,"length");
    if(searchInput.length > 0){
      console.log("filteredUsers",filteredUsers(users));
      setUsers(filteredUsers(usersData)); // search in original whole data instead of
      //setUsers(filteredUsers(usersData));
    }
  },[searchKeywords.searchKeywords.length])
    

  //check multiple users
  const handleChange=(e)=>{ 
    const { name, checked}= e.target;
    if(name==="allselect"){
      const checkedvalue = users.map( (user,index)=>{
        if(index >=startIndx && index < endIndx){
         return {...user, isChecked:checked}
        }
        else return user;
      });
      console.log(checkedvalue);
      setUsers(checkedvalue);
    } else{
     const checkedvalue= users.map( (user)=>
     user.name ===name? {...user, isChecked:checked}:user);
     console.log(checkedvalue);
     setUsers(checkedvalue);
    }
  }

  //delete all user which are checked
  const handleAllDelete = async (e) => {
    e.preventDefault();
    const newUsers = users.filter(user => !user.isChecked);
    if (newUsers.length < users.length) {
        setUsers(newUsers);
    } else {
        alert("Please select at least one checkbox");
    }
  }
  
  

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
          <table className='mx-3 my-3'>
            <thead>
              <tr style={{display:'flex', justifyContent:'space-between', gap:'15rem'}}>
                <th><input type="checkbox" name="allselect" checked= { !users.slice(startIndx,endIndx).some( (user)=>user?.isChecked!==true)} onChange={ handleChange}  /> </th>
                <th>Name</th>
                <th>Email</th>
                <th>role</th>
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
                 handleChange= {handleChange}  // passing checked to individual components
                //  handleDelete = {handleAllDelete}
                />
              ))}
            </tbody>
          </table>
          <div style={{display:'flex', justifyContent:'flex-start'}}>
            <button onClick={handleAllDelete} className='bg-red-500 m-3 rounded-xl p-1'>Delete Selected</button>
            <span style={{margin:'auto'}}>
            <Pagination 
              color='primary' 
              count={totalPages}
              onChange={(event, value) => setDisplayPage(value)}
            />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;
