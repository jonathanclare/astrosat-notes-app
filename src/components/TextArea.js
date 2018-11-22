import React, {Component}  from 'react';
import styles from './TextArea.module.css';

export default class TexatArea extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            value: this.props.value !== undefined ? this.props.value : ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) 
    {
        this.setState({value: event.target.value}, () => this.props.onChange(this.state.value));
    }

    render() 
    {
        return (
                <textarea className={styles.box} charSet="utf-8" value={this.state.value} onChange={this.handleChange} />
        );
    }
};