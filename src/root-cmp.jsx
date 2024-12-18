import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next' // Import I18nextProvider
import i18n from './i13n.js'

import {store} from './store/store.js'

import {AppHeader} from './cmps/AppHeader.jsx'
import {AppFooter} from './cmps/AppFooter.jsx'

import {HomePage} from './pages/HomePage.jsx'
import {AboutUs} from './pages/AboutUs.jsx'
import {Dashboard} from './pages/Dashboard.jsx'
import {UserDetails} from './pages/UserDetails.jsx'

import {ToyIndex} from './pages/ToyIndex.jsx'
import {ToyEdit} from './pages/ToyEdit.jsx'
import {ToyDetails} from './pages/ToyDetails.jsx'
import { LoginPage } from './pages/LoginPage.jsx'

export function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <section className="app">
            <AppHeader />
            <main className="main-layout">
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<AboutUs />} path="/about" />
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<ToyIndex />} path="/toy" />
                <Route element={<ToyEdit />} path="/toy/edit" />
                <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                <Route element={<ToyDetails />} path="/toy/:toyId" />
                <Route element={<UserDetails />} path="/user/:userId" />
              </Routes>
            </main>
            <AppFooter />
          </section>
        </Router>
      </I18nextProvider>
    </Provider>
  )
}
