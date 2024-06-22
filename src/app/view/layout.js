
import { Inter } from "next/font/google";
import "../globals.css";




const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  
  return (
    <>
      <nav className="bg-blue-600 p-16">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">Patient Vitals</div>
          <div>
          
          
  
          <>
          
          <a href="/create" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Add New</a>
          <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Logout</a>
          
          </>
          
  
          
           
          </div>
        </div>
      </nav>
      {children}
      </>          
  );
}
