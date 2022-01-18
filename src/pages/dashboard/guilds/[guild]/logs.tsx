import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { APIGuildResponse, Guild , GuildData, URLS, User, LogData, Log } from '../../../../types';
import { Permissions, GuildConfig } from '../../../../Constants';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NavBar from '../../../../components/NavBar';
import SideBar from '../../../../components/SideBar';
import LoadingDots from '../../../../components/LoadingDots';
import Toggle, { CheckRadio } from '../../../../components/Toggle';
import _GuildCard from '../../../../components/GuildCard';
import { createState } from '../../../../Utils/states';
import fetch from 'node-fetch';
import Script from 'next/script';
import initializerFirebases from '../../../../Utils/initializerFirebase';
import Head from 'next/head';
import styles from '../../../../styles/guild.module.css';
global.axios = axios;

const punishments = {
    "1": {
        name: "Ban",
        color: "#ed4245"
    }, 
    "2": {
        name: "Kick",
        color: "#ea8935"
    }, 
    "3": {
        name: "Mute",
        color: "#4b8cd2"
    }, 
    "4": {
        name: "Adv",
        color: "#eaac35"
    }
}

const defaulImg = "https://media.discordapp.net/attachments/880176654801059860/915300231866900530/91ce69b6c7c6ab40b1d35808979394a5.png?width=499&height=499";

export default function DashboardGuilds({ token, user, guild, reqToken }: { reqToken: string; token: string; user: User, guild: Guild }) {
    const [guilds, setGuilds] = useState<GuildData[] | null | any>(null);
    const [_guilds, _setGuilds] = useState<GuildData[] | null | any>(null);
    let logs: Log[] | null;

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
                    <div id='loadingDot'>
                        <LoadingDots />
                    </div>
                    <div className={styles["scr"]} id="logs-content-wrapper" hidden>
                        <table className={styles["cards-log"]}>
                            <thead>
                                <tr>
                                    <th>Usuário</th>
                                    <th>Autor</th>
                                    <th>Ação</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody id="logs-content">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Script
                src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                onLoad={() => {
                    async function fetchLogs(options = {} as { limit: number, chunk: number }) {
                        const { limit = 20, chunk = 0 } = options
                        $("#loadingDot").show();
                        try {
                            const timeout = setTimeout(() => {
                                console.log("timeout")
                                showErrorOverlay();
                                // fetchLogs(options)
                            }, 10 * 1000);

                            const res = (await axios.get(`/api/guilds/${guild.id}/logs`, {
                                headers: {
                                    token: localStorage.getItem("reqToken"),
                                    limit: limit.toString(),
                                    chunk: chunk.toString(),
                                    requesterId: user.id
                                }
                            })).data as any;

                            clearTimeout(timeout);

                            if(res.status == 200) {
                                $("#overlay-save-error").css({
                                    display: "none"
                                })
                                localStorage.setItem("reqToken", res.data.token)

                                logs = res.data.logs;
                                $("#loadingDot").hide();

                                setLogs();
                            } else {
                                showErrorOverlay();
                                console.log(res.statusText);
                            }
                        } catch (e) {
                            console.log(e)
                            showErrorOverlay()
                        }
                        
                        function showErrorOverlay() {
                            $("#overlay-save-error").css({
                                display: "block"
                            })
                        }
                    }

                    fetchLogs()

                    function setLogs() {
                        $("#logs-content").html("");
                        $("#logs-content-wrapper").show()
                        logs.forEach((log: Log) => {
                            const { user, author, reason, date, id, type } = log;
                            const punishment = punishments[type];
                            const dateFormat = new Date(date).toLocaleString();

                            $("#logs-content").append(`
                                <tr id="${id}" card-log>
                                    <td class="${styles["author"]}">
                                        <img src="${user.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` : defaulImg}" class="${styles["img"]}" alt="" />
                                        <p class="${styles["details"]}"><strong>${user?.username}<br /><br />${user?.id}</strong></p>
                                    </td>
                                    <td><strong>${author?.username}<br /><br />${author?.id}</strong></td>
                                    <td><span class="${styles["punishment"]}" style="background-color: ${punishment.color};"><strong>${punishment.name}</strong></span></td>
                                    <td><strong>${dateFormat}</strong></td>
                                </tr>
                                <tr>
                                    <td class="${styles["card-footer"]} ${styles["close"]}" colspan=6 id="footer-${id}">
                                        <h3>Motivo</h3>
                                        <br />
                                        <p><strong>${
                                            reason
                                            .replace(/\[([^\]]+)\]\(([^\)]+)\)/,'<a href="$2">$1</a>')
                                            .replace(/<(a)?:(.{2,32}):(\d{17,19})>/g, `<img class="${styles["emoji"]}" name="$2" alt="<$1:$2:$3>" animated="$1" src="https://cdn.discordapp.com/emojis/$3" />`)
                                            .replace(/\`(\w{1,})\`/g,'<code>$1</code>')
                                            .replace(/\*\*(\w{1,})\*\*/g,'<strong>$1</strong>')
                                            .replace(/\*(\w{1,})\*|__(\w{1,})__/g,'<i>$1</i>')
                                        }</strong></p>
                                    </td>
                                </tr>
                            `)
                        })

                        $("[card-log]").click(function() {
                            const card = $(this)
                            const card_footer = $(`#footer-${card.attr("id")}`)
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
                    }
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