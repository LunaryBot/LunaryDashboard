import React from 'react';
import { EventEmitter } from 'events';

import Styles from '../styles/Toggle.module.css';

// @ts-ignore
class Toggle extends React.Component {
    private emitter: EventEmitter;
    public state: {
        value: boolean;
    }

    constructor(props: { value: boolean }) {
        super(props);

        this.state = {
            value: props.value || false,
        };

        this.emitter = new EventEmitter();
    }

    public get checked() {
        return this.state.value;
    }

    public addEventListener(event: string, listener: (...args: any[]) => void) {
        this.emitter.addListener(event, listener);
    }

    public removeEventListener(event: string, listener: (...args: any[]) => void) {
        this.emitter.removeListener(event, listener);
    }

    public toggle() {
        this.setState({ checked: !this.state.value });

        this.emitter.emit('change', !this.state.value);
    }
    
    public setValue(value: boolean) {
        this.setState({ value });

        this.emitter.emit('change', !this.state.value);
    }

    public render() {
        return (
            <>
                <label className={`${Styles.switch}`}> 
                    <input type={'checkbox'} defaultChecked={this.state.value} onChange={(e) => this.setValue(e.target.checked)} />
                    <span className={Styles['switch-slider']} />
                </label>
            </>
        );
    }
}

export default Toggle;