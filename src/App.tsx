import { Header } from '@/components';
import { Main } from '@/pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  console.log(import.meta.env.WEB_TITLE);
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
