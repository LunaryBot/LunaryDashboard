import React, { InputHTMLAttributes, useState } from 'react';

import { Card } from '../../../card';

import styles from './styles.module.scss';
import { DurationInput } from '../../../form/duration';

type Props = InputHTMLAttributes<HTMLInputElement>;

const maxDurationLength = 28 * 1000 * 60 * 60 * 24;

export const GuildPredefinedReason: React.FC<{}> = () => {
    let value: {days: number, hours: number, minutes: number} = { days: 0, hours: 0, minutes: 0 };

    const calculeteDurationLength = (d = value) => {
        const { days, hours, minutes } = d;

        const v = (days * 1000 * 60 * 60 * 24) + (hours * 1000 * 60 * 60) + (minutes * 1000 * 60);

        console.log(v);

        return v;
    }

    const NumberInput: React.FC<Props> = (props) => (
        <input {...props} type={'number'} onKeyPress={(event) => {
            if(event.key === '.' || isNaN(Number(event.key))) return event.preventDefault();

            const newValue = { ...value, [props.name]: Number((event.target as HTMLInputElement).value + event.key) };
            
            if(calculeteDurationLength(newValue) >= maxDurationLength) {
                return event.preventDefault();
            }

            value = newValue;
        }} />
    )

    return (
        <Card>
            {/* <div className={styles.durationInputs}>
                <NumberInput name='days' defaultValue={value.days} />
                <NumberInput name='hours' defaultValue={value.hours} />
                <NumberInput name='minutes' defaultValue={value.minutes} />
                <span>Duração maxima de 28 dias</span>
            </div> */}

            <span>Mute Duration: <DurationInput stages={[
                {
                    name: 'hours',
                    label: 'h',
                    max: 24,
                    min: 0,
                },
                {
                    name: 'minutes',
                    label: 'm',
                    max: 24,
                    min: 0,
                },
                {
                    name: 'seconds',
                    label: 's',
                    max: 24,
                    min: 0,
                },
            ]} /></span>
        </Card>
    )
}