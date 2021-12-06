import React, { useEffect, useState } from 'react';
import sty from "styled-components";
import Link from "next/link";
import { User, Guild } from "../types"
import { useRouter } from "next/router"

const imgDefault = "https://media.discordapp.net/attachments/880176654801059860/915300231866900530/91ce69b6c7c6ab40b1d35808979394a5.png?width=499&height=499"

const Cta = sty.div`
    margin-top: 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    color: #edf0f1;
    text-decoration: none;
    padding: 9px 25px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
        margin-left: 10px;
    }
    i {
        margin-right: 5px;
    }
    i.selected {
        color: #A020F0;
    }
    &#cta-invite {
        padding: 9px 17px;
    }
`

const SelectGuildWrapper = sty.div`
    position: relative;
    user-select: none;
    width: 100%;
`

const SelectGuild = sty.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-width: 0 0 0 0;
    border-style: solid;
    &.open {
        background-color: #ffffff30;
    }
    &.open div {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
    }
`

const SelectGuildOptions = sty.div`
    position: absolute;
    display: block;
    top: 100%;
    left: 0;
    right: 0;
    transition: all 0.5s;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 12;
    max-height: 200px;
    overflow-y: scroll;
    background-color: #151516;
    padding: 5px;
    border-radius: 5px;
    &::-webkit-scrollbar {
        width: 0em;
    }
      
    &::-webkit-scrollbar-track {
        background: #ffffff00;
        box-shadow: inset 0 0 6px #ffffff00;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #ffffff00;
        border-radius: 0em;
    }
    #cta-invite:hover i {
        color: #A020F0;
    }
`

const GuildCard = sty.div`
    color: #ffffff;
    width: 100%;
    margin: auto;
    display: flex;
    border-radius: 5px;
    cursor: pointer;
    vertical-align: middle;
    &:hover {
        background-color: #ffffff30;
    }
    &.selected {
        background-color: #ffffff30;
        color: #A020F0;
    }
`

const GuildIcon = sty.img`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-top: 4px;
    margin-bottom: 4px;
    border-radius: 50%;
`

const GuildName = sty.div`
    font-size: 13px;
    margin-left: 20px;
    margin-top: 10px;
    font-weight: 700;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`

const _urls = {
    guild: [
        {
            name: "Home",
            url: "/",
            icon: "fas fa-home"
        }
    ],
    user: [
        {
            name: "Home",
            url: "/dashboard/@me",
            icon: "fas fa-home"
        },
        {
            name: " Servidores",
            url: "/dashboard/guilds",
            icon: "fad fa-grip-vertical"
        }
    ]
}

const urlsDefault = [
    {
        name: "Home",
        url: "/",
        icon: "fas fa-home"
    },
    {
        name: "Invite",
        url: "/invite",
        icon: "fas fa-plus"
    }
]

interface SideBarData {
    user: User | null;
    guild?: Guild | null;
    guilds?: Guild[] | null;
    guildId?: string | null;
    hasDashboard?: boolean;
}

interface SideBarProfileData {
    user: User | null;
    guild?: Guild | null;
    guilds?: Guild[] | null;
}

export default function SideBar({ user, guild, guilds, hasDashboard = true }: SideBarData) {
    const router = useRouter()
    const urls = hasDashboard ? _urls[guild ? "guild" : "user"] : urlsDefault

    return (
        <>
            <div className={"sidebar"} id="Sidebar">
                <br />

                {(() => {
                    if(hasDashboard) return (
                        <Profile user={user} guilds={guilds} guild={guild} />
                    )
                })()}

                {urls.map((url: {
                    name: string;
                    url: string;
                    icon: string;
                }) => {
                    return (
                        <Link href={url.url} key={url.url}>
                            <div className={"Cta"}>
                                <i className={`${url.icon} ${router.pathname == url.url ? "selected" : ""}`}></i>
                                {url.name}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    );
};

function Profile({ user, guilds, guild }: SideBarProfileData) {
    return (
        <div className={"select-guild-wrapper"}>
            <div className={"select-guild"} id={"SelectGuildSideBar"} onClick={() => {
                const select = document.getElementById("SelectGuildSideBar")

                select.classList.toggle("open")
            }}>
                <div className={"guild-card"}>
                    <div className="sidebar-header">
                        <div className={"user-pic"}>
                                <img src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` : imgDefault} />
                        </div>
                        <div className={"user-info"}>
                            <h1 className={"user-name"}>{user?.username}</h1>
                            <span className={"user-id"}>{user?.id}</span>
                        </div>
                    </div>
                </div>

                <div className={"select-guild-options"}>
                    <Link href={`/dashboard/@me`} key={user?.id}>
                        <div className={`guild-card ${!guild ? "selected" : ""}`}>
                            <img src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` : imgDefault} />
                            <span>{user?.username}</span>
                        </div>
                    </Link>
                    <hr />
                    {guilds && guilds.sort((a, b) => a.name.localeCompare(b.name)).map((guild: Guild) => {
                        return (
                            <Link href={`/dashboard/guild/${guild.id}`} key={guild.id}>
                                <div className={"guild-card"}>
                                    <img src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : imgDefault} />
                                    <span>{guild.name}</span>
                                </div>
                            </Link>
                        )
                    })}
                    <hr />
                    <Link href={`/invite`} key={`invite`}>
                        <div className={"Cta"} id={"cta-invite"}>
                            <i className={`fas fa-plus`}></i>
                            Invite
                        </div>
                    </Link>
                </div> 
            </div>
        </div>
    )
}