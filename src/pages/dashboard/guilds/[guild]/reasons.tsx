import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';

import { useAPI } from '../../../../hooks/useAPI';

import { GuildPredefinedReason } from '../../../../components';

import { PermissionFlagsBits } from 'discord-api-types/v10';

import styles from '../../../../styles/Guild.module.scss';

const flagsEntries = Object.entries(PermissionFlagsBits);

const ToggleBox: React.FC<PropsWithChildren & { defaultValue?: boolean }> = (props) => {
    const [value, setValue] = useState<boolean>(!!props?.defaultValue);

    return (
        <button className={styles.toggleBox} {...(value ? {'data-checked': true} : {})} onClick={() => setValue(!value)} role={'checkbox'}>
            <span className={styles.checkedIcon}>
                <i className={'fas fa-check'}/>
            </span>
            {props.children}
        </button>
    )
}

const DashboardGuildReasons: React.FC = () => {
    const { user, guild } = useAPI();

    return (
        <main>
            <GuildPredefinedReason />
        </main>
    )
}

export default DashboardGuildReasons;