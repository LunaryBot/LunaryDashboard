import _commands from '../json/commands.json';
import { parseCookies } from 'nookies';
import { URLS, User } from '../types';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import Script from 'next/script';

const { commands } = _commands;

const constants = {
    "userID": "822470491574763580",
    "user-tag": "Pinho#1856",
    "@user": "@Pinho",
    "reason": "Regra 13: É biscoito, bobo",
    "notify-dm": "False",
    "time": "1h30m",
    "amountClear": "132",
    "amount": "3",
    "id": "mhjr44cg-f1yu-0o2d-8wxq-m3n56kbgwp",
    "newreason": "É biscoito, bobinho",
    "channel": "#general"
}
  
const categorys = {
    "moderation": {
        name: "Moderação",
        color: "#ff7373",
    },
    "administration": {
        name: "Administração",
        color: '#fcb75c',
    },
    "utilities": {
        name: "Utilitarios",
        color: "#fd87b0"
    },
    "bot": {
        name: "Luny",
        color: "#A020F0"
    },
    "owner": {
        name: "Owner",
        color: "#c07aec"
    }
}

function replaceUsage(string) {
    console.log(string)
    if(string) {
      Object.entries(constants).forEach(([key, value]) => {
        string = string.replace(new RegExp(`{${key}}`, 'g'), value);
      });
    }
  
    return string;
}

export default function Commands({ token, user }: { token?: string|null; user?: User|null }) {
    const { query: { category, s: search } } = useRouter();
    return (
        <>
            <main>
                <NavBar user={user} hasSidebar={false} />

                <br />
                <br />
                <br />
                <div className="content-commands">
                    <div className="content-commands-container">
                    <div className="content-commands-column-1">
                            <p>
                                Os comandos marcados com tags <kbd className="code-style-inline-blue">Azuis</kbd> requerem a respectiva permissão do Discord que ele destaca.<br />
                                Os comandos marcados com tags <kbd className="code-style-inline-purple">Roxas</kbd> requerem a respectiva permissão do SPA(Sistema de Permissões Avançadas) que ele destaca.<br />
                                Os comandos marcados com tags <kbd className="code-style-inline-red">Vermelhas</kbd> requerem que eu tenha respectiva permissão do Discord que ele destaca.<br />
                                Os comandos marcados com a tag <kbd className="code-style-inline-green">Everyone</kbd> não requerem nenhuma permissão.
                            </p>
                    </div>
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="content-commands-column-2">
                            <div className="content-commands-column-2-left">
                            <h1>Grupos</h1>
                            <div className="content-commands-expand">
                                <p> Mostrar / Esconder todos </p>
                                <div className="switch">
                                <input type="checkbox" className="checkbox-expand" />
                                <span className="slider"></span>
                                </div>
                            </div>
                            <ul className="qa-menu-list">
                                {Object.entries(categorys).map(([key, {name}]) => {
                                    return (
                                        <li data-li={key} className={`col-2-btn ${category == key ? "active" : ""}`} key={key}>{name}</li>
                                    )
                                })}
                            </ul>
                            </div>
                            <div className="content-commands-column-2-right">
                            <div className="commands-search">
                                <input className="search-box" type="text" name="command" required />
                                <label htmlFor="search" className="search-label">
                                <span className="content-search"> Pesquisar </span>
                                </label>
                            </div>
                            <div className="commands" id="commands-list">
                                <div className="commands-still-loading"></div>
                                <div className="commands-loading-failed">
                                <h1>Error: Unable to Load Commands</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </main>
            <Script
                src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                onLoad={() => {
                    try {
                        const $commands = $('#commands-list');

                        commands.forEach((command: any) => {
                            $commands.append(`
                            <div class="command ${command.group}" name="${command.name}">
                            <div class="command-heading">
                            <div class="group-icon group-for-${command.name.replace(/ +/g, "_")}" style="background-color: ${categorys[command.group]?.color || '#a020f0'}">
                                <strong>${categorys[command.group]?.name || 'No group'}</strong>
                            </div>
                            <div class="command-heading-left">
                                <div class="arrow-icon">
                                <svg aria-hidden="true" role="img" viewBox="0 0 320 512" class="icon-expand">
                                    <path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                                </svg>
                                </div> <h1> ${command.name} </h1>
                            </div>
                            </div>
                            <div class="command-details ${command.name.replace(/ +/g, "_")}-1">
                            <p>
                                ${String(command.description).replace(/<:\w{1,}:\d{17,19}>/g,'').replace(/\[([^\]]+)\]\(([^\)]+)\)/,'<a href="$2">$1</a>').replace(/\`(\w{1,})\`/g,'<code>$1</code>')||'No description'}<br>
                                ${command.dm?' <span class="code-style-inline-red">Bloqueado em DM</span> ':""}
                                ${command.ownerOnly ?' <span class="code-style-inline-red">Owner</span> ':''}
                                ${command.userDiscordPermissions?.map(x=>{
                                return `<span class="code-style-inline-blue">${x.split('_').map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join(' ')}</span>`}).join(' ')||(command.ownerOnly?'':' <span class="code-style-inline-green">Everyone</span> ')}
                                ${command.botUserPermissions?.map(x=>{
                                return `<span class="code-style-inline-purple">${x.split('_').map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join(' ')}</span>`}).join(' ') || ""}
                                ${command.lunyDiscordPermissions?.map(x=>{
                                return `<span class="code-style-inline-red">${x.split('_').map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join(' ')}</span>`}).join(' ') || ""}
                                <br><br><br>
                                Exemplos/s:<br>
                                ${command.examples ? 
                                Array.isArray(command.examples) ? command.examples.map(x=> x.name || x.title ? '<strong>' + (x.name || x.title) + '</strong>' + '<br><code>/' + command.name + ' ' + replaceUsage(x.usage) + '</code>' : '<br><code>/' + command.name + ' ' + replaceUsage(x) + '</code>').join('<br>') : replaceUsage(command.examples)
                                : '<code>/' + command.name + '</code>'
                                }
                            </p>
                            </div>
                            </div>
                            `);
                        })

                        $('.commands-still-loading').hide();
                        if(categorys[category as string]) { 
                            $('.command').hide();
                            $(`.command.${category}`).show() 
                        }
                        $('.Moderação').show();
                        $('.command-details').hide();
                        $('.clock-icon').hide()

                        $(".col-2-btn").click(function() {
                            $('.col-2-btn').removeClass('active');
                            $(this).addClass('active');
                            $(".search-box").val('');
                            const attr = $(this).attr('data-li');
                            $('.command').hide();
                            $(`.${attr}`).show();
                        });

                        $('.checkbox-expand').click(function(){
                            if($('.checkbox-expand').is(':checked')) {
                                $('.command-details').slideDown(300);
                                $('.clock-icon').show();
                            } else {
                                $('.command-details').slideUp(300);
                                $('.clock-icon').hide();
                            }
                        })

                        $('.command').click(function() {
                            const attr = $(this).attr('name').replace(/ +/g, "_");
                            console.log(attr)
                            $(`.clock-for-${attr}`).toggle(300);
                            $(`.${attr}-1`).slideToggle(300);
                        })
                    } catch (err) {
                        console.log(err);
                        $('.commands-still-loading').hide();
                        $('#commands-list').hide();
                        $('.commands-loading-failed').show();
                    }

                    if(search) {
                        (function() {
                            $(".search-box").val(search);
                            const value = String(search).toLowerCase().trim();
                            if(!value) {
                                const attr = $('.col-2-btn.active').attr('data-li');
                                $('.command').hide();
                                $(`.${attr}`).show();
                                return;
                            };

                            const commandsDiv = $(".commands div") as any;
                            commandsDiv.filter(function(_,el) {
                                if(!$(el).hasClass('command')) { return; };
                                $(this).toggle($(this).attr('name').toLowerCase().trim().indexOf(value)>-1)
                            });
                        })()
                    }

                    $(".search-box").on("keyup", function(){
                        const value = String($(this).val()).toLowerCase().trim();
                        if(!value) {
                            const attr = $('.col-2-btn.active').attr('data-li');
                            $('.command').hide();
                            $(`.${attr}`).show();
                            return;
                        };

                        const commandsDiv = $(".commands div") as any;
                        commandsDiv.filter(function(_,el) {
                            if(!$(el).hasClass('command')) { return; };
                            $(this).toggle($(this).attr('name').toLowerCase().trim().indexOf(value)>-1)
                        });
                    });
                }}
            >

            </Script>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const { ['lunarydash.token']: token } = parseCookies(ctx)

    if(token) {
        try {
            const user = await fetch(URLS.USER, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => res.json());
        
            return {
                props: {
                    token,
                    user
                }
            }
        } catch(e) {}
    }

    return {
        props: {}
    }
}