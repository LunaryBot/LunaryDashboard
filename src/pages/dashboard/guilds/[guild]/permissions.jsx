import NavBar from '../../../../components/NavBar';
import SideBar from '../../../../components/SideBar';
import LoadingDots from '../../../../components/LoadingDots';
import { GetServerSideProps } from 'next';

export default function Permissions() {
    return (
        <>
            <main>
                <div id="overlay-save-error">
                    <img src="https://cdn.discordapp.com/emojis/849302611744129084.png?v=1" alt="Salvando..." />
                    <p>Houve um erro ao entrar em contato com o servidor!</p>
                </div>

                <NavBar user={user} />
                <SideBar user={user} guilds={guilds} guild={guild} />
            </main>
        </>
    );
}