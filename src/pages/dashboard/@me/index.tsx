import Link from 'next/link';

import { Card, Select, Button } from '../../../components';
import { useAPI } from '../../../hooks/useAPI';

export default function Index() {
    const context = useAPI();

    return (
        <main>
            <Card size='small'>
                <Card.Header>
                    <h2>
                        select
                    </h2>
                </Card.Header>

                <Card.Content>
                    <Select 
                        placeholder='Select a option'
                        customId='select_me'
                        maxValues={2}
                        options={[
                            {
                                label: 'Option 1',
                                value: 'op1',
                                default: true,
                            },
                            {
                                label: 'Option 2',
                                value: 'op2'
                            },
                            {
                                label: 'Option 3',
                                value: 'op3'
                            }
                        ]}
                    />

                    <br />

                    <Button style={{width: '100px', marginRight: '10px'}}>
                        <Button.Icon style={{marginRight: '4px'}}>
                            <i className='far fa-home'/>
                        </Button.Icon>
                        
                        <Button.Content>
                            Home
                        </Button.Content>
                    </Button>

                    <Button style={{width: '100px', marginRight: '10px'}}>
                        <Button.Icon>
                            <i className='far fa-home'/>
                        </Button.Icon>
                    </Button>

                    <Button style={{width: '100px'}}>
                        <Button.Content>
                            Home
                        </Button.Content>
                    </Button>
                </Card.Content>
            </Card>
        </main>
    )
}