import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes, MouseEvent, useState, useEffect, useRef} from 'react';

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
    const ref = useRef<HTMLDivElement>();

    const myProps = {
        'data-size': props.size || 'large',
        ...props,
    }

    if((props as CardPropsRetractable).retractable) {
        myProps['data-retractable'] = true;
        if(opened) myProps['data-opened'] = true;
    }

    
    function toggle(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if(ref && ([ ...(ref.current?.childNodes || []) ].find(element => element.nodeName == 'HEADER') as HTMLDivElement)?.contains(event.target as any)) {
            setOpen(!opened)
        }
    }

    return (
        <div {...myProps} className={`${styles.card} ${props?.className || ''}`.trim()} onClick={(e) => toggle(e)} ref={ref} />
    )
}

Card.Header = (props: Props) => <header {...props} />
Card.Content = (props: Props) => <main {...props} />