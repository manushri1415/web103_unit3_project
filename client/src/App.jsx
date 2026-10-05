import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:slug',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Events />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <Link className='brand-link' to='/'>
          <h1>UnityGrid Plaza</h1>
        </Link>

        <nav className='header-buttons' aria-label='Main navigation'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </nav>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
