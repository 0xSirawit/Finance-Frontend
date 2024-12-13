import './App.css';
import axios from 'axios'
import LoginScreen from './LoginScreen';
import { useState } from 'react';
import FinanceScreen from './components/FinanceScreen';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleLoginSuccess = () => { 
    setIsAuthenticated(true)
  }
  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? <FinanceScreen/> : <LoginScreen onLoginSuccess={handleLoginSuccess} />}
      </header>
    </div>
  );
}
export default App;