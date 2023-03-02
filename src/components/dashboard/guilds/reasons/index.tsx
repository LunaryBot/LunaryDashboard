import React, { InputHTMLAttributes, useEffect } from 'react';

import { Card } from '../../../card';

import styles from './styles.module.scss';
import { DurationInput } from '../../../form/duration';
import { Utils } from '../../../../utils/Utils';

type Props = InputHTMLAttributes<HTMLInputElement>;

const maxDurationLength = 28 * 1000 * 60 * 60 * 24;

export const GuildPredefinedReason: React.FC<{}> = () => {
    const _id = Utils.uuid();

    useEffect(() => {
        const card = document.querySelector(`div[id="${_id}"]`);
        const span = document.querySelector(`span[id="${_id}"]`) as HTMLDivElement;
        const textarea = document.querySelector(`textarea[id="${_id}"]`) as HTMLTextAreaElement;

        if(card) {
            const observer = new MutationObserver(mutations => {
                if(!mutations.some(mutation => mutation.attributeName == 'data-opened')) return;

                const isOpened = card.getAttribute('data-opened');

                if(!isOpened) span.innerHTML = textarea.value;

                // @ts-ignore
                span.style = `display: ${isOpened ? 'none' : 'block'}`
            });
    
            observer.observe(card, { attributes: true });
        }
    }, [_id]);
    
    return (
        <Card retractable id={_id} style={{backgroundColor: 'var(--luny-background)', marginTop: '0', marginBottom: '20px'}}>
            <Card.Header>
                <h2 style={{fontSize: '18px'}}>
                    #1 Rule
                    <br />
                    <span id={_id} style={{fontSize: '12px'}}>Lorem ipsum dolor sit amet consectetur, adipiscing elit praesent vehicula duis integer, bibendum nisi per molestie. Donec vitae parturient pretium pulvinar fermentum ultricies nec elementum eu massa vestibulum, tempus viverra porttitor vulputate taciti torquent gravida vel hac nisi, dictumst vivamus tortor litora maecenas consequat sociis mattis nisl pellentesque. Nec nostra cubilia habitant ut interdum nam feugiat litora potenti vel accumsan ad, vitae euismod dapibus molestie eros non id venenatis integer.</span>
                </h2>
            </Card.Header>

            <Card.Content>
                Reason Text:
                <textarea name={'reason text'} id={_id} cols={30} rows={10} className={styles.textInput}></textarea>
                <br />
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