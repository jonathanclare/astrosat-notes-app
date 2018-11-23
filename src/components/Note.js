import React, {Component}  from 'react';
import TextBox from './TextBox';
import TextArea from './TextArea';
import NotesList from './NotesList';
import {addNote, removeNote, updateNote} from '../store/store';
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4';
import {Link} from 'react-router-dom';
import styles from './Note.module.css';

class Note extends Component
{
    constructor(props) 
    {
        super(props);

        // passed in props 
        // prop:mode edit|view
        // prop:id

        console.log('id: '+props.id);
        console.log('mode: '+props.mode);

        this.state =  
        { 
            title: 'Add A Title',
            content: 'Add Some Content'
        };

        this.noteId = props.id;
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
    }

    componentDidMount()
    {  
        console.log('componentDidMount');
        this.onNoteIdChange(this.props.id);
    }

    componentDidUpdate(prevProps, prevState) 
    {
        console.log('componentDidUpdate');
        // Check if the note id has changed without the component mounting.
        if (prevProps.id !== this.props.id) this.onNoteIdChange(this.props.id);
    }

    // If a note id has been passed in as a prop get the note object associated with it and update the state.
    onNoteIdChange(id)
    {
        this.noteId = id;
        const note = this.getNote(id);
        this.setState({title:note.title, content:note.content});
    }

    // Find a note using its unique id - or return a new note.
    getNote(id)
    {
        console.log('getNote');
        const arrNotes = this.props.notes.filter(note => note.id === id);
        if (arrNotes.length > 0) 
            return arrNotes[0]; // Note found!
        else 
            return {title:'Add A Title', content:'Add Some Content'}; // Create a new note if it doesnt already exist.
    }

    // Note title changed.
    onTitleChange(str)
    {
        console.log("onTitleChange")
        console.log(str)
        this.setState({title:str});
    }

    // Note content changed.
    onContentChange(str)
    {
        console.log("onContentChange")
        console.log(str)
        this.setState({content:str});
    }

    // Save note button pressed.
    onSaveBtnPressed()
    {
        console.log("onSaveBtnPressed")
        const id = this.noteId ? this.noteId : uuidv4(); // Generate a new id if its a new note.
        const note = {id:id, title:this.state.title, content:this.state.content};
        
        // Are we viewing a new note?
        if (this.noteId === undefined) 
        {
            this.noteId = id;
            this.props.addNote(note);
        }
        else
            this.props.updateNote(note);
    }

    // Delete note button pressed.
    onDeleteBtnPressed()
    {
        console.log("onDeleteBtnPressed")
        this.props.removeNote(this.noteId);
    }

    render() 
    {
        return (
            <div className={styles.main}>
                <div className={styles.notesList}>
                    <NotesList notes={this.props.notes} selectedId={this.noteId} />
                </div>
                <div className={styles.noteEditor}>
                    <div className={styles.headerMenu}>
                        <Link className={`${styles.button} ${styles.buttonNew}`} to={`/`} title="Add A New Note"> 
                            <i className="fas fa-plus"></i>&nbsp;&nbsp;New Note
                        </Link>
                    </div>
                    <div className={styles.noteTitle}>
                        <TextBox onChange={this.onTitleChange} value={this.state.title} />
                    </div>
                    <div className={styles.noteContent}>
                        <TextArea onChange={this.onContentChange} value={this.state.content} />
                    </div>
                    <div className={styles.footerMenu}>
                        <div className={styles.button} title="Edit Note"><i className="fas fa-edit"></i>&nbsp;&nbsp;Edit</div>
                        <div className={styles.button} onClick={() => this.onDeleteBtnPressed()} title="Delete Note"><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</div>
                        <div className={styles.button} onClick={() => this.onSaveBtnPressed()} title="Save Note">
                            <i className="fas fa-save"></i>&nbsp;&nbsp;Save
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => 
{
    return {
        notes: state.notes
    }
};

const mapDispatchToProps = dispatch => 
{
    return {
        addNote: oNote => dispatch(addNote(oNote)),
        updateNote: oNote => dispatch(updateNote(oNote)),
        removeNote: noteId => dispatch(removeNote(noteId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);