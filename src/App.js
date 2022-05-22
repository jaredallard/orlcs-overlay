import './App.css';
import './theme.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './routes/home';
import Controller from './routes/controller';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/controller" element={<Controller />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
