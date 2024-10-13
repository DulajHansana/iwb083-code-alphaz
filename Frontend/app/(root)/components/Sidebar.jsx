export default function Sidebar() {
  return (
    <div className="w-24 bg-purple-600 h-screen flex flex-col items-center p-4">
      {/* APP logo without circle, maintaining aspect ratio */}
      <img src="/Images/App Logo.png" alt="App Logo" className="w-10 h-10 object-contain" />
      
      {/* Other icon changed to letter 'E' inside a circle */}
      <div className="bg-purple-400 p-4 rounded-full mt-4 flex items-center justify-center w-10 h-10">
        <span className="text-white text-xl font-bold">E</span>
      </div>
      
      {/* Aligning image at the bottom */}
      <div className="mt-auto flex flex-col items-center">
        {/* Image at the bottom */}
        <div className="bg-blue-500 p-2 rounded-lg">
          <img src="/Images/logout.png" alt="Logout" className="w-6 h-6 object-contain" />
        </div>
        {/* Logout text */}
        <span className="text-white mt-2">Logout</span>
      </div>
    </div>
  );
}
