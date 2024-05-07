import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import { AdminPage } from './pages/AdminPage'
import AdminForm from './components/AdminForm/AdminForm'

const App = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin/login" element={<AdminForm />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    )
}

export default App
