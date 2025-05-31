import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RiColorFilterAiLine } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";

function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [bgColor1, setBgColor1] = useState("#fff0f6");
  const [bgColor2, setBgColor2] = useState("#fff0f6");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("chatUsers") || "[]");
    if (savedUsers.length < 2) {
      navigate("/login");
    } else {
      setUsers(savedUsers);
    }
  }, [navigate]);

  const updateUser = async (userId) => {
    const currentUser = users.find((u) => u.id === userId);
    if (!currentUser) return;

    const result = await Swal.fire({
      title: "Edit Your Profile",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Username" value="${currentUser.username}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Avatar URL" value="${currentUser.avatar}">`,
      focusConfirm: false,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Logout",
      preConfirm: () => {
        return {
          username: document.getElementById("swal-input1").value,
          avatar: document.getElementById("swal-input2").value,
        };
      },
    });

    if (result.isConfirmed) {
 const formValues = result.value;
      if (!formValues.username || !formValues.avatar) {
         Swal.fire({
     icon: "error",
      text: "Username and avatar URL are required" });
        return;
      }
 try {
const response = await axios.put(`https://68219a91259dad2655afc3cc.mockapi.io/api/users/user/${userId}`,
formValues
);
        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? updatedUser : user))
        );
        const updatedUsers = users.map((user) =>
          user.id === userId ? updatedUser : user
        );
localStorage.setItem("chatUsers", JSON.stringify(updatedUsers));
Swal.fire({
title: "Success!",
text: "User updated successfully",
icon: "success",
});
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "Failed to update user",
        });
      }
    } else if (result.isDenied) {
      navigate("/");
    }
  };

  const sendMsg = (senderId, text) => {
    let user = users.find((u) => u.id === senderId);
    let now = new Date().toLocaleTimeString();
    let newMsg = {
      userId: senderId,
      sender: user.username,
      text,
      time: now,
      avatar: user.avatar,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  if (users.length < 2) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-4 bg-pink-100 dark:bg-pink-900 min-h-screen">
      {[0, 1].map((i) => {
        const user = users[i];
        const isUser1 = i === 0;
        const msg = isUser1 ? msg1 : msg2;
        const setMsg = isUser1 ? setMsg1 : setMsg2;
        const bgColor = isUser1 ? bgColor1 : bgColor2;
        const setBgColor = isUser1 ? setBgColor1 : setBgColor2;

        return (
          <div
            key={user.id}
            className="w-full sm:max-w-sm md:max-w-md border-4 border-pink-400 rounded-3xl p-4 flex flex-col"
            style={{ backgroundColor: bgColor }}
          >
            <div className="flex justify-between items-center mb-4">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
                onClick={() => updateUser(user.id)}
                title="Click to edit profile"
              />
              <h2 className="text-xl font-bold text-pink-600 text-center">
                {user.username}'s Chat
              </h2>
              <label className="cursor-pointer flex items-center space-x-1">
                <RiColorFilterAiLine className="text-xl text-pink-600" />
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded-full border hidden"
                />
              </label>
            </div>

<div className="flex-1 overflow-y-auto mb-4 max-h-96 sm:max-h-80">
{messages.length === 0 ? (
<p className="text-center text-gray-500">No messages yet.</p>
) : (
messages.map((chat, index) => {
const isCurrentUser = chat.userId === user.id;
return (
<div key={index} className={`flex items-center mb-3 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
{!isCurrentUser && (
<img src={chat.avatar} alt="Avatar-user" className="w-10 h-10 rounded-full mr-3"/>
)}
       <div className={`p-3 rounded-lg max-w-xs ${isCurrentUser? "bg-pink-500 text-white rounded-br-none": "bg-white text-gray-900 rounded-bl-none"}`}>
{!isCurrentUser && (
<p className="text-sm font-semibold">{chat.sender}</p>
)}
      
      <p className="text-sm">{chat.text}</p>
<span className="block text-xs mt-1 text-right opacity-60">{chat.time}</span>
        </div>
{isCurrentUser && (
<img src={chat.avatar} alt="img" className="w-10 h-10 rounded-full ml-3"/>
)}
</div>
                  );
                })
              )}
            </div>
 <form className="flex space-x-2" onSubmit={(e) => {
  e.preventDefault();
if (msg.trim()) {
sendMsg(user.id, msg.trim());
setMsg("");
}
     }}
>
<input type="text" placeholder="Type your message..." value={msg} onChange={(e) => setMsg(e.target.value)} className="flex-1 border border-pink-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"/>
<button type="submit" className="bg-pink-500 text-white px-5 rounded-lg hover:bg-pink-600 transition">Send</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default Chat;
