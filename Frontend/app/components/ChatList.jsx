export default function ChatList() {
    return (
      <div className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="text-lg font-bold mb-4">Chat</h2>
        <ul className="space-y-2">
          {['SparkChat 0', 'SparkChat 1', 'SparkChat 2', 'SparkChat 3'].map((chat, index) => (
            <li key={index} className={`p-4 bg-white rounded-lg ${index === 3 ? 'bg-purple-200' : ''}`}>
              {chat}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  