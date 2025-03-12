import { useState, useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Auth from '../components/Auth'
import Profile from '../components/Profile'

export default function Login() {
  const session = useSession()
  const router = useRouter()

  return (
    <Layout>
      <div className="login-container">
        {!session ? <Auth /> : <Profile session={session} />}
      </div>
      <style jsx>{`
        .login-container {
          padding: 2rem 0;
        }
      `}</style>
    </Layout>
  )
} 