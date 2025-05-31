import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axios from "axios";

function Signup() {
  const [form1, setForm1] = useState({ username: "", email: "", password: "", avatar: "" });
  const [form2, setForm2] = useState({ username: "", email: "", password: "", avatar: "" });
  const navigate = useNavigate();

  const check = (user) => {
    if (user.username.length < 3){
      Swal.fire({ icon: "error", text: "Username must be at least 3 characters" });
      return;
    }
    if (user.password.length < 3) {
      Swal.fire({ icon: "error", text: "Password must be at least 3 characters" });
      return;
    }
    if (!user.email.includes("@") || !user.email.includes(".com")) {
      Swal.fire({ icon: "error", text: "Email is Invalid, must include @ and .com" });
      return;
    }
    if (!user.avatar){
      Swal.fire({ icon: "error", text: "Avatar is required" });
      return;
    }
    return true;
  };

  const registerUsers = async () => {
    if (!check(form1) || !check(form2)) return;

    try {
      const res1 = await axios.post("https://68219a91259dad2655afc3cc.mockapi.io/api/users/user", form1);
      const res2 = await axios.post("https://68219a91259dad2655afc3cc.mockapi.io/api/users/user", form2);

      Swal.fire({
        title: "Success!",
        text: "Accounts created successfully",
        icon: "success"
}).then(() => {
navigate("/login");
})
} catch (err) {
      console.error("There is an error", err);
      Swal.fire({ icon: "error", text: "There is an error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4 py-10">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg max-w-6xl w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-8">Create Users Account</h1>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
          {/* User 1 */}
          <div className="flex-1 flex flex-col space-y-4 w-full">
            <h2 className="text-lg md:text-xl font-bold text-pink-500 text-center">User 1</h2>
            <input className="p-2 border rounded" type="text" placeholder="Username" value={form1.username} onChange={(e) => setForm1({ ...form1, username: e.target.value })} />
            <input className="p-2 border rounded" type="email" placeholder="Email" value={form1.email} onChange={(e) => setForm1({ ...form1, email: e.target.value })} />
            <input className="p-2 border rounded" type="password" placeholder="Password" value={form1.password} onChange={(e) => setForm1({ ...form1, password: e.target.value })} />
            <input className="p-2 border rounded" type="url" placeholder="Avatar URL" value={form1.avatar} onChange={(e) => setForm1({ ...form1, avatar: e.target.value })} />
          </div>

          {/* User 2 */}
          <div className="flex-1 flex flex-col space-y-4 w-full">
            <h2 className="text-lg md:text-xl font-bold text-pink-500 text-center">User 2</h2>
            <input className="p-2 border rounded" type="text" placeholder="Username" value={form2.username} onChange={(e) => setForm2({ ...form2, username: e.target.value })} />
            <input className="p-2 border rounded" type="email" placeholder="Email" value={form2.email} onChange={(e) => setForm2({ ...form2, email: e.target.value })} />
            <input className="p-2 border rounded" type="password" placeholder="Password" value={form2.password} onChange={(e) => setForm2({ ...form2, password: e.target.value })} />
            <input className="p-2 border rounded" type="url" placeholder="Avatar URL" value={form2.avatar} onChange={(e) => setForm2({ ...form2, avatar: e.target.value })} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
<button onClick={registerUsers} className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-lg transition">Register Users</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
