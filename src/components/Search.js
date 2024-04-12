import React from 'react'

function Search({searchKeywords, setSearchKeywords}) {
  return (
    <div className='search border-y-2 my-2'  style={{height:'35px', width:"100%"}}>
        <input type="search" placeholder='search by name, email & role'
            style={{width:'98%', height:'100%', margin:'0 5px'}}
            name='searrchKeyword'
            value={searchKeywords}
            onChange={(e)=>setSearchKeywords(e.target.value)}
        /> 
    </div>
  )
}
 
export default Search;