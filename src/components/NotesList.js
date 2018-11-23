import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import dateFormatter from '../utils/dateFormatter';
import styles from './NotesList.module.css';

const NotesList = props =>
{ 
    // Need to highlight the note if its selected - that should be passed in as a prop with the note id.
    const arrNotes = props.notes.map(oNote => 
    {
        const isSelected = oNote.id === props.selectedId ?  `${styles.tag} ${styles.tagSelected}`  : `${styles.tag}`;
        return (
        <Link key={oNote.id} className={isSelected} to={`/${oNote.id}`} title={`Click to view ${oNote.title}`}> 
            <div className={styles.title}>{oNote.title}</div>
            <div className={styles.date}>Last Updated: {dateFormatter(oNote.date).fromNow()}</div>
        </Link>)
    });
    if (arrNotes.length > 0)  return <div className={styles.list}>{arrNotes}</div>
    else return null;
};

const mapStateToProps = state => 
{
    return {notes: state.notes}
};

export default connect(mapStateToProps)(NotesList)