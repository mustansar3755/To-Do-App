import assets from "../assets/assets";

const Profile = () => {
  return (
    // bg-ocean-start ki jagah dynamic gradient ya simple variable custom style use kiya hai
    <div className="w-full h-20 flex items-center justify-between gap-4 bg-linear-to-r from-primary-start to-primary-end px-10 py-4 shadow-md transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="img">
          <img className="w-16 h-16 rounded-full border-2 border-white/40" src={assets.User} alt="User" />
        </div>
        <div className="info text-white">
          <h1 className="text-2xl font-bold leading-none mb-1">John Doe</h1>
          <p className="text-sm opacity-90">Let's get started!</p>
        </div>
      </div>
      <div className="right">
        {/* Button automatically matches the current theme colors */}
        <button className="bg-surface text-text-main font-bold py-2 px-5 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-sm">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;