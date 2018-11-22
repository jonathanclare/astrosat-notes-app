import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import store from './store/store';
import Note from './components/Note';
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
                            <Route exact path="/:id" component={viewNote} />
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
    if (props.notes.length === 0)
        return editNote(props); // No notes created yet - start with add note page.
    else
        return viewNote(props); // Notes created - start with view note page.
};

// We want to know if any notes have been created at startup so pass the notes into initApp() as a prop from the store.
const mapStateToProps = state => ({notes: state.notes});
const startup = connect(mapStateToProps)(initApp);

// View a note - the default view if notes are available.
const viewNote = props => (<Note mode="view" id={props.match.params.id} />);

// Edit a note.
const editNote = props => (<Note mode="edit" id={props.match.params.id} />);