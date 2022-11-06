import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { gql } from '@apollo/client';

import { User } from '../../@types';

import { Button } from '../../components'

import { createAPIClient } from '../../services/ApiService';

import styles from '../../styles/Auth.module.scss';

export default function AuthDiscord() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const loginButton = document.getElementById('loginButton');
        
        const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });

        if(!token) {
            window.location.href = '/';
        } else {
            request();

            loginButton.addEventListener('click', () => {
                localStorage.setItem('auth_token', token);
                window.location.href = '/dashboard/@me';
            });
        }

        async function request() {
            const { data, errors } = await createAPIClient(token).query({
                query: gql`
                    query User {
                        CurrentUser {
                            username
                            id
                            avatar
                        }
                    }
                `,
            });

            if(errors) {
                console.log(errors)

                return;
            }

            setUser(data.CurrentUser)
        }
    }, []);

    console.log(user);

    return (
        <div className={`${styles.container} ${styles.help}`}>
            <div className={styles.loginInfos}>
                { user?.avatar ? <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=2048`} alt={`@${user.username}`} /> : <div className={styles.placeholder}></div> }
                <label>{user?.username}</label>
                <Button id={'loginButton'}>
                    <Button.Content>
                        Logar
                    </Button.Content>
                </Button>
            </div>
        </div>
    )
}