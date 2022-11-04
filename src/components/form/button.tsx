import React, { ButtonHTMLAttributes, PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from '../../styles/Button.module.scss';

type Props = PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={`${styles.button} ${props?.className || ''}`.trim()} />
    )
}

Button.Content = (props: Props) => <span {...props} className={`${styles.text} ${props?.className || ''}`.trim()} />
Button.Icon = (props: Props) => <span {...props} className={`${styles.icon} ${props?.className || ''}`.trim()} />

export { Button }