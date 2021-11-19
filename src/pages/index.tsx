import React, { useContext, useEffect, useState  } from 'react';
import { parseCookies } from 'nookies';
import { URLS, User } from '../types';
import { GetServerSideProps } from 'next';
import axios from 'axios';

export default function Home({ token }) {
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
  
  return (
    <main>
      <h1>Hello {user?.username}</h1>
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