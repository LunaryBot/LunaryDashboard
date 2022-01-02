import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { Guild, URLS, User } from '../../../../types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NavBar from '../../../../components/NavBar';
import SideBar from '../../../../components/SideBar';
import _GuildCard from '../../../../components/GuildCard';
import { useRouter } from 'next/router';
import { createState } from '../../../../Utils/states';
import fetch from 'node-fetch';

export default function DashboardGuilds({ token, user }: { token: string; user: User }) {
    const [guilds, setGuilds] = useState<Guild[] | null | any>(null);
    const [_guilds, _setGuilds] = useState<Guild[] | null | any>(null);
    const [guild, setGuild] = useState<Guild | null | any>(null);

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

    // useEffect(() => {
    //     (async() => {
    //     if(guild) setGuild(guild)
    //     else {
    //         console.log(`${bot_api}/api/guild/${guildId}`)
    //         const res = await axios.get(`${bot_api}/api/guild/${guildId}`)
    //         const data = res;
    //         console.log("fetch guild")
    //         console.log(data);
    //         setGuild(data);
    //     }
    //     })()
    // }, [guild]);
  
    return (
        <main>
            <NavBar user={user} />
            <SideBar user={user} guilds={guilds} />
            
            <div className={"content"}>
                
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
        
        try {
            const guild = await fetch(`${process.env.BOT_API}`.replace(/\/$/, '') + "/api/guild/" + ctx.query.id).then(res => res.json()) as any;

            if(!guild || guild.status !== 200) {}
            return {
                props: {
                    token,
                    user,
                    guild
                }
            }
        } catch (e) {
            
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