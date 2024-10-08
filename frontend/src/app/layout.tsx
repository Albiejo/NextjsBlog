import './globals.css'
import Navbar from '@/components/Navigationbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: "Dave's Blog",
  description: 'Created by Dave Gray',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-blue-gray-700">
        <Navbar/>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}