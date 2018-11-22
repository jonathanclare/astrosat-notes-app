import React, {Component}  from 'react';
import styles from './TextBox.module.css';

export default class TextBox extends Component
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
    
    componentDidUpdate(prevProps, prevState) 
    {
        if (prevProps.value !== this.props.value) this.setState({value: this.props.value});
    }

    handleChange(event) 
    {
        this.setState({value: event.target.value}, () => this.props.onChange(this.state.value));
    }

    render() 
    {
        return (
            <React.Fragment>
                <input className={styles.box} type="text" charSet="utf-8" value={this.state.value} onChange={this.handleChange} />
            </React.Fragment>
        );
    }
};