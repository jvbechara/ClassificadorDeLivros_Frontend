import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from '../pages/Main';

const Routes = () => (
        <Switch>
            <Route path="/" component={Main} />
            {/* <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute exact path="/series/:id" component={Serie} />
            <PrivateRoute exact path="/series-status/:status" component={Main}/>
            <PrivateRoute exact path="/series-search/:title" component={Main}/>
            <PrivateRoute exact path="/series-create" component={AddSerie} />
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route path="*" component={() => <h1>Page not found</h1>} /> */}
        </Switch>
);

export default Routes;