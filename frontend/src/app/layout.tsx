'use client'

import './globals.css'
import Navbar from '@/components/Navigationbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/index'
import { Provider } from 'react-redux';




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-blue-gray-700">
        <Provider store={store}>
        <ToastContainer />
        <Navbar/>
        {children}
        </Provider>
      </body>
    </html>
  )
}