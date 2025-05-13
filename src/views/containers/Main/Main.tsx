import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import * as Service from "../../../services";
import * as Components from "../../components";

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAccessToken = async () => {
            const token = await Service.ReadAccessToken("user");
            if (!token) {
                navigate("/account/login");
            }
        };

        checkAccessToken();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await Service.LogoutUser();
            console.log("Logged out successfully");
            navigate("/account/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#F5F5F5]">
            <Components.Header onLogout={handleLogout} />
            <main className="flex flex-1">
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Main;
