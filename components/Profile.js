import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Profile({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    if (session) {
      getProfile()
    }
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const { user } = session

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      console.log('Error loading user data!', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username }) {
    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      console.log('Error updating profile!', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-form">
      <h2>Profile</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => updateProfile({ username })}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </div>
      <div>
        <button onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      <style jsx>{`
        .profile-form {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5e6c3;
          border-radius: 8px;
          font-family: 'Courier New', Courier, monospace;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #654321;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
          font-family: 'Courier New', Courier, monospace;
        }
        button:hover {
          background-color: #543210;
        }
      `}</style>
    </div>
  )
} 