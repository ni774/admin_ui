import React, {useState} from 'react';
import './App.css';
import Search from './components/Search';
import UserList from './components/UserList';
import Footer from './components/Footer';

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
      <Footer/>

    </div>
  );
}

export default App;
