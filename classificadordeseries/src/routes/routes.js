import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from '../pages/Main';
import Book from '../pages/book';
import SignIn from '../pages/login/signin/index';
import SignUp from '../pages/login/singup/index';

const Routes = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/book/:id" component={Book} />
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route path="*" component={() => <h1>Page not found</h1>} /> 
        </Switch>
    </div>
);

export default Routes;