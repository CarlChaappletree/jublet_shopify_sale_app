import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Routes() {
  return (
    <Switch>
      <Route path="/products" render={() => <h1>hihi products</h1>} />
      <Route path="/account" render={() => <h1>hihi account</h1>} />
      <Route
        path="/"
        render={() => (
          <>
            <h1>hihi home</h1>
          </>
        )}
      />
    </Switch>
  );
}

export default Routes;
