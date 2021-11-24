import React from 'react';
import sty from "styled-components";
import Link from "next/link";
import * as FAS from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cta = sty.div`
    margin-top: 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    color: #edf0f1;
    text-decoration: none;
    padding: 9px 25px;
    background-color: #141414;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover, .colorA {
        color: #141414;
        background-color: #fafafa;
    }
    i {
        margin-right: 5px;
    }
`

export const SideBar = () => {
    return (
        <div className="sidebar">
            <Cta id="dashboard-button">
                <Link href="/">
                    <h3><FontAwesomeIcon icon={FAS.faTachometerAlt} /> Dashboard</h3>
                </Link>
            </Cta>
            <Cta id="config-button">
                <Link href="/">
                    <h3><FontAwesomeIcon icon={FAS.faCog} /> Configurações do Servidor</h3>
                </Link>
            </Cta>
            <Cta id="users-button">
                <Link href="/">
                    <h3><FontAwesomeIcon icon={FAS.faUsersCog} /> Configurações de Usuários</h3>
                </Link>
            </Cta>
            <Cta id="timer-button">
                <Link href="/">
                    <h3><FontAwesomeIcon icon={FAS.faUserClock} /> Timer's</h3>
                </Link>
            </Cta>
        </div>
    );
};