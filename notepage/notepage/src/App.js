import './App.css';
import EditorComponent from './components/EditorComponent';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <EditorComponent />
      <button type="button" class="btn btn-success">Convert to Cheatsheet</button>
    </div>
  );
}

export default App;