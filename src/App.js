import React, {Component} from 'react';
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
                            <Route exact path="/" component={startup} />
                            <Route exact path="/add" component={addNote} />
                            <Route exact path="/edit/:id" component={editNote} />
                            <Route exact path="/note/:id" component={showNote} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
};

// Route functions.

// Default view is dependent on notes being available.
const initApp = props => 
{
    if (props.notes.length === 0) // No notes created yet.
        return addNote(props);
    else
        return showNote(props);
};
// We want to know if any notes have been created yet at startup so pass in to init() as a prop from the store.
const mapStateToProps = state => ({notes: state.notes});
const startup = connect(mapStateToProps)(initApp);

// Add a new note - the default view if no notes are available.
const addNote = props => 
{
    return (<div>Add Note</div>);
};

// Edit a note.
const editNote = props => 
{
    return (<div>Edit Note</div>);
};

// Show a note - the default view if notes are available.
const showNote = props => 
{
    return (<div>Show Note</div>);
};
