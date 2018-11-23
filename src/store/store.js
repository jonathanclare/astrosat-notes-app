import {createStore, combineReducers} from 'redux';
import {fetchState, saveState} from '../utils/localStorage';
import debounce from '../utils/debounce';

// Util functions.

// Sort notes by date - most recent first.
const sortByDate = (a, b) => (new Date(b.date) - new Date(a.date));

// Updates the time stamp on the note and adds a title if not supplied.
const newNote = oNote =>
{
    const newNote = {...oNote};
    if (newNote.title === '') newNote.title = 'Add A Title';
    newNote.date = new Date().toISOString();
    return newNote;
};

// Reducers

// Store notes as an object: {id:"####"", date:"##/##/##", title:"A Title", content:"Some Content"}
// In general you only have to pass in {id:"####"", title:"A Title", content:"Some Content"}
// The date is autogenerated in ADD_NOTE.
// The id is the unique key for accessing the notes.
const notes = (state = [], action) => 
{
    switch (action.type) 
    {
        case 'SET_NOTES': // Pass in an array of note objects (used to load from local storage).
            return [...action.notes].sort(sortByDate);

        case 'CLEAR_NOTES': // Empty the array of note objects.
            return []; 

        case 'ADD_NOTE': // Add a new note object.
            return [...state, newNote(action.note)].sort(sortByDate);

        case 'UPDATE_NOTE': // Update a note - use the note id to reference it - this will add the note if it doesnt exist already.

            // Check if the note exists
            const arrNotes = state.filter(note => note.id === action.note.id);
            if (arrNotes.length > 0)  // Note exists so update it.
            {
                return state.map(note =>
                {
                    if (note.id === action.note.id) return newNote(action.note);
                    return note;
                }).sort(sortByDate);
            }
            else  // Note doesnt exists so add it. 
                return [...state, newNote(action.note)].sort(sortByDate);
                
        case 'REMOVE_NOTE': // Remove a note - use the note id to reference it.
            return state.filter(note => note.id !== action.id).sort(sortByDate);

        default:
            return state; 
    }
};

const rootReducer = combineReducers({notes: notes});

// Fetch any state stored in local storage and use this when creating the store.
let persistedState = fetchState('astrosat-notes-app');

console.log('PERSISTED STATE FROM LOCAL STORAGE:');
console.log(persistedState);

if (persistedState === undefined)
{
    // Add some default notes if none have been created - otherwise interface looks a bit sparse.
    persistedState = {notes:[
        {id: "3167", title: "A Note", content: "Press the Edit Button to add some content", date: "2018-11-23T13:53:30.780Z"},
        {id: "39f7", title: "Another Note", content: "Press the Edit Button to add some content", date: "2018-11-23T13:53:28.636Z"}
    ]};
}

const store = createStore(rootReducer, persistedState);

// Subscribe to changes to the store so we can update local storage.
// Possibilty of this being called alot so use debounce.
store.subscribe(debounce(() =>
{
    // This is where youd write to a database if implementing permanent storage.

    console.log('SAVE STATE');
    console.log(store.getState().notes);
    saveState('astrosat-notes-app', {notes: store.getState().notes});
}));

export default store;

// Actions
export const setNotes = arrNotes => ({type: 'SET_NOTES', notes:arrNotes});
export const clearNotes = () => ({type: 'CLEAR_NOTES'});
export const addNote = oNote => ({type: 'ADD_NOTE', note:oNote});
export const updateNote = oNote => ({type: 'UPDATE_NOTE', note:oNote});
export const removeNote = noteId => ({type: 'REMOVE_NOTE', id:noteId});