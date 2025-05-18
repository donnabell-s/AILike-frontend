import { FiUser, FiLock } from "react-icons/fi";
import * as Components from "../../components";
import * as Service from "../../../services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await Service.GetTokens(username, password);
            console.log("Login successful");
            navigate("/user/home");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="w-full md:w-1/2 flex items-center justify-center">
            <Components.AuthLayoutWrapper variant="login">
            <form onSubmit={handleLogin} className="flex flex-col justify-between gap-6 text-[16px] h-[390px]">
                <div className="flex flex-col gap-3 pt-8">
                {/* Username */}
                <div className="flex flex-col">
                    <label>Username</label>
                    <div className="flex items-center bg-[#F5F5F5] text-[#1F2937] rounded-md p-3 mt-1 h-[60px]">
                    <FiUser className="mr-2 text-xl text-[#8E939A]" />
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-transparent outline-none flex-1 text-[17px] w-full"
                    />
                    </div>
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label>Password</label>
                    <div className="flex items-center bg-[#F5F5F5] text-[#1F2937] rounded-md p-3 mt-1 h-[60px]">
                    <FiLock className="mr-2 text-xl text-[#8E939A]" />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent outline-none flex-1 text-[17px] w-full"
                    />
                    </div>
                </div>
                </div>

                <button type="submit" className="bg-gradient-to-r from-[#C53771] to-[#F282B0] font-medium text-white rounded-md py-2 hover:from-[#a82d5c] hover:to-[#d65888] transition-colors h-[60px] text-[18px]">
                Sign In
                </button>
            </form>
            </Components.AuthLayoutWrapper>
        </div>
    );
};

export default Login;
