import {createStore, combineReducers} from 'redux';
import {fetchState, saveState} from '../utils/localStorage';
import debounce from '../utils/debounce';

// Reducers

// Store notes as an object: {id:"####"" , title:"A Title", content:"Some Content", date:"The date"}
const notes = (state = [], action) => 
{
    switch (action.type) 
    {
        case 'SET_NOTES':
            return [...action.notes];
        case 'CLEAR_NOTES':
            return [];
        case 'ADD_NOTE':
            return [...state, action.note];
        case 'UPDATE_NOTE':
            return state.map(note =>
            {
                if (note.id === action.note.id) return action.note;
                return note;
            });
        case 'REMOVE_NOTE':
            return state.filter(note => note.id !== action.id);
        default:
            return state; 
    }
};

const rootReducer = combineReducers(
{
    notes: notes
});

// Fetch any state stored in local storage and use this when creating the store.
const persistedState = fetchState('astrosat-notes-app');

console.log('PERSISTED STATE FROM LOCAL STORAGE:');
console.log(persistedState);
const store = createStore(rootReducer, persistedState);

// Subscribe to changes to the store so we can update local storage.
store.subscribe(debounce(() =>
{
    saveState('astrosat-notes-app', 
    {
        notes: store.getState().notes,
    });
}));

export default store;

// Actions
export const clearNotes = () => ({type: 'CLEAR_NOTES'});
export const setNotes = arrNotes => ({type: 'SET_NOTES', notes:arrNotes});
export const addNote = oNote => ({type: 'ADD_NOTE', note:oNote});
export const updateNote = oNote => ({type: 'UPDATE_NOTE', note:oNote});
export const removeNote = noteId => ({type: 'REMOVE_NOTE', id:noteId});