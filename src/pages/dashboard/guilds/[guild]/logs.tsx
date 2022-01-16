import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { APIGuildResponse, Guild , GuildData, URLS, User, LogData } from '../../../../types';
import { Permissions, GuildConfig } from '../../../../Constants';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NavBar from '../../../../components/NavBar';
import SideBar from '../../../../components/SideBar';
import Toggle, { CheckRadio } from '../../../../components/Toggle';
import _GuildCard from '../../../../components/GuildCard';
import { createState } from '../../../../Utils/states';
import fetch from 'node-fetch';
import Script from 'next/script';
import initializerFirebases from '../../../../Utils/initializerFirebase';
import Head from 'next/head';
import styles from '../../../../styles/guild.module.css';

export default function DashboardGuilds({ token, user, guild, database, reqToken }: { reqToken: string; token: string; user: User, guild: Guild, database: any; }) {
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
                <NavBar user={user} />
                <SideBar user={user} guilds={guilds} guild={guild} />
                
                <div className={"content"}>
                    <div className={styles["table-responsive"]}>

                        <div className={`${styles["table"]} ${styles["logs-list"]}`}>
                            <thead>
                                <tr>
                                    <th><span>User</span></th>
                                    <th><span>Created</span></th>
                                    <th className={styles["text-center"]}><span>Status</span></th>
                                    <th><span>Email</span></th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    <img src="https://github.com/jvopinho.png" alt="" />
                                    <a href="#" className="user-link">Bae</a>
                                    <span className="user-subhead">Admin</span>
                                </td>
                                <td>
                                    31/03/2005
                                </td>
                                <td className="text-center">
                                    <span className="label label-default">Inactive</span>
                                </td>
                                <td>
                                    <a href="#">jvopinho.dev@gmail.com</a>
                                </td>
                                <td style={{width: "20%"}}>
                                    <a href="#" className={styles["table-link"]}>
                                        <span className="fa-stack">
                                            <i className="fa fa-square fa-stack-2x"></i>
                                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                    <a href="#" className={styles["table-link"]}>
                                        <span className="fa-stack">
                                            <i className="fa fa-square fa-stack-2x"></i>
                                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                    {/* <a href="#" className={`${styles["table-link"]} ${styles["danger"]}`}>
                                        <span className="fa-stack">
                                            <i className="fa fa-square fa-stack-2x"></i>
                                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a> */}
                                </td>
                            </tr>
                            </tbody>
                        </div>
                    </div>
                </div>
            </main>

            <Script
                src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                onLoad={() => {
                    
                }}
            ></Script>
        </>
    )
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

            const dbs = initializerFirebases()

            let database: LogData[] = Object.entries((await dbs.logs.ref().once('value')).val() || {}).map(function([k, v]: [string, string], i) {
                const data = JSON.parse(Buffer.from(v, 'base64').toString('ascii'))
                data.id = k
                return data
            }).filter(x => x.server == ctx.query.guild).sort((a, b) => b.date - a.date) || []

            database
            

            return {
                props: {
                    token,
                    user,
                    guild: guild.data,
                    database: database,
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

/*
Test Function

function request() {
    axios.patch("/api/guilds/869916717122469898", { 
        token: localStorage.getItem("reqToken")
    }).then(({ data }) => {
        console.log(data);
        localStorage.setItem("reqToken", data.data.token);
    })
}
*/