import React, { MouseEventHandler } from 'react';

class Card extends React.Component {
    public props: {
        title?: React.ReactNode|string;
        children: any;
        className?: string;
        retractable?: boolean;
        defaultOpened?: boolean;
    }

    public state: {
        opened: boolean;
    }

    public node: HTMLDivElement;

    constructor(props) {
        super(props);

        this.state = {
            opened: props.retractable ? (props.defaultOpened || false) : true,
        };
        
        this.node;
    }

    toggle(e: React.MouseEvent) {
        if(!this.props.retractable) {
            return;
        }

        this.setState({
            opened: !this.state.opened,
        });
    }

    public render() {
        return (
            <div className={`card ${this.props.className || ''}`} data-opened={this.state.opened} data-retractable={this.props.retractable} ref={node => this.node = node}>
                {this.props.title && (
                    <div className={'cardHeader'} onClick={e => this.toggle(e)}>
                        <h2>
                            {this.props.title}
                        </h2>
                    </div>
                )}

                <main className={'cardBody'}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Card;