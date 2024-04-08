import React from 'react'

function Search() {
  return (
    <div className='search' style={{height:'35px', width:"100%", backgroundColor:'red'}}>
        <input type="search" placeholder='search by name, email & role'
            style={{width:'98%', height:'100%', margin:'0 5px'}}
        /> 
    </div>
  )
}
 
export default Search;