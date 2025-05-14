import * as Components from "../../components";

const Home = () => {
    return (
        <div className="flex justify-center">
        <div className="flex flex-row w-full max-w-screen-xl p-4 gap-4">
            <div className="w-[55%]"><Components.MyDetailsMini/></div>
            <div className="w-full flex flex-col gap-6">
                <Components.MakePost />
                <div className="h-[1px] bg-[#8E939A] rounded-full" />
                <Components.ListPosts />
            </div>
            <div className="w-[55%]">
                <Components.FriendRecommendation/>
            </div>
        </div>
        </div>
    );
};

export default Home;
