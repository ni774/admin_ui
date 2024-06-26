import React from 'react'

function Search({searchKeywords, setSearchKeywords}) {
  return (
    <div className='h-9 w-full search border-y-2 my-2 mb-4'>
        <input type="search" placeholder='search by name, email & role'
            // style={{width:'100%', height:'100%', margin:'0 5px'}}
            className='w-full  outline-none border-none text-center h-fit'
            name='searrchKeyword'
            value={searchKeywords}
            onChange={(e)=>setSearchKeywords(e.target.value)}
        /> 
    </div>
  )
}
 
export default Search;