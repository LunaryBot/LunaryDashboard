import React from 'react';
import { useAPI } from '../../../../hooks/useAPI';

import { Switch, Card, Select } from '../../../../components';

const DashboardGuild: React.FC = () => {
    const { user, guild } = useAPI();

    console.log();

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
        </main>
    )
}

export default DashboardGuild;