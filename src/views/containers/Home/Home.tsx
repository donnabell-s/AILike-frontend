import * as Components from "../../components";

const Home = () => {
    return (
        <div className="flex justify-center">
        <div className="flex flex-row w-full max-w-screen-xl p-4 gap-4">
            <div className="w-[55%]"><Components.MyDetailsMini/></div>
            <div className="w-full">center</div>
            <div className="w-[55%]">right</div>
        </div>
        </div>
    );
};

export default Home;
