import { useEffect, useState } from 'react';

// import logo from './logo.svg';
import './App.css';

const REACT_APP_HH_API_URL = process.env.REACT_APP_HH_API_URL;

function App() {
  const [test, setTest] = useState('');

  useEffect(() => {
    const testData = async () => {
      const res = await fetch(`http://${REACT_APP_HH_API_URL}/`);
      const data = await res.text();
      setTest(data);
    }
    testData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{test}</p>
      </header>
    </div>
  );
}

export default App;
