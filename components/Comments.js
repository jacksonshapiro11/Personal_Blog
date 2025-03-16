import { useState, useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Comments({ postId, postType }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  console.log('Session status:', session ? 'Authenticated' : 'Not authenticated')
  if (session) {
    console.log('User ID:', session.user.id)
    console.log('Access Token:', session.access_token ? 'Present' : 'Missing')
  }

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, postType])

  async function fetchComments() {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('comments')
        .select('*, profiles(username)')
        .eq('post_id', postId)
        .eq('post_type', postType)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  async function addComment() {
    if (!session) {
      router.push('/login')
      return
    }

    console.log('Current auth state:', await supabase.auth.getSession())

    // Log the exact user ID
    console.log('User ID type:', typeof session.user.id)
    console.log('User ID value:', session.user.id)

    if (!newComment.trim()) return

    try {
      setSubmitting(true)
      console.log('Adding comment with data:', {
        post_id: postId,
        post_type: postType,
        content: newComment,
        rating,
        user_id: session.user.id
      })
      
      const { data, error } = await supabase.from('comments').insert({
        post_id: postId,
        post_type: postType,
        content: newComment,
        rating,
        user_id: session.user.id
      }).select()
      
      if (error) {
        console.error('Supabase error details:', error)
        throw error
      }
      
      console.log('Comment added successfully:', data)
      setNewComment('')
      fetchComments()
    } catch (error) {
      console.error('Error adding comment:', error.message)
      setErrorMessage(`Failed to add comment: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      
      {session && (
        <div className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
            rows={4}
          />
          <div className="rating-container">
            <span>Rating: </span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={star <= rating ? 'star active' : 'star'}
                onClick={() => setRating(star)}
                type="button"
              >
                ★
              </button>
            ))}
          </div>
          <button 
            onClick={addComment}
            disabled={submitting || !newComment.trim()}
            className="submit-button"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      )}
      
      {!session && (
        <p className="login-prompt">
          <button onClick={() => router.push('/login')} className="login-button">
            Sign in
          </button> 
          to leave a comment
        </p>
      )}
      
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="username">{comment.profiles?.username || 'Anonymous'}</span>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < comment.rating ? 'star-filled' : 'star-empty'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-date">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-comments">No comments yet. Be the first to comment!</p>
      )}
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <button onClick={() => setErrorMessage(null)} className="dismiss-button">✕</button>
        </div>
      )}
      
      <style jsx>{`
        .comments-container {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(101, 67, 33, 0.2);
          font-family: 'Courier New', Courier, monospace;
        }
        h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        .comment-form {
          margin-bottom: 2rem;
        }
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          background-color: rgba(255, 255, 255, 0.7);
          resize: vertical;
        }
        .rating-container {
          margin: 12px 0;
          font-size: 1.2rem;
        }
        .star {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #ccc;
          cursor: pointer;
          padding: 0 2px;
        }
        .star.active {
          color: #ffd700;
        }
        .submit-button {
          padding: 10px 20px;
          background-color: #654321;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Courier New', Courier, monospace;
        }
        .submit-button:hover:not(:disabled) {
          background-color: #543210;
        }
        .submit-button:disabled {
          background-color: #a9a9a9;
          cursor: not-allowed;
        }
        .login-prompt {
          margin-bottom: 2rem;
          font-style: italic;
        }
        .login-button {
          background: none;
          color: #654321;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          font-family: 'Courier New', Courier, monospace;
          padding: 0;
        }
        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .comment {
          padding: 15px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          border-left: 3px solid #654321;
        }
        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .username {
          font-weight: bold;
          color: #654321;
        }
        .rating {
          display: flex;
        }
        .star-filled {
          color: #ffd700;
        }
        .star-empty {
          color: #ccc;
        }
        .comment-content {
          margin-bottom: 10px;
          white-space: pre-wrap;
        }
        .comment-date {
          font-size: 0.8rem;
          color: #777;
          text-align: right;
          font-style: italic;
        }
        .no-comments {
          font-style: italic;
          color: #777;
        }
        .error-message {
          padding: 10px 15px;
          margin: 15px 0;
          background-color: #ffeeee;
          border-left: 4px solid #ff6b6b;
          color: #d32f2f;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dismiss-button {
          background: none;
          border: none;
          color: #d32f2f;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0 5px;
        }
      `}</style>
    </div>
  )
} 