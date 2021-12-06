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
                        <div className={"Cta"}>
                            <i className={url.icon}></i>
                            {url.name}
                        </div>
                    </Link>
                )
            })}
            
            <UserBox user={user} hasSidebar={!!hasSidebar} />
        </header>
    )
}

function UserBox({ user, hasSidebar = true }: DataNavBar) {
    if(user) {
        return (
            <>
                <Link href="/dashboard/@me">
                    <div className={"avatar"}>
                        <h1>{user?.username}<span>#{user?.discriminator}</span></h1>
                        <img src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` : "https://media.discordapp.net/attachments/880176654801059860/915300231866900530/91ce69b6c7c6ab40b1d35808979394a5.png?width=499&height=499"} alt="avatar" />
                    </div>
                </Link>

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
            </>
        )
    } else {
        return (
            <div className={"avatar"}>
                <a href="/api/auth/login">
                    <div className={"Cta"}>
                        <i className="fas fa-sign-in-alt"></i>
                    </div>
                </a>
            </div>
        )
    }
}