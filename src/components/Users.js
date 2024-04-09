import React,{useState} from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';

function Users(props) {
    const user = props.user;  // isAllchecked, name, email, password
    const [value, setValue] = useState("");
    const [checkbox, setCheckbox] = useState(true);
    const [name, setName] = useState(user.name);
  
  return (
    <div style={{border:'1px solid black'}}>
        <form>
        <table >
            <tr style={{display:'flex', justifyContent:'space-between', gap:'12rem'}}>
                <td><input type='checkbox' name='checkvlaue'/></td>
                <td> 
                    <input
                        type="text"
                        name='name'
                        value= {name}
                        onChange={(e) => setName(e.target.value)}
                        disabled= {false}
                    />
                </td>
                <td><input type='text' value={user.email}/></td>
                <td><input type='text' value={user.role}/></td>
                <td><span className='edit'>edit</span> <span className='delete'>delete</span></td>
            </tr>
        </table>
        </form>
    </div>
  )
}

export default Users