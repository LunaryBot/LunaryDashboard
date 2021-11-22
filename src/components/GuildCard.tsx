import sty from "styled-components";
import { Guild } from "../types";
import Link from "next/link";

const GuildCard = sty.div`
    width: 94%;
    heigth: 150px;
    background-color: #2f3136;
    margin: auto;
    margin-top: 10px;
    display: flex;
    border-radius: 5px;
`

const GuildIcon = sty.img`
    width: 50px;
    height: 50px;
    margin-left: 10px;
    margin-top: 4px;
    margin-bottom: 4px;
    border-radius: 25%;
`

const GuildName = sty.div`
    color: #ffffff;
    font-size: 17px;
    margin-left: 13px;
    margin-top: 20px;
    font-family: "Montserrat", cursive ,sans-serif;
    font-weight: 500;
`

const GuildButton = sty.div`
    margin-left: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 10px;
    width: 100px;
    height: 40px;
    background-color: #7c19be;
    color: #ffffff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    i {
        margin-right: 5px;
    }
    &:hover {
        background-color: #ffffff;
        color: black;
    }
`

export default function _GuildCard({ guild }: { guild: Guild }) {
    return (
        <GuildCard>
            <GuildIcon src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "https://cdn.discordapp.com/emojis/821939251243122719.png?size=128"} />
            <GuildName>{guild.name}</GuildName>
            <Link href={`/dashboard/guild/${guild.id}`}><GuildButton><i className={"fas fa-wrench"}></i> Manage</GuildButton></Link>
        </GuildCard>
    )
}