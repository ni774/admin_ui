import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "../style/user.css";

function User({ user, onEdit, onDelete, onSelect, isSelected }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(user.id, { ...user, name, email, role });
    setIsEditing(false);
  };

  return (
    <div className="row border-y-2 border-solid">
      <form onSubmit={handleEdit}>
        <table>
          <tr className="user_table_row border-black p-3 flex justify-between" style={{ gap: '10rem' }}>
            <td>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(user)}
              />
            </td>
            <td className={`w-48 ${isEditing ? 'border-2' : ''}`}>
              <input
                className="text-center"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </td>
            <td className={`w-48 ${isEditing ? 'border-2' : ''}`}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </td>
            <td className={`w-48 ${isEditing ? 'border-2' : ''}`}>
              <input
                type="text"
                className="text-center"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!isEditing}
              />
            </td>
            <td className="w-48">
              {isEditing ? (
                <button type="submit" className="w-14 border-2 rounded-md bg-blue-500">Save</button>
              ) : (
                <>
                  <span className="edit" onClick={() => setIsEditing(true)}><EditIcon fontSize="small" /></span>
                  <span className="delete" onClick={() => onDelete(user.id)}><DeleteOutlineIcon color="action" /></span>
                </>
              )}
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default User;
