import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import moment from 'moment';
import styles from './NotesList.module.css';

const NotesList = props =>
{ 
    // Need to highlight the note if its selected - that should be passed in as a prop with the note id.

    // Sort notes by date.
	const arrSortedNotes = [...props.notes];
	arrSortedNotes.sort(sortByDate);

    const arrNotes = arrSortedNotes.map(oNote => 
    {
        let isSelected = oNote.id === props.selectedId ?  `${styles.tag} ${styles.tagSelected}`  : `${styles.tag}`;
        return (
        <Link key={oNote.id} className={isSelected} to={`/${oNote.id}`} title={`Click to view ${oNote.title}`}> 
            <div className={styles.title}>{oNote.title}</div>
            <div className={styles.date}>Last Updated: {moment(oNote.date).fromNow()}</div>
        </Link>)
    });
    if (arrNotes.length > 0)  return <div className={styles.list}>{arrNotes}</div>
    else return null;
};

const sortByDate = (a, b) => 
{
    return new Date(b.date) - new Date(a.date);
};

const mapStateToProps = state => 
{
    return {notes: state.notes}
};

export default connect(mapStateToProps)(NotesList)