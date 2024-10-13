export default function ChatInterface() {
  return (
    <div className="w-3/4 p-4 bg-white h-screen"> {/* Adjust the width here */}
      <div className="flex flex-col space-y-2">
        <div className="bg-gray-100 p-4 rounded-lg">
          Hi, Welcome!
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          How are you? All OK?
        </div>
        <div className="bg-purple-200 p-4 rounded-lg self-end">
          HI, ALL OK!!!!
        </div>
      </div>
      <input
        className="mt-4 p-2 w-full border rounded-lg"
        type="text"
        placeholder="Type your message here..."
      />
    </div>
  );
}
