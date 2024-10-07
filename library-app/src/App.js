import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import LoanBook from './components/LoanBook';
import ReturnBook from './components/ReturnBook';
import ReserveBook from './components/ReserveBook';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BookList} />
        <Route path="/loan/:id" component={LoanBook} />
        <Route path="/return/:id" component={ReturnBook} />
        <Route path="/reserve/:id" component={ReserveBook} />
      </Switch>
    </Router>
  );
}

export default App;
