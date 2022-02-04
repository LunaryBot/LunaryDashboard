import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { APIGuildResponse, Guild , GuildData, URLS, User, LogData, Log } from '../../../../types';
import { GuildConfig } from '../../../../Constants';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NavBar from '../../../../components/NavBar';
import SideBar from '../../../../components/SideBar';
import LoadingDots from '../../../../components/LoadingDots';
import Toggle, { CheckRadio } from '../../../../components/Toggle';
import _GuildCard from '../../../../components/GuildCard';
import { createState } from '../../../../Utils/states';
import fetch from 'node-fetch';
import initializerFirebases from '../../../../Utils/initializerFirebase';
import styles from '../../../../styles/guild.module.css';
import { useRouter } from 'next/router';
import decode from '../../../../Utils/decode';
import encode from '../../../../Utils/encode';
import fs from 'node:fs'
fs.readFileSync
global.axios = axios;

export default function Permissions({ token, user, guild, reqToken }) {
    const [guilds, setGuilds] = useState<GuildData[] | null | any>(null);
    const [_guilds, _setGuilds] = useState<GuildData[] | null | any>(null);

    useEffect(() => {
        (async() => {
        if(guilds) setGuilds(guilds)
        else {
            const res = await axios.get(URLS.GUILDS, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const data = res.data;

            const filter = await axios.get("/api/guilds/filter", {
            headers: {
                guilds: (data || []).map(g => g.id).join(",")
            }
            }).then(x => x.data)
            
            console.log("fetch guilds")
            setGuilds(data.filter(x => filter.data.guilds.includes(x.id)));
            _setGuilds(data);
        }
        })()
    }, [guilds]);

    useEffect(() => {
        localStorage.setItem("reqToken", reqToken);
    }, [token])

    return (
        <>
            <main>
                <div id="overlay-save-error">
                    <img src="https://cdn.discordapp.com/emojis/849302611744129084.png?v=1" alt="Salvando..." />
                    <p>Houve um erro ao entrar em contato com o servidor!</p>
                </div>

                <NavBar user={user} />
                <SideBar user={user} guilds={guilds} guild={guild} />

                <div className={"content"}>
                    <div id='loadingDot' hidden>
                        <LoadingDots />
                        <a href={useRouter().route.replace('[guild]', guild.id)}>Caso a pagina não carregue clique aqui</a>
                    </div>

                    <div className='card'>
                        <div className="card-content">
                            <div className={styles["container"]}>
                                
                                <div>
                                <span>Adicionar Usuario:</span>
                                <CheckRadio>
                                    <Toggle id="user-add" />
                                </CheckRadio>
                                </div>

                                <div>
                                <span>Remover Usuario:</span>
                                <CheckRadio>
                                    <Toggle id="user-remove" />
                                </CheckRadio>
                                </div>

                                <div>
                                <span>A Usuario:</span>
                                <CheckRadio>
                                    <Toggle id="user-kill" />
                                </CheckRadio>
                                </div>

                                <div>
                                <span>A Usuario:</span>
                                <CheckRadio>
                                    <Toggle id="user-kill" />
                                </CheckRadio>
                                </div>

                                <div>
                                <span>A Usuario:</span>
                                <CheckRadio>
                                    <Toggle id="user-kill" />
                                </CheckRadio>
                                </div>

                                <div>
                                <span>A Usuario:</span>
                                <CheckRadio>
                                    <Toggle id="user-kill" />
                                </CheckRadio>
                                </div>

                                <div>
                                <span>A Usuario:</span>
                                <CheckRadio>
                                    <Toggle id="user-kill" />
                                </CheckRadio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const { ['lunarydash.token']: token } = parseCookies(ctx)
    
    
    if(!token) {
        return propsRedirect()
    }

    try {
        const user = await fetch(URLS.USER, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json()) as User;
        
        try {
            const guild = await fetch(`${process.env.BOT_API}`.replace(/\/$/, '') + "/api/guild/" + ctx.query.guild)
            .then(res => res.json()) as APIGuildResponse;

            if(guild.status == 404 || !guild?.data) return {
                redirect: {
                    destination: '/invite?guild=' + ctx.query.guild,
                    permanent: false,
                }
            }
            
            const baseToken = `${Number(user.id).toString(12)}-${Number(ctx.query.guild).toString(36)}-`

            if(!global.tokens || (typeof global.tokens == "object" && !Array.isArray(global.tokens))) {
                global.tokens = {}
            }

            const [oldToken] = Object.entries(global.tokens).find(([k, v]) => k.startsWith(baseToken)) || []

            if(oldToken) {
                delete global.tokens[oldToken]
            }

            const newToken = baseToken + Math.random().toString(36).split(".")[1]

            global.tokens[newToken] = {
                guild: ctx.query.guild,
                user: user.id,
                token: token,
            }

            return {
                props: {
                    token,
                    user,
                    guild: guild.data,
                    reqToken: newToken,
                }
            }
        } catch (e) {
            return {
                redirect: {
                    destination: '/500?error=' + encodeURI(e.message),
                    permanent: false,
                }
            }
        }
    } catch(e) {
        return propsRedirect()
    }

    function propsRedirect() {
        const state = createState({ url: ctx.req.url });

        return {
            redirect: {
                destination: `/api/auth/login?state=${state}`,
                permanent: false
            }
        }
    }
}