import Link from 'next/link';

import { Card } from '../components';

export default function Index() {
    return (
        <main>
            <Card>
                <Card.Header>
                   <h2>
                        a
                    </h2>
                </Card.Header>
            </Card>

            <Card retractable>
                <Card.Header>
                    <h2>
                        b
                        <br />
                        <span>bb</span>
                    </h2>
                </Card.Header>
                <Card.Content>
                    <p>This is test</p>
                </Card.Content>
            </Card>

            <Card size='small'>
                <Card.Header>
                    <h2>
                        c
                    </h2>
                </Card.Header>
            </Card>

            <Card size='small'>
                <Card.Header>
                    <h2>
                        d
                    </h2>
                </Card.Header>
            </Card>
        </main>
    )
}