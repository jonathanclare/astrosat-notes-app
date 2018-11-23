import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import store from './store/store';
import Note from './container/Note';
import styles from './App.module.css';

export default class App extends Component
{ 
    // basename - pulled from homepage prop in package.json.
    // Redirect - Any bad urls redirected to base url.
    render() 
    {
        return (
            <Provider store={store}>   
                <BrowserRouter basename={process.env.PUBLIC_URL}> 
                    <div className={styles.app}>
                        <Switch>
                            <Route exact path="/" component={startup} />
                            <Route exact path="/new" component={newNote} />
                            <Route exact path="/:id" component={viewNote} />
                            <Route exact path="/:id/edit" component={editNote} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
};

// Route functions.

// Default view is dependent on notes having been created.
const initApp = props => 
{
    console.log(props.notes)
    if (props.notes.length === 0)
        return newNote(); // No notes created yet.
    else
        return (<Note mode="view" id={props.notes[0].id} />); // Notes created - view first note.
};

// We want to know if any notes have been created at startup so pass the notes into initApp() as a prop from the store.
const mapStateToProps = state => ({notes: state.notes});
const startup = connect(mapStateToProps)(initApp);

// New note.
const newNote = () => 
{
    const s4 = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); // Unique id for note.
    return (<Note mode="edit" id={s4} />);
};

// View a note - the default view if notes are available.
const viewNote = props => (<Note mode="view" id={props.match.params.id} />);

// Edit a note.
const editNote = props => (<Note mode="edit" id={props.match.params.id} />);