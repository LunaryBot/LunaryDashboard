import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { APIGuildResponse, Guild , GuildData, URLS, User } from '../../../../types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NavBar from '../../../../components/NavBar';
import SideBar from '../../../../components/SideBar';
import Toggle from '../../../../components/Toggle';
import _GuildCard from '../../../../components/GuildCard';
import { createState } from '../../../../Utils/states';
import fetch from 'node-fetch';
import Script from 'next/script';

export default function DashboardGuilds({ token, user, guild, database }: { token: string; user: User, guild: Guild, database: any; }) {
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
        <>
            <main>
                <NavBar user={user} />
                <SideBar user={user} guilds={guilds} />
                
                <div className={"content"}>
                    {/* <div className="select-wrapper" data-send-on-save>
                            <div className="select" id="muterole">
                                <div className="select__trigger">
                                    <p>{(function() {
                                        let a = "Selecionar Cargo"
                                        if(database.muterole) {
                                            const role = guild.roles.filter(x => !x.managed && x.id != guild.id).find(x => x.id == database.muterole)
                                            if(role) {
                                                a = role.name
                                            }
                                        }
                                        return a
                                    })()}</p>
                                </div>
                                <form onSubmit={(e) => e.preventDefault() }><p className="select-menu-search"><input type="text" autoComplete='off' placeholder="Nome/ID" name="search" /><i className="icon fas fa-search"></i></p></form>
                                <div className="custom-options close" id="co-chat_modlogs">
                                    <span className="custom-option" data-value="none" data-li="Selecionar Cargo">Nenhum</span>
                                    {guild.roles.filter(x => !x.managed && x.id != guild.id).map(x => <span className="custom-option" style={{color: `#${Number(x.color).toString(16)}`}} data-color={`#${Number(x.color).toString(16)}`} data-value={x.id} data-li={x.name} key={x.id}>{x.name}</span>)}
                                </div>
                        </div>
                    </div> */}

                    <div className="page-title">
                        <br />
                        <h2><strong><i className="fas fa-hammer"></i> MODERAÇÃO</strong></h2>
                    </div>

                    <br />
                    <div className="card">
                        <div className="card-title">
                            <h3><strong><i className="fas fa-cog"></i> GERAL</strong></h3>
                        </div>
                        <div className="card-content">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore delectus alias laudantium odio eum, aspernatur amet provident, soluta quis doloribus quibusdam assumenda commodi dolor et vel. Sed dolore maiores cum dolorum odio earum, pariatur eum placeat! Aspernatur, cupiditate eius ducimus, eveniet, obcaecati deserunt magni possimus libero optio consectetur nulla iste.
                        </div>
                    </div>
                </div>
            </main>

            <Script
                src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                onLoad={() => {
                    $(".select").hover(function() {
                        const menuID = this.id
                        const menu = $(this)
                        menu.addClass("open")
                    
                        menu.find(".custom-options").find("span").each(function() {
                            const option = $(this)
                    
                            option.click(function() {
                                const o = $(this)
                                menu.find(".custom-options span.selected").map(function() {
                                    const op = $(this)
                                    op.removeClass("selected")
                                })
                                if(!o.hasClass("selected")) {
                                    o.addClass("selected")
                                    menu.find("div.select__trigger p").text(o.attr("data-li") || o.text())
                                }
                            })
                        })
                        menu.find("input").keyup(function() {
                            const value = String($(this).val() || "")
                            menu.find("span").each(function(i, x) {
                                const option = $(this)
                                
                                if((option.text() || "").indexOf(value) > -1 || (option.attr('data-value') || "") == value) {
                                    $(this).show();
                                } else {
                                    $(this).hide();
                                }
                            });
                        })
                    }, function() {
                        const menu = $(this)
                        menu.find("input").val("")
                        menu.removeClass("open")
                        menu.find("span").each(function(i, x) {
                            const option = $(this).show()
                        })
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
        }).then(res => res.json());
        
        try {
            const guild = await fetch(`${process.env.BOT_API}`.replace(/\/$/, '') + "/api/guild/" + ctx.query.guild)
            .then(res => res.json()) as APIGuildResponse;

            if(!guild?.data || guild.status == 404) return {
                redirect: {
                    destination: '/invite?guild=' + ctx.query.guild,
                    permanent: false,
                }
            }

            const database = await global.GuildsDB.ref('Servers/869916717122469898').once('value')

            const databaseVal = database.val()
            console.log(databaseVal)

            return {
                props: {
                    token,
                    user,
                    guild: guild.data,
                    database: databaseVal
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