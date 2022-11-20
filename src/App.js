import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TodoList from './Components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />
      </header>
    </div>
  );
}

export default App;
