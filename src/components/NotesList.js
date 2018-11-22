import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import styles from './NotesList.module.css';

const NotesList = props =>
{ 
    // Need to highlight the note if its selected - that should be passed in as a prop with the note id
    const arrNotes = props.notes.map(oNote => 
    {
        return (
            <Link key={oNote.id} className={styles.tag} to={`/${oNote.id}`} title={`Click to view ${oNote.title}`}>
                <i className="far fa-edit"></i>&nbsp;&nbsp;{oNote.title}
            </Link>
        )
    });
    if (arrNotes.length > 0)  return <div className={styles.list}>{arrNotes}</div>
    else return null;
};

const mapStateToProps = state => 
{
    return {notes: state.notes}
};

export default connect(mapStateToProps)(NotesList)