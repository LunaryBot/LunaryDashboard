import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';

import { useAPI } from '../../../../hooks/useAPI';

import { GuildPredefinedReason, Card, Button } from '../../../../components';

import styles from '../../../../styles/Guild.module.scss';

const DashboardGuildReasons: React.FC = () => {
    const { user, guild } = useAPI();

    return (
        <main>
           <Card>
                <Card.Content>
                    <GuildPredefinedReason />
                    <Card style={{backgroundColor: 'transparent', border: 'none', padding: '0'}}>  
                            <Button className={styles.newItemButton}>
                                <Button.Icon>
                                    <i className='far fa-plus'/>
                                </Button.Icon>
                                
                                <Button.Content>
                                    Add Predefined Reason
                                </Button.Content>
                            </Button> 
                        </Card>
                </Card.Content>
           </Card>
        </main>
    )
}

export default DashboardGuildReasons;