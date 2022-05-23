import Styles from '../styles/Dots.module.css';
import React from 'react';

class Dots extends React.Component {
    render() {
        return (
            <div className={Styles.dots}>
                <div />
                <div />
                <div />
            </div>
        );
    }
}

export default Dots;