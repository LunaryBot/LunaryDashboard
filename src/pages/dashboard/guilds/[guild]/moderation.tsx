import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { APIGuildResponse, Guild , GuildData, URLS, User } from '../../../../types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NavBar from '../../../../components/NavBar';
import SideBar from '../../../../components/SideBar';
import _GuildCard from '../../../../components/GuildCard';
import { useRouter } from 'next/router';
import { createState } from '../../../../Utils/states';
import fetch from 'node-fetch';

export default function DashboardGuilds({ token, user, guild }: { token: string; user: User, guild: Guild }) {
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
    return (
        <main>
            <NavBar user={user} />
            <SideBar user={user} guilds={guilds} />
            
            <div className={"content"}>
                <h1>{guild.name}</h1>
            </div>
        </main>
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
        }).then(res => res.json());

        console.log("aqui")
        
        try {
            const guild = await fetch(`${process.env.BOT_API}`.replace(/\/$/, '') + "/api/guild/" + ctx.query.guild)
            .then(res => res.json()) as APIGuildResponse;

            if(!guild?.data || guild.status == 404) return {
                redirect: {
                    destination: '/invite?guild=' + ctx.query.guild,
                    permanent: false,
                }
            }

            return {
                props: {
                    token,
                    user,
                    guild: guild.data
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