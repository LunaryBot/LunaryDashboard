import React from 'react';
import Link from "next/link";
import { User, GuildData } from "../types"
import { useRouter } from "next/router"

const imgDefault = "https://media.discordapp.net/attachments/880176654801059860/915300231866900530/91ce69b6c7c6ab40b1d35808979394a5.png?width=499&height=499"

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
    guild?: GuildData | null;
    guilds?: GuildData[] | null;
    guildId?: string | null;
    hasDashboard?: boolean;
}

interface SideBarProfileData {
    user: User | null;
    guild?: GuildData | null;
    guilds?: GuildData[] | null;
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
                    {guilds?.filter(x => !!(x.permissions & 8))
                    .sort((a, b) => a.name.localeCompare(b.name)).map((guild: GuildData) => {
                        return (
                            <Link href={`/dashboard/guilds/${guild.id}/moderation`} key={guild.id}>
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