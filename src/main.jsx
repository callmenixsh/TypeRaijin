import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomeScreen from './Component/HomePage/HomeScreen.jsx'
import GameScreen from './Component/GameScreen/GameScreen.jsx'
import QuitConfirm from './Component/GameScreen/QuitConfirm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <QuitConfirm />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/gamescreen',
    element: <GameScreen />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
