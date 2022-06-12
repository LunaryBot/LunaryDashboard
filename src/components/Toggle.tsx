import React from 'react';
import { EventEmitter } from 'events';

import Styles from '../styles/Toggle.module.css';

interface IProps {
    value?: boolean;
    customId?: string;
}

class Toggle extends React.Component {
    private emitter: EventEmitter;
    public state: {
        value: boolean;
        customId: string | null;
    }

    public props: IProps;

    constructor(props: IProps) {
        super(props);

        this.state = {
            value: props.value || false,
            customId: props.customId || null,
        };

        this.emitter = new EventEmitter();
    }

    public get customId() {
        return this.state.customId;
    }

    public get checked() {
        return this.state.value;
    }

    public set checked(value: boolean) {
        this.setState({ value });
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