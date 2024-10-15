export default function ChatList() {
  const chats = [
    { name: 'SparkChat 0', message: 'How are you doing?', avatar: '/images/avatar1.png' },
    { name: 'SparkChat 1', message: 'How are you doing?', avatar: '/images/avatar2.png' },
    { name: 'SparkChat 2', message: 'How are you doing?', avatar: '/images/avatar3.png' },
    { name: 'SparkChat 3', message: 'How are you doing?', avatar: '/images/avatar4.png' }
  ];

  return (
    <div className="w-80 bg-gray-100 h-screen p-4 relative"> {/* Changed width to w-80 */}
      {/* Chat header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-customPurple">Chat</h2>
        {/* Edit icon */}
        <button className="p-2">
          <img src="/images/editing.png" alt="Edit" className="w-5 h-5" />
        </button>
      </div>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />
      </div>

      {/* Chat list */}
      <ul className="space-y-2">
        {chats.map((chat, index) => (
          <li
            key={index}
            className={`flex items-center p-4 rounded-2xl ${index === 3 ? 'bg-purple-200' : 'bg-purple-300'} space-x-4`}
          >
            {/* Avatar */}
            <img
              src={chat.avatar}
              alt={`${chat.name} avatar`}
              className="w-10 h-10 rounded-full"
            />
            {/* Chat details */}
            <div>
              <p className="text-customPurple font-semibold">{chat.name}</p>
              <p className="text-gray-200 text-sm">{chat.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
