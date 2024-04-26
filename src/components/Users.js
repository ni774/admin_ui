import React,{useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Users(props) {
    // props:- isAllchecked, name, email, password, edit fn, delete fn
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [role, setRole] = useState(props.user.role);
    const [openEditing, setOpenEditing] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(true);


    // edit user
    const editUser = ()=> {
        props.editcurrentUser(props.user.id,props.name, props.email, props.role);
        // enable editing in input box
        setInputDisabled(true);  
        setOpenEditing(false); // ensure that edit button is enabled
    }

    // delete single user
    const deleteUser = () => {
       console.log("user deleted",props.user);
       props.deleteCurrentUser(props.user.id);
    }
      
  
  return (
    <div className='border-y-2 border-solid'>
        <form>
        <table className=''>
            <tr className='border-black p-3 flex justify-between' style={{display:'flex', justifyContent:'space-between', gap:'10rem'}}>
                <td><input type="checkbox" name={ props.user.name} checked={props.user?.isChecked|| false } onChange={ props.handleChange }  /></td>
                <td className={`'w-48' ${openEditing ? 'border-2' : ''}`}> 
                    <input className='text-center'
                        type="text"
                        name='name'
                        // value={name}
                        value= {openEditing?name:props.user.name}
                        onChange={(e) => setName(e.target.value)}
                        disabled= {inputDisabled}
                    />
                </td>
                <td className={`'w-48' ${openEditing ? 'border-2' : ''}`}>
                    <input type='text'
                        name='email'
                        // value={email}
                        value= {openEditing?email:props.user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled= {inputDisabled}
                    />
                </td>
                <td className={`'w-48' ${openEditing ? 'border-2' : ''}`} >
                    <input type='text' className="text-center" style={{textAlign: 'center'}}
                        name='role'
                        // value={role}
                        value= {openEditing?role:props.user.role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled= {inputDisabled}
                    />
                </td>
                {
                    // if editing buttong is not opened then show simple data list other wise open editing form
                    openEditing?   
                    <td><button className= ' w-14 border-2 rounded-md bg-blue-500'
                        onClick={(e)=>{
                        e.preventDefault();
                        editUser();
                    }}>Edit</button></td>
                    :
                    <td className='w-48'>
                        <span className='edit' onClick={()=>{
                            //enable editing
                            setInputDisabled(false);
                            setOpenEditing(true)   // when click to edit user
                        }}><EditIcon fontSize='small'/></span> 
                        <span className='delete' onClick={deleteUser}><DeleteOutlineIcon color="action"/></span>
                    </td>
                }
                
            </tr>
        </table>
        </form>
    </div>
  )
}

export default Users