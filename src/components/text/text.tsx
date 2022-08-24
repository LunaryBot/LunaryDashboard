import { PropsWithChildren, CSSProperties, FC } from 'react';

interface TextProps extends PropsWithChildren {
    css: CSSProperties;
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Text: FC = ({ children, size = 'sm' }: TextProps) => (
    <p data-size={size}>{children}</p>
)