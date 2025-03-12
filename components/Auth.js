import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setMessage('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="toggle-auth">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
      <style jsx>{`
        .auth-form {
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
          font-family: 'Courier New', Courier, monospace;
        }
        button:hover {
          background-color: #543210;
        }
        .message {
          margin-top: 15px;
          color: #ff6b6b;
          text-align: center;
        }
        .toggle-auth {
          margin-top: 15px;
          text-align: center;
        }
        .toggle-auth button {
          background: none;
          color: #654321;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          text-decoration: underline;
          width: auto;
        }
      `}</style>
    </div>
  )
} 