import React from 'react';
import User from './User';

function UserTable({ users, elements, onSelectAll, onUserSelect, onUserEdit, onUserDelete, selectedUsers }) {
  return (
    <table className="mx-3 my-3 p-2">
      <thead>
        <tr className="flex justify-between gap-3">
          <th>
            <input
              type="checkbox"
              name="allselect"
              checked={users.length > 0 && users.every(user => selectedUsers.includes(user))}
              onChange={onSelectAll}
            />
          </th>
          {elements.map((element, i) => (
            <th className="userlist_heading w-1/6" key={i}>{element}</th>
          ))}
          <th className="w-1/6 relative right-10">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            onEdit={onUserEdit}
            onDelete={onUserDelete}
            onSelect={onUserSelect}
            isSelected={selectedUsers.includes(user)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
