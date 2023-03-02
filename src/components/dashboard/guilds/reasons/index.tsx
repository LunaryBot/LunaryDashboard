import React, { InputHTMLAttributes, useRef, useEffect } from 'react';

import { Card } from '../../../card';

import styles from './styles.module.scss';
import { DurationInput } from '../../../form/duration';
import { Utils } from '../../../../utils/Utils';

type Props = InputHTMLAttributes<HTMLInputElement>;

const maxDurationLength = 28 * 1000 * 60 * 60 * 24;

export const GuildPredefinedReason: React.FC<{}> = () => {
    const _id = Utils.uuid();

    let setedUseEffect = false;

    useEffect(() => {
        const card = document.querySelector(`div[id="${_id}"]`);
        const span = document.querySelector(`span[id="${_id}"]`) as HTMLDivElement;

        if(card) {
            const observer = new MutationObserver(mutations => {
                if(!mutations.some(mutation => mutation.attributeName == 'data-opened')) return;

                // @ts-ignore
                span.style = `display: ${card.getAttribute('data-opened') ? 'none' : 'block'}`
            });
    
            observer.observe(card, { attributes: true });
        }
    }, [_id]);
    
    return (
        <Card retractable id={_id}>
            <Card.Header>
                <h2 style={{fontSize: '18px'}}>
                    #1 Rule
                    <br />
                    <span id={_id} style={{fontSize: '12px'}}>Lorem ipsum dolor sit amet consectetur, adipiscing elit praesent vehicula duis integer, bibendum nisi per molestie. Donec vitae parturient pretium pulvinar fermentum ultricies nec elementum eu massa vestibulum, tempus viverra porttitor vulputate taciti torquent gravida vel hac nisi, dictumst vivamus tortor litora maecenas consequat sociis mattis nisl pellentesque. Nec nostra cubilia habitant ut interdum nam feugiat litora potenti vel accumsan ad, vitae euismod dapibus molestie eros non id venenatis integer.</span>
                </h2>
            </Card.Header>

            <Card.Content>
                <span>
                    Mute Duration: <DurationInput 
                        stages={[
                            {
                                name: 'days',
                                label: 'd',
                                max: 28,
                                min: 0,
                                ms: 1000 * 60 * 60 * 24,
                            },
                            {
                                name: 'hours',
                                label: 'h',
                                max: 24,
                                min: 0,
                                ms: 1000 * 60 * 60,
                            },
                            {
                                name: 'minutes',
                                label: 'm',
                                max: 60,
                                min: 0,
                                ms: 1000 * 60,
                            },
                        ]}
                        max={maxDurationLength}
                    />
                    <br />
                    <span>* Duração maxima de 28 dias</span>
                </span>
            </Card.Content>
        </Card>
    )
}