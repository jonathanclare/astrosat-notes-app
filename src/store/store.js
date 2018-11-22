import {createStore, combineReducers} from 'redux';
import {fetch, save} from './utils/localStorage';
import {debounce} from './utils/dom';

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
        case 'REMOVE_NOTE':
            return state.filter(note => note.id !== action.note.id);
        default:
            return state; 
    }
};

const rootReducer = combineReducers({notes: notes});

// Fetch any state stored in local storage and use this when creating the store.
const persistedState = fetch('astrosatNotesState');

console.log('PERSISTED STATE FROM LOCAL STORAGE:');
console.log(persistedState);
const store = createStore(rootReducer, persistedState);

// Subscribe to changes to the store so we can update local storage.
store.subscribe(debounce(() =>
{
    save('astrosatNotesState', 
    {
        notes: store.getState().notes,
    });
}), 1000);

export default store;

// Actions
export const clearNotes = () => ({type: 'CLEAR_NOTES'});
export const setNotes = arrNotes => ({type: 'SET_NOTES', notes:arrNotes});
export const addNote = oNote => ({type: 'ADD_NOTE', note:oNote});
export const removeNote = oNote => ({type: 'REMOVE_FNOTE', note:oNote});