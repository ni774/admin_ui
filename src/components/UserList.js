import React, { useState, useEffect } from 'react';
import User from './User';
import Pagination from '@mui/material/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/userlist.css';

function UserList({ searchKeywords, usersData, elements }) {
  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const searchingKeyword = searchKeywords.toLowerCase();
    if (searchingKeyword.length > 0) {
      const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(searchingKeyword) ||
        user.email.toLowerCase().includes(searchingKeyword) ||
        user.role.toLowerCase().includes(searchingKeyword)
      );
      setUsers(filteredUsers);
    } else {
      setUsers(usersData);
    }
  }, [searchKeywords, usersData]);

  /****************get Notify when user perform any action  ************/
  const notifyDeleted = () => toast.success("Deleted");
  const notifyEdited = () => toast.success("Updated");


  const handleUserEdit = (id, updatedUser) => {
    setUsers(users.map(user => user.id === id ? updatedUser : user));
    notifyEdited();
  };

  const handleUserDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    notifyDeleted();
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    const newSelectedUsers = checked ? users.slice(startIndex, endIndex) : [];
    setSelectedUsers(newSelectedUsers);
  };

  const handleUserSelect = (selectedUser) => {
    const isSelected = selectedUsers.some(user => user.id === selectedUser.id);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter(user => user.id !== selectedUser.id));
    } else {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user to delete");
    } else {
      setUsers(users.filter(user => !selectedUsers.includes(user)));
      setSelectedUsers([]);
      notifyDeleted();
    }
  };

  const PER_PAGE = 10;
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const paginatedUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / PER_PAGE);

  return (
    <div className="min-w-full">
      <table className="mx-3 my-3 p-2">
        <thead>
          <tr className="flex justify-between gap-3">
            <th>
              <input
                type="checkbox"
                name="allselect"
                checked={paginatedUsers.length > 0 && paginatedUsers.every(user => selectedUsers.includes(user))}
                onChange={handleSelectAll}
              />
            </th>
            {elements.map((element, i) => (
              <th className="userlist_heading w-1/6" key={i}>{element}</th>
            ))}
            <th className="w-1/6 relative right-10">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <User
              key={user.id}
              user={user}
              onEdit={handleUserEdit}
              onDelete={handleUserDelete}
              onSelect={handleUserSelect}
              isSelected={selectedUsers.includes(user)}
            />
          ))}
        </tbody>
      </table>
      <div className="flex w-full">
        <button onClick={handleDeleteSelected} className="justify-start bg-red-500 m-3 rounded-xl p-1">Delete Selected</button>
        <ToastContainer />
        <div className="justify-center m-auto">
          <Pagination
            color="primary"
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default UserList;
