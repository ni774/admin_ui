import React,{useState} from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Users(props) {
    const user = props.user;  // isAllchecked, name, email, password, edit fn, delete fn
    const [value, setValue] = useState("");
    const [checkbox, setCheckbox] = useState(true);
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [role, setRole] = useState(props.user.role);
    const [openEditing, setOpenEditing] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);


    // edit user
    const editUser = ()=> {
        props.editcurrentUser(props.user.id,name, email, role);
        setOpenEditing(false); // ensure that edit button is enabled
    }

    // delete single user
    const deleteUser = () => {
       console.log("user deleted",props.user);
       props.deleteCurrentUser(props.user.id);
    }
    
    
    

    const handleChange = (e)=> {
        props.handleChange();
    }
  
  return (
    <div style={{border:'1px solid black'}}>
        <form>
        <table >
            <tr style={{display:'flex', justifyContent:'space-between', gap:'12rem'}}>
                <td><input type="checkbox" name={ props.user.name} checked={props.user?.isChecked|| false } onChange={ props.handleChange }  /></td>
                <td> 
                    <input
                        type="text"
                        name='name'
                        value={name} 
                        // value= {openEdit?name:props.user.name}
                        onChange={(e) => setName(e.target.value)}
                        disabled= {inputDisabled}
                    />
                </td>
                <td>
                    <input type='text'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled= {inputDisabled}
                    />
                </td>
                <td>
                    <input type='text'
                        name='role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled= {inputDisabled}
                    />
                </td>
                {
                    // if editing buttong is not opened then show simple data list other wise open editing form
                    openEditing?   
                    <td><button onClick={(e)=>{
                        e.preventDefault();
                        editUser();
                    }}>Edit</button></td>
                    :
                    <td>
                        <span className='edit' onClick={()=>{
                            setOpenEditing(true)   // when click to edit user e
                        }}><EditIcon/></span> 
                        <span className='delete' onClick={deleteUser}><DeleteOutlineIcon/></span>
                    </td>
                }
                
            </tr>
        </table>
        </form>
    </div>
  )
}

export default Users