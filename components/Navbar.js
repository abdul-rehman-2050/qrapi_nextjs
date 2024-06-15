export default function Navbar() {
    return (
      <nav className="bg-blue-600 p-16">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">Patient Vitals</div>
          <div>
            <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Home</a>
            <a href="/view" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">View</a>
           
          </div>
        </div>
      </nav>
    );
  }
  