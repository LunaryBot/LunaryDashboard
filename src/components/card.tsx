import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes, useState, MouseEvent} from 'react';

import styles from '../styles/Card.module.scss';

type Props = PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;

interface CardProps extends Props {
    size?: 'large' | 'small'
}

interface CardPropsRetractable extends CardProps {
    retractable?: boolean;
    defaultOpened?: boolean;
}

export function Card(props: CardProps|CardPropsRetractable = {}) {
    const [opened, setOpen] = useState<boolean>((props as CardPropsRetractable).defaultOpened ?? false);

    const myProps = {
        'data-size': props.size || 'large',
        ...props,
    }

    if((props as CardPropsRetractable).retractable) {
        myProps['data-retractable'] = true;
        if(opened) myProps['data-opened'] = true;
    }

    return (
        <div {...myProps} className={`${styles.card} ${props?.className || ''}`.trim()} onClick={(e) => setOpen(!opened)} />
    )
}

Card.Header = (props: Props) => <header {...props} />
Card.Content = (props: Props) => <main {...props} />