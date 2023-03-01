import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';

import { useAPI } from '../../../../hooks/useAPI';

import { Switch, Card, Select, GuildPermissions, Button } from '../../../../components';

import { PermissionFlagsBits } from 'discord-api-types/v10';

import styles from '../../../../styles/Guild.module.scss';

const flagsEntries = Object.entries(PermissionFlagsBits);

const ToggleBox: React.FC<PropsWithChildren & { defaultValue?: boolean }> = (props) => {
    const [value, setValue] = useState<boolean>(!!props?.defaultValue);

    return (
        <button className={styles.toggleBox} {...(value ? {'data-checked': true} : {})} onClick={() => setValue(!value)} role={'checkbox'}>
            <span className={styles.checkedIcon}>
                <i className={'fas fa-check'}/>
            </span>
            {props.children}
        </button>
    )
}

const DashboardGuildModeration: React.FC = () => {
    const { user, guild } = useAPI();

    return (
        <main>
            <Card size={'small'}>
                <Card.Header>
                    <h3>Canal de Punicões</h3>
                </Card.Header>
                <Card.Content>
                    <Select
                        customId='punishments_channel'
                        options={[...(guild?.channels || [])].sort((a, b) => a.position - b.position).map(channel => ({
                            label: channel.name,
                            value: channel.id,
                        })) || []}
                        placeholder={'Select a channel'}
                    />
                </Card.Content>
            </Card>

            <Card size={'small'}>
                <Card.Header>
                    <h3>Canal de Modlogs</h3>
                </Card.Header>
                <Card.Content>
                    <Select
                        customId='modlogs_channel'
                        options={[...(guild?.channels || [])].sort((a, b) => a.position - b.position).map(channel => ({
                            label: channel.name,
                            value: channel.id,
                        })) || []}
                        placeholder={'Select a channel'}
                    />
                </Card.Content>
            </Card>

            <Card retractable={true}>
                <Card.Header style={{marginTop: '10px'}}>
                    <h2 style={{marginBottom: '20px'}}>
                        <code style={{backgroundColor: 'transparent', border: 'none', fontSize: '16px'}}>
                            <i className={'fas fa-slash'} style={{transform: 'rotate(90deg)', marginRight: '0', color: 'var(--luny-band-100)'}} />
                            ban user {/* */}
                            <code style={{marginRight: '5px'}}>user</code>
                            <code style={{marginRight: '5px'}}>reason</code>
                            <code style={{marginRight: '5px'}}>notify-dm</code>
                            <code style={{marginRight: '5px'}}>days</code>
                        </code>
                        <br />
                        <span>Ban a user from the guild.</span>
                    </h2>
                </Card.Header>
                <Card.Content>
                    <Select 
                        options={[
                            ...flagsEntries.map(([key, value]) => {
                                return ({
                                    label: key.replace(/([A-Z])|^([a-z])/g, (w) => ` ${w.toUpperCase()}`),
                                    value: value,
                                    default: key == ''
                                })
                            }),
                        ]}
                        customId={'banCommandPermissions'}
                        placeholder={'Select a permission'}
                        maxValues={flagsEntries.length}
                    />

                    <div className={styles.togglesBoxWrapper}>
                        <ToggleBox>
                            <h3>Manatory Reason</h3>
                            <span>Requires a reason for the ban.</span>
                        </ToggleBox>
                        <ToggleBox>
                            <h3>Notify User</h3>
                            <span>Notify the user that they have been banned.</span>
                        </ToggleBox>
                    </div>
                </Card.Content>
            </Card>
            
            <Card>
                <Card.Content>
                    <GuildPermissions />
                    <GuildPermissions />
                    <Card style={{backgroundColor: 'transparent', border: 'none', padding: '0'}}>  
                        <Button className={styles.newItemButton}>
                            <Button.Icon>
                                <i className='far fa-plus'/>
                            </Button.Icon>
                            
                            <Button.Content>
                                Add permissions
                            </Button.Content>
                        </Button> 
                    </Card>
                </Card.Content>
            </Card>
        </main>
    )
}

export default DashboardGuildModeration;