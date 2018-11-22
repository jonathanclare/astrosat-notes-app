import React, {Component}  from 'react';
import TextBox from './TextBox';
import TextArea from './TextArea';
import debounce from '../utils/debounce';
import styles from './EditNote.module.css';

export default class EditNote extends Component
{
    constructor(props) 
    {
        super(props);

        this.handleTitleChange = debounce(this.handleTitleChange.bind(this), 1000);
        this.handleContentChange = debounce(this.handleContentChange.bind(this), 1000);
    }

    // Title text changed.
    handleTitleChange(str)
    {
        console.log("handleTitleChange")
        console.log(str)
    }

    // Content text changed.
    handleContentChange(str)
    {
        console.log("handleContentChange")
        console.log(str)
    }

    render() 
    {
        return (
            <div className={styles.main}>
                <div className={styles.notesListContainer}>

                </div>
                <div className={styles.editContainer}>
                    <div className={styles.titleContainer}>
                        <TextBox onChange={this.handleTitleChange} />
                    </div>
                    <div className={styles.contentContainer}>
                        <TextArea onChange={this.handleContentChange} />
                    </div>
                </div>
            </div>
        );
    }
};