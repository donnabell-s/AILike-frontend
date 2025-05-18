import { Outlet, useNavigate } from "react-router-dom";
import * as Service from "../../../services";
import { useEffect } from "react";
import * as Components from "../../components"

const Authentication = () => {
    const navigate = useNavigate();
    
        useEffect(() => {
            const checkAccessToken = async () => {
                const token = await Service.ReadAccessToken("user");
                if (token) {
                    navigate("/user/home");
                }
            };
            checkAccessToken();
        }, [navigate]);

    return (
        <div className="xl:px-20 w-full min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                    <Components.AuthCarousel />
            </div>
            <Outlet />
        </div>
    )
}

export default Authentication;