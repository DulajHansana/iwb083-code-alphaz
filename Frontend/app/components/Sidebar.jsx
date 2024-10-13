export default function Sidebar() {
    return (
      <div className="w-16 bg-purple-600 h-screen flex flex-col items-center p-4 space-y-4">
        {/* Profile Icon */}
        <div className="bg-white p-4 rounded-full">
          <span className="text-2xl">😊</span>
        </div>
        {/* Other icons */}
        <div className="bg-purple-400 p-2 rounded-lg">
          <span className="text-white text-xl">E</span>
        </div>
        <div className="bg-blue-500 p-2 rounded-lg">
          <span className="text-white">🔍</span>
        </div>
      </div>
    );
  }
  