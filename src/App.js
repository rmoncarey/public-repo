import React from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { MovieDetail } from './components/MovieDetail';
import { Stats } from './components/Stats';
import { Cart } from './components/cart/Cart';
import { MoviesFetcher } from './components/MoviesFetcher';
import { ProtectedRoute } from './components/hoc/ProtectedRoute';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';

export const App = () => (
  <BrowserRouter>
    <div>
      <div>
        <Header />
        <MoviesFetcher />
      </div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/movies/:id" component={MovieDetail} />
        <ProtectedRoute path="/stats" component={Stats} />
        {/* <Route render={() => <h1>404</h1>} /> */}
        <Redirect to='/'/>
      </Switch>
      <Cart />
    </div>
  </BrowserRouter>
);
