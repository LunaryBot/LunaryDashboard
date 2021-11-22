import React, { useEffect, useState  } from 'react';
import { parseCookies } from 'nookies';
import { Guild, URLS, User } from '../../types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import _GuildCard from '../../components/GuildCard';

export default function DashboardUser({ token }) {
  const [user, setUser] = useState<User | null | any>(null);

  useEffect(() => {
    (async() => {
      if(user) setUser(user)
      else {
        const res = await axios.get(URLS.USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        console.log("fetch")
        setUser(data);
      }
    })()
  }, [user])

  const [guilds, setGuilds] = useState<Guild[] | null | any>(null);

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
        console.log("fetch guilds")
        console.log(data)
        setGuilds(data);
      }
    })()
  }, [guilds])
  
  return (
    <main>
      <NavBar user={user} />
      {guilds?.map((guild: Guild) => {
        return (
          <_GuildCard key={guild.id} guild={guild} />
        )
      })}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { ['lunarydash.token']: token } = parseCookies(ctx)
  
  if(!token) return {
    redirect: {
      destination: '/api/auth/login',
      permanent: false
    }
  }

  return {
    props: {
      token
    }
  }
}