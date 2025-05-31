import React from 'react'
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-extrabold text-pink-600 mb-8">TalkLine</h1>

      <div className="flex flex-col md:flex-row items-center md:justify-around max-w-5xl w-full gap-8">
        <img src="/Group-chats-be-like--unscreen.gif" alt="Chat Animation" className="w-[600px] h-auto object-contain rounded-xl "/>

        <div className="max-w-xl text-gray-700 text-left">
<p className="text-lg mb-6">
Welcome to <strong>TalkLine</strong> — your modern and elegant chat platform built for seamless conversations. Connect, express, and engage with ease.
</p>
<button onClick={() => navigate("/signup")} className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold px-6 py-3 rounded-full transition shadow-md">Start Chatting</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
