'use client'
import { Inter } from "next/font/google";
import "./globals.css";

import { usePathname } from 'next/navigation';




export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav className="bg-blue-600 p-16">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">Patient Vitals</div>
          <div>
          
          
          {pathname === "/view" && 
          <>
          <a href="/create" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Create</a>          
          <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Logout</a>
          
          </>
          
          }
          {pathname === "/create" && 
          <>
          
          <a href="/view" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">View</a>
          <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Logout</a>
          
          </>
          
          } 
          
           
          </div>
        </div>
      </nav>
        {children}
        
        </body>
    </html>
  );
}
