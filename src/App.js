import React, { useState } from 'react';
import Search from './components/Search';
import UserList from './components/UserList';
import usersData from './data/usersData';
// import './style/App.css';

function App() {
  const [searchKeywords, setSearchKeywords] = useState("");

  return (
    <div className="App w-fit h-screen">
      <h1 className="font-mono text-5xl text-center font-bold text-gray-800">Admin Panel</h1>
      <div className="m-5 border-2 border-gray-300 rounded-sm ml-8">
        <div className="mb-4">
          <Search searchKeywords={searchKeywords} setSearchKeywords={setSearchKeywords} />
        </div>
        <UserList searchKeywords={searchKeywords} usersData={usersData} elements={["Name", "Email", "Position"]} />
      </div>
    </div>
  );
}

export default App;
