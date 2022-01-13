import sty from "styled-components"
import { User } from "../types"
import { useRouter } from "next/router"
import Link from "next/link"

const urls = [
    {
        name: "Comandos",
        url: "/commands",
        icon: "fas fa-project-diagram"
    },
    {
        name: "Invite",
        url: "/invite",
        icon: "fas fa-plus"
    },
    {
        name: "Vote",
        url: "/vote",
        icon: "fas fa-star"
    }
]

interface DataNavBar {
    user: User | null;
    hasSidebar?: boolean;
}

export default function NavBar({ user, hasSidebar = true }: DataNavBar) {
    return (
        <header>
            <img className={"icon"} src={"https://imgur.com/YkjiyCT.png"} />
            {urls.map(url => {
                return (
                    <Link href={url.url} key={url.url}>
                        <div className={`Cta ${url.url == "/invite" ? "CtaInvite" : ""}`}>
                            <i className={url.icon}></i>
                            {url.name}
                        </div>
                    </Link>
                )
            })}
            {(() => {
                if(hasSidebar != false) {
                    return (
                        <div className={"CtaMenu"} id="SidebarBtn" onClick={() => {
                            const sidebar = document.getElementById("Sidebar")
                            sidebar.classList.toggle("open")
                        }}>
                            <i className="fas fa-bars"></i> Menu
                        </div>
                    )
                }
            })()}
            
            <UserBox user={user} hasSidebar={!!hasSidebar} />
        </header>
    )
}

function UserBox({ user, hasSidebar = true }: DataNavBar) {
    if(user) {
        return (
            <>
                <div className={"avatar"}>
                    <h1>{user?.username}<span>#{user?.discriminator}</span></h1>
                    <img src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` : "https://media.discordapp.net/attachments/880176654801059860/915300231866900530/91ce69b6c7c6ab40b1d35808979394a5.png?width=128&height=128"} alt="avatar" />
                    <div className={"user-menu-wrapper"}>
                        <div className={"user-menu"}>
                            <div className={"user-menu-options"}>
                                <Link href={"/dashboard/@me"}>
                                    <div style={{marginTop: "0"}}>
                                        <i className={"fas fa-tools"}></i>
                                        Dashboard
                                    </div>
                                </Link>
                                <Link href={"/commands"}>
                                    <div>
                                        <i className={"fas fa-project-diagram"}></i>
                                        Comandos
                                    </div>
                                </Link>
                                <Link href={"/api/auth/logout"}>
                                    <div>
                                        <i className={"fas fa-sign-out-alt"} style={{color: "#FF6347"}}></i>
                                        Logout
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className={"avatar"}>
                <a href="/api/auth/login">
                    <div className={"Cta"} id={"CtaLogin"}>
                        <i className="fas fa-sign-in-alt"></i>
                    </div>
                </a>
            </div>
        )
    }
}