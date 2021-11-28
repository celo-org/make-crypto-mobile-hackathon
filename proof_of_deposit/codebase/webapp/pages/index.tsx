import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { WithLayout } from '../components';

import {
  Earn,
  EarnToken,
  Settings,
  AboutOurTech,
} from '../_pages';

export default function App() {
  return (
    <Router>
      <WithLayout>
        <Switch>
          <Route exact path="/" component={AboutOurTech} />
          <Route exact path="/earn" component={Earn} />
          <Route path="/earn/:token" component={EarnToken} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </WithLayout>
    </Router>
  );
}
