import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateDBPost } from '../hooks/hook'
import axios from 'axios'
import { toast } from 'sonner'

const Login = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const[formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if(token){
      navigate('/dashboard')
    }
  }, [token])
  const handleSubmit = async(e) => {
    try{
      e.preventDefault()
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/signin`, formData)
      // console.log(formData)
      toast.success(res.data.status)
      localStorage.setItem('token', res.data.jwtToken)
      navigate('/dashboard')
      setFormData({
        email: '',
        password: ''
      })
    }
    catch(error){
      console.log(error.response.data)
      toast.error(error.response.data.message || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in to ChatZem</h1>
          <p className="subtitle">A calm, modern place to connect with your team.</p>
        </div>

        <form onSubmit = {handleSubmit} className="auth-form">
          <label>
            Email
            <input 
              required 
              type="email" 
              placeholder="you@example.com" 
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input 
              required 
              type="password" 
              placeholder="Enter your password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="auth-button">Log in</button>
        </form>

        <p className="auth-note">Need an account? Create one in the <Link to={'/signup'}>Signup</Link> flow.</p>
      </div>
    </div>
  )
}

export default Login
