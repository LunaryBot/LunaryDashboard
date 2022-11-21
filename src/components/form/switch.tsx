import React, { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type'> & {

}

const SwitchWrapper = styled.label`
    display: inline-block;
    height: 40px;
    position: relative;
    width: 56px;

    & > input {
        height: 0px;
        opacity: 0;
        width: 0px;
    }

    & > span  {
        -webkit-transition: .4s;
        background-color: var(--luny-background);
        border-radius: 30px;
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: .4s;
        border: 1px solid var(--luny-ui-15);

        &:before {
            -webkit-transition: .4s;
            background-color: var(--luny-ui-40);
            border-radius: 50%;
            bottom: 4.5px;
            content: "";
            height: 21px;
            left: 4px;
            position: absolute;
            transition: .25s;
            width: 22px;
        }
    }

    & > input:checked + span:before {
        -ms-transform: translateX(24px);
        -webkit-transform: translateX(24px);
        transform: translateX(24px);
        background-color: var(--luny-band-100);
    }

    & > input:checked:disabled + span {
        cursor: no-drop;
        
        &:before {
            background-color: var(--luny-band-40);
        }
    }
`;

export const Switch: React.FC<Props> = (props) => (
    <SwitchWrapper> 
        <input type={'checkbox'} {...props} />
        <span />
    </SwitchWrapper>
);