import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axios from "axios";

function Login() {
  const [form1, setForm1] = useState({ username: "", password: "" });
  const [form2, setForm2] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form1.username || !form1.password || !form2.username || !form2.password) {
      Swal.fire({
        icon: "error",
        text: "All fields are required!",
      });
      return;
    }

    try {
      const res = await axios.get("https://68219a91259dad2655afc3cc.mockapi.io/api/users/user");
      const users = res.data;
      const user1 = users.find(u => u.username === form1.username && u.password === form1.password);
      const user2 = users.find(u => u.username === form2.username && u.password === form2.password);

      if (!user1 || !user2) {
        Swal.fire({
          icon: "error",
          text: "Account Not Found",
        });
        return;
      }

      localStorage.setItem("chatUsers", JSON.stringify([user1, user2]));
      navigate("/chat");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        text: "Something went wrong",
      });
    }
  };

  const handleChange = (e, setForm) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4 py-10">
      <form onSubmit={handleLogin} className="bg-white p-6 md:p-10 rounded-2xl shadow-lg max-w-6xl w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-8">Login Users</h1>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
   {/* U1 */}
          <div className="flex-1 flex flex-col space-y-4 w-full">
            <h2 className="text-lg md:text-xl font-bold text-pink-500 text-center">User 1</h2>
<input name="username" className="p-2 border rounded" placeholder="Username" type="text" value={form1.username} onChange={(e) => handleChange(e, setForm1)}/>
           
<input name="password" className="p-2 border rounded" type="password" placeholder="Password" value={form1.password}onChange={(e) => handleChange(e, setForm1)}/>
</div>
{/* u2 */}
          <div className="flex-1 flex flex-col space-y-4 w-full">
            <h2 className="text-lg md:text-xl font-bold text-pink-500 text-center">User 2</h2>
<input name="username" className="p-2 border rounded" placeholder="Username" type="text" value={form2.username} onChange={(e) => handleChange(e, setForm2)}/>
           
<input name="password" className="p-2 border rounded" type="password" placeholder="Password" value={form2.password} onChange={(e) => handleChange(e, setForm2)}/>
          </div>
        </div>

<div className="flex justify-center mt-8">
<button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-lg transition">Login Users</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
