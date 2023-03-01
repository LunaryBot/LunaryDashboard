import React from 'react';

import { Card } from '../../../card';
import { Select, Switch } from '../../../form';

import styles from './styles.module.scss';
import { useAPI } from '../../../../hooks/useAPI';

export const GuildPermissions: React.FC<{}> = (props) => {
    const { guild } = useAPI();

    return (
        <Card style={{backgroundColor: 'var(--luny-background)', marginTop: '0', marginBottom: '20px'}}>
            <Card.Content>
                <div style={{
                    display: 'flex'
                }}>
                    <Select
                        customId='role'
                        options={[...(guild?.roles || [])].sort((a, b) => b.position - a.position).map(role => ({
                            label: role.name,
                            value: role.id,
                            color: role.color ? `#${role.color.toString(16)}` : undefined
                        })) || []}
                        placeholder={'Select a role'}
                        maxValues={1}
                        backgroundColor={'var(--luny-backgroundSecondary)'}
                    />

                    <div className={styles.deleteButton}><i className={'fas fa-trash'} /></div>
                </div>

                <div className={styles.togglesContainer}>
                    <div className={styles.item}>
                        Ban Members
                        <br />
                        <Switch />
                    </div>
                    <div className={styles.item}>
                        Kick Members
                        <br />
                        <Switch />
                    </div>
                    <div className={styles.item}>
                        Mute Members
                        <br />
                        <Switch />
                    </div>
                    <div className={styles.item}>
                        Adv Members
                        <br />
                        <Switch />
                    </div>
                    <div className={styles.item}>
                        View History
                        <br />
                        <Switch />
                    </div>
                    <div className={styles.item}>
                        Manage History
                        <br />
                        <Switch />
                    </div>
                </div>
            </Card.Content>
        </Card>
    )
}