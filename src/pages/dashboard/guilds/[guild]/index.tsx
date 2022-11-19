import React from 'react';
import { useAPI } from '../../../../hooks/useAPI';

import { Switch, Card } from '../../../../components';

const DashboardGuild: React.FC = () => {
    const { user, guild } = useAPI();

    return (
        <main>
            {guild?.name}

            <Card>
                <Card.Content>
                    <Switch defaultChecked disabled />
                </Card.Content>
            </Card>
        </main>
    )
}

export default DashboardGuild;