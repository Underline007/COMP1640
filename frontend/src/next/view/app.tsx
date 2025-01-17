import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import CategoryManager from './categories'
// import './index.css'
import { Layout, message } from 'antd'
import AccountManager from './accounts-manager'
import Login from './auth/login'
import Dashboard from './dashboard'
import DepartmentManager from './departments'
import EventsPage from './events'
import HomePage from './home-page'
import CreateIdea from './ideas/create-new-idea'
import AppHeader from './layout/header'
import LayoutWrapper from './layout/layout-wrapper'
import UserProfile from './user-profile'
import { Http, LOCALSTORAGE } from '../api/http'
import { userCredential, userStore } from './auth/user-store'
import { useAuth } from '../hooks/auth-hook'
import IdeaDetail from './ideas/idea-detail/idea-detail'
import EventDetail from './events/event-detail'

const App = () => {
  const navigate = useNavigate()
  const { login, logout, token, tokenVerified, userId } = useAuth()
  const [verify, setVerify] = useState(false)

  useEffect(() => {
    userCredential.updateState({
      userId: userId,
      isLoggedIn: tokenVerified,
      token: token,
      login: login,
      logout: logout,
    })
  })
  
  useEffect(() => {
    const credential = JSON.parse(localStorage.getItem(LOCALSTORAGE.CREDENTIALS))
    if(credential) {
      if (credential?.token === '' || !credential?.token) {
        navigate('/login')
        return message.info('You need to login to access this application!')
      } else {
        if (credential.tokenVerified === true) {
          setVerify(credential.tokenVerified)
          userCredential.updateState({
            userId: credential.userId,
            isLoggedIn: credential.tokenVerified,
            token: credential.token,
          })
        } else {
          navigate('/login')
          return message.info('You need to login to access this application!')
        }
      }
    }
    else {
      navigate('/login')
      return message.info('You need to login to access this application!')
    }
  }, [])

  useEffect(() => {
    // const { state, setState } = useSubscription(userStore);
    const user = localStorage.getItem(LOCALSTORAGE.USER)
    if (user) {
      // dispatch(user);
      userStore.updateState(JSON.parse(user))
    }
  }, [])

  let routes: any

  if (verify) {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" />
        <Route
          path="/"
          element={
            <Layout>
              <AppHeader />
              <LayoutWrapper>
                <Outlet />
              </LayoutWrapper>
            </Layout>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event" element={<EventsPage />} />
          <Route path="/departments" element={<DepartmentManager />} />
          <Route path="/categories" element={<CategoryManager />} />
          <Route path="/accounts-manager" element={<AccountManager />} />
          <Route path="/ideas" element={<UserProfile />} />
          <Route path="/account" element={<UserProfile />} />
          <Route path="/submit" element={<CreateIdea />} />
          <Route path="/idea" element={<IdeaDetail />} />
          
        </Route>
        <Route path="/eventdetail" element={<EventDetail/>} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    // <Router>
    <>{routes}</>
    // </Router>
  )
}

export default App
