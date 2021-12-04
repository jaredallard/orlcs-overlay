import './App.css';
import './theme.css';

import { BrowserRouter, Route } from "react-router-dom";

import Home from './routes/home';
import Controller from './routes/controller';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/controller" component={Controller} />
      </BrowserRouter>
    </div>
  )
}

export default App;
