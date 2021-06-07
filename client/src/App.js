import logo from './logo.svg';
import './App.css';
import Dashboard from "./Components/Dashboard/Dashboard"

function callAPI() {
  fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
}

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
