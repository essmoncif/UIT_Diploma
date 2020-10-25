import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Index from './pages/index.page';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Index/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
