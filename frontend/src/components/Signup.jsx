import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { updateDBPost } from '../hooks/hook'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const confirmPasswordError = formData.password !== formData.confirmPassword
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, formData)
      console.log(res)
      if(res.status === 201){
      toast.success(res.data.message)
      navigate('/signin')
      }
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    }
    catch(err){
      console.error(err)
      toast.error(err.message || 'Signup failed')
    }
   
  }


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">Get started</p>
          <h1>Create your account</h1>
          <p className="subtitle">Simple sign up for a cleaner chat experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name
            <input
              required
              type="text"
              placeholder="Your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

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
              placeholder="Choose a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label>
            Confirm password
            <input
              required
              type="password"
              placeholder="Re-enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>

          {confirmPasswordError && (
            <p className="passwordError">Passwords do not match.</p>
          )}

          <button type="submit" className="auth-button">Create account</button>
        </form>

        <p className="auth-note">Already have an account? <Link to={'/signin'}>Login</Link> to continue.</p>
      </div>
    </div>
  )
}

export default Signup
