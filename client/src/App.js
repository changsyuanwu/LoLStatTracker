import './App.css';
import Routes from "./Components/Routes/Routes";

function callAPI() {
  fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
}

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
