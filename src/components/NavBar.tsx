import sty from "styled-components"
import { User } from "../types"
import { useRouter } from "next/router"
import Link from "next/link"

const Header = sty.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 7px 20px;
    background-color: #24252a;
    transition-duration: 0.5s;
`

const Username = sty.h1`
    font-size: 1.5em;
    color: #cfcfcf;
    margin-right: 10px;
`

const UserDiscriminator = sty.span`
    font-size: 0.8em;
    font-weight: 500;
    color: #9e9e9e;
`

const Avatar = sty.div`
    margin-left: auto;
    display: flex;
    align-items: center;
`

const AvatarImg = sty.img`
    border-radius: 50%;
    width: 10%;
    min-width: 60px;
    opacity: 50%;
    border: 2px solid #00000000;
    transition: border 0.5s;
    &:hover {
        opacity: 100%;
        border: 2px solid #A020F0;
        transition: border 0.5s;
    }
`

const Cta = sty.div`
    margin-left: 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    color: #edf0f1;
    text-decoration: none;
    padding: 9px 25px;
    background-color: #141414;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
        color: #141414;
        background-color: #fafafa;
    }

    i {
        margin-right: 5px;
    }
`

const urls = [
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

interface DataNavBar {
    user: User;
}

export default function NavBar({ user }: DataNavBar) {
    const router = useRouter()
    
    return (
        <Header>
            {urls.map(url => {
                return (
                    <Link href={url.url}>
                        <Cta>
                            <i className={url.icon}></i>
                            {url.name}
                        </Cta>
                    </Link>
                )
            })}
            <Avatar>
                <Username>{user?.username}<UserDiscriminator>#{user?.discriminator}</UserDiscriminator></Username>
                <AvatarImg src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} alt="avatar" />
            </Avatar>
        </Header>
    )
}