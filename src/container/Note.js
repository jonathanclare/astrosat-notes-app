import React, {Component}  from 'react';
import TextBox from '../components/TextBox';
import TextArea from '../components/TextArea';
import NotesList from '../components/NotesList';
import {addNote, removeNote, updateNote} from '../store/store';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import dateFormatter from '../utils/dateFormatter';
import styles from './Note.module.css';

class Note extends Component
{
    constructor(props) 
    {
        super(props);

        // passed in props... 
        // prop:mode edit|view
        // prop:id the note id

        this.state =  
        { 
            showNotesList: false,
            changesMade: false,
            mode: props.mode ? props.mode : 'view',
            id: props.id,
            date: new Date().toISOString(),
            title: 'Add A Title',
            content: 'Add Some Content'
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
    }

    componentDidMount()
    {  
        this.onNoteIdChange();
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if (prevProps.id !== this.props.id) this.onNoteIdChange();
    }

    // The note id prop has changed.
    onNoteIdChange()
    { 
        // Default new note.
        const s4 = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        let note = {id:s4, title:'Add A Title', content:'Add Some Content', date:new Date().toISOString()};

        // Does the note exist already?
        const arrNotes = this.props.notes.filter(note => note.id === this.props.id);
        if (arrNotes.length > 0) note = arrNotes[0]; // Note found!
        this.setState({id:note.id, title:note.title, content:note.content, date:note.date});
    }

    // Note title changed.
    onTitleChange(str)
    {
        this.setState({changesMade:true, title:str});
    }

    // Note content changed.
    onContentChange(str)
    {
        this.setState({changesMade:true, content:str});
    }

    // Save note button pressed.
    onSaveBtnPressed()
    {
        const note = {id:this.state.id, title:this.state.title, content:this.state.content};
        this.setState({changesMade:false}, () => this.props.updateNote(note));
    }

    // Delete note button pressed.
    onDeleteBtnPressed()
    {
        const r = window.confirm('Are you sure you want to delete this note?');
        if (r === true) 
        {
            this.props.removeNote(this.state.id);
            this.props.history.push('/');
        }
    }

    // Toggle Notes list.
    toggleNotesList()
    {
        this.setState({showNotesList:!this.state.showNotesList});
    }

    render() 
    {
        const saveClassName = this.state.changesMade === true ? `${styles.button} ${styles.buttonAlert}` : `${styles.button}`;
        const noteClassName = this.props.mode === 'edit' ? `${styles.noteContentContainer} ${styles.noteContentContainerEditMode}` : `${styles.noteContentContainer}`;
        return (
            <div className={styles.main}>
                <div className={styles.notesList}>
                    <NotesList notes={this.props.notes} selectedId={this.state.id} />
                </div>
                <div className={styles.noteEditor}>
                    <div className={styles.menu}>
                        <Link className={`${styles.button} ${styles.buttonNew}`} to={`/new`} title="Add A New Note"><i className="fas fa-plus"></i>&nbsp;&nbsp;New Note</Link>
                        {this.props.mode === 'view' ? <Link className={styles.button} to={`/${this.state.id}/edit`} title="Edit Note"><i className="fas fa-edit"></i>&nbsp;&nbsp;Edit</Link> : null}
                        {this.props.mode === 'view' ? <div className={styles.button} onClick={() => this.onDeleteBtnPressed()} title="Delete Note"><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</div> : null}
                        {this.props.mode === 'edit' ? <div className={saveClassName} onClick={() => this.onSaveBtnPressed()} title="Save Note"><i className="fas fa-save"></i>&nbsp;&nbsp;Save</div> : null}
                        <div className={styles.button} onClick={() => this.toggleNotesList()} title="Toggle Notes List"><i className="fas fa-bars"></i></div>
                    </div>
                    <div className={styles.date}>{dateFormatter(this.state.date).format('llll')}</div>
                    <div className={styles.noteTitleContainer}>
                        {this.props.mode === 'edit' ? <TextBox onChange={this.onTitleChange} value={this.state.title} /> : <div className={styles.title} dangerouslySetInnerHTML={{__html: this.state.title}} />}
                    </div>
                    <div className={noteClassName}>
                        {this.props.mode === 'edit' ? <TextArea onChange={this.onContentChange} value={this.state.content} /> : <div className={styles.content} dangerouslySetInnerHTML={{__html: this.state.content}} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Note)); // Need to add withRouter so we have access to history for deleting notes... this.props.history.push('/');