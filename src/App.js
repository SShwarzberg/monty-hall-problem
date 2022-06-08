import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import CatchAll from './Components/CatchAll/CatchAll';
import Home from './Components/home2/Home';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<CatchAll />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
