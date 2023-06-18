import './App.css';
import EditorComponent from './components/EditorComponent';
import ConvertButton from './components/ConvertButton';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <EditorComponent />
      <ConvertButton />
    </div>
  );
}

export default App;