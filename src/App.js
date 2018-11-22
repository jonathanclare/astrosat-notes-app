import React, { Component } from 'react';
import {Provider, connect} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import store from './store/store';
import styles from './App.module.css';

export default class App extends Component
{ 
    render() 
    {
        return (
            <Provider store={store}>   
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <div className={styles.app}>
                        <Switch>
                            <Route exact path="/" component={AddNote} />
                            <Route path="/add" component={AddNote} />
                            <Route exact path="/edit/:id" component={EditNote} />
                            <Route exact path="/notes/:id" component={ShowNote} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
};

// Route functions.
const AddNote = props => 
{
    return (<div>Add Note</div>);
};
const EditNote = props => 
{
    return (<div>Add Note</div>);
};
const ShowNote = props => 
{
    return (<div>Add Note</div>);
};
