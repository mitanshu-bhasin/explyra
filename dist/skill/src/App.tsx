import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AuthLayout from './components/layout/AuthLayout'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OnboardingContainer from './pages/onboarding/OnboardingContainer'
import SkillFeed from './pages/SkillFeed'
import Marketplace from './pages/Marketplace'
import UserProfile from './pages/UserProfile'
import AddListing from './pages/AddListing'
import ListingDetail from './pages/ListingDetail'
import Settings from './pages/Settings'
import NotificationsPage from './pages/NotificationsPage'
import FollowList from './pages/FollowList'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/feed' replace />} />

          {/* Auth Flow */}
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          {/* Onboarding Flow */}
          <Route path='/onboarding' element={<OnboardingContainer />} />

          {/* Main Application Flow */}
          <Route element={<MainLayout />}>
            <Route path='/feed' element={<SkillFeed />} />
            <Route path='/marketplace' element={<Marketplace />} />
            <Route path='/marketplace/new' element={<AddListing />} />
            <Route path='/marketplace/:id' element={<ListingDetail />} />
            <Route path='/profile/me' element={<UserProfile />} />
            <Route path='/profile/:username' element={<UserProfile />} />
            <Route path='/notifications' element={<NotificationsPage />} />
            <Route path='/social' element={<FollowList />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
