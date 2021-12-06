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
    height: 80px;
    position: fixed;
    width: 100%;
    z-index: 1;
	top: 0;
`

const LuaIcon = sty.img`
    width: 4%;
    margin-right: 10px;
    transition: border 0.5s;
    pointer-events: none;
    filter: grayscale(100%);
`

const Username = sty.h1`
    font-size: 1.5em;
    color: #cfcfcf;
    margin-right: 10px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis; 
`

const UserDiscriminator = sty.span`
    font-size: 0.8em;
    font-weight: 500;
    color: #9e9e9e;
`

const CtaMenu = sty.div`
    margin-left: auto;
    display: none;
    align-items: center;
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
    @media (max-width: 980px) {
        display: flex;
    }
`

const Avatar = sty.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
    @media (max-width: 768px) {
        span, h1, img {
            display: none;
        }
    }
`

const AvatarImg = sty.img`
    margin-right: -70px;
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
    user: User | null;
    hasSidebar?: boolean;
}

export default function NavBar({ user, hasSidebar = true }: DataNavBar) {
    return (
        <Header>
            <LuaIcon src={"https://imgur.com/YkjiyCT.png"} />
            {urls.map(url => {
                return (
                    <Link href={url.url} key={url.url}>
                        <Cta>
                            <i className={url.icon}></i>
                            {url.name}
                        </Cta>
                    </Link>
                )
            })}
            
            <UserBox user={user} hasSidebar={!!hasSidebar} />
        </Header>
    )
}

function UserBox({ user, hasSidebar = true }: DataNavBar) {
    if(user) {
        return (
            <>
                <Link href="/dashboard/@me">
                    <Avatar>
                        <Username>{user?.username}<UserDiscriminator>#{user?.discriminator}</UserDiscriminator></Username>
                        <AvatarImg src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` : "https://media.discordapp.net/attachments/880176654801059860/915300231866900530/91ce69b6c7c6ab40b1d35808979394a5.png?width=499&height=499"} alt="avatar" />
                    </Avatar>
                </Link>

                {(() => {
                    if(hasSidebar != false) {
                        return (
                            <CtaMenu id="SidebarBtn" onClick={() => {
                                const sidebar = document.getElementById("Sidebar")
                                sidebar.classList.toggle("open")
                            }}>
                                <i className="fas fa-bars"></i> Menu
                            </CtaMenu>
                        )
                    }
                })()}
            </>
        )
    } else {
        return (
            <Avatar>
                <a href="/api/auth/login">
                    <Cta>
                        <i className="fas fa-sign-in-alt"></i>
                    </Cta>
                </a>
            </Avatar>
        )
    }
}