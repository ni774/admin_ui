import React, {useState} from 'react';
import './App.css';
import Search from './components/Search';
import UserList from './components/UserList';
import usersData from './data';

function App() {
  const [searchKeywords, setSearchKeywords] = useState("");


  return (
    <div className="App">
      <Search
        searchKeywords={searchKeywords}
        setSearchKeywords={setSearchKeywords}
      />
      <UserList
        searchKeywords={searchKeywords}
        setSearchKeywords={setSearchKeywords}
      />

    </div>
  );
}

export default App;
