import React from 'react';
import styled from 'styled-components';

const SwitchWrapper = styled.label`
    display: inline-block;
    height: 30px;
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
`;

export const Switch: React.FC = ({ checked: defaultChecked = false, disblabed = false }: { checked?: boolean, disblabed?: boolean }) => (
    <SwitchWrapper> 
        <input type={'checkbox'} defaultChecked={defaultChecked} disabled={disblabed} />
        <span />
    </SwitchWrapper>
);