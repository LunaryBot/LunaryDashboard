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
                    <div className={styles["scr"]}>
                        <table className={styles["cards-log"]}>
                            <thead>
                                <tr>
                                    <th>Usuário</th>
                                    <th>Autor</th>
                                    <th>Ação</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="fxe176s1-pkvl-7t1i-q6qb-tyej6k4hr5" card-log={"true"}>
                                    <td className={styles["author"]}>
                                        <img src="https://cdn.discordapp.com/avatars/869640914916757564/f0f883ebdb4a9e894a301e29b05d7fc9.png" className={styles["img"]} alt="" />
                                        <p className={styles["details"]}><strong>MarkProfissa#1252<br /><br />869640914916757564</strong></p>
                                    </td>
                                    <td><strong>Mr. Tower#9283<br /><br />425396277560475648</strong></td>
                                    <td><strong>Mute</strong></td>
                                    <td><strong>16/00/2022 15:56</strong></td>
                                </tr>
                                <tr>
                                    <td className={`${styles["card-footer"]} ${styles["close"]}`} colSpan={6} id="footer-fxe176s1-pkvl-7t1i-q6qb-tyej6k4hr5">
                                        <h3>Motivo</h3>
                                        <br />
                                        <p><strong>eu avisei</strong></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Script
                src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                onLoad={() => {
                    $("[card-log]").click(function() {
                        const card = $(this)
                        const card_footer = $(`#footer-${card.attr("id")}`)
                        // card.toggleClass(styles["open"])
                        // card_footer.toggleClass(styles["close"])
                        if(card_footer.hasClass(styles["close"])) {
                            $("[card-log]").each(function() {
                                const card = $(this)
                                const card_footer = $(`#footer-${card.attr("id")}`)
            
                                if(card.hasClass(styles["open"])) {
                                    card.removeClass(styles["open"])
                                }
                                if(!card_footer.hasClass(styles["close"])) {
                                    card_footer.addClass(styles["close"])
                                }
                            })
                            card.addClass(styles["open"])
                            card_footer.removeClass(styles["close"])
                        } else {
                            card.removeClass(styles["open"])
                            card_footer.addClass(styles["close"])
                        }
                    })
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