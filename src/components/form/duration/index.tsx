import React, { useState, useId } from 'react';

import styles from './styles.module.scss';
import { Utils } from '../../../utils/Utils';

interface Props {
    stages: { 
        name: string;
        label?: string;
        min: number;
        max: number;
        ms: number;
        default?: number;
    }[];
    disable?: boolean;
}

export class DurationInput extends React.Component<Props, { values: Record<string, number>, disabled: boolean }> {
    readonly type = 'duration';

    _id = Utils.uuid();

    constructor(props) {
        super(props);

        this.state = {
            values: Object.fromEntries(
                props.stages.map(stage => ([stage.name, stage.default || 0]))
            ),
            disabled: props.disabled,
        }
    }

    get value(): number {
        return Object.entries(this.state.values).map(([name, value]) => (this.props.stages.find(stage => stage.name === name)?.ms || 0) * value).reduce((a, b) => a + b, 0);
    }

    setDisable(disabled: boolean) {
        this.setState({ disabled });
    }

    render() {
        const { props, _id, state: { values, disabled } } = this;
        return (
            <div className={styles.container}>
                {props.stages.map((stage, i) => (
                    <div className={styles.innerContainer} style={{ display: 'inline-block' }} key={`${_id}-${i}`}>
                        <input
                            className={styles.durationInput}
                            type={'number'} 
                            min={stage.min} 
                            max={stage.max}
                            maxLength={2}
                            placeholder={'0'} 
                            id={`${_id}-${stage.name}`}
                            defaultValue={stage.default}
                            readOnly={disabled}
    
                            onChange={event => this.setState({
                                values: { ...values, [stage.name]: Number(event.target.value) ?? 0 },
                            })}
                        />
                        <span className={styles.label}>
                            {stage.label || stage.name}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
}