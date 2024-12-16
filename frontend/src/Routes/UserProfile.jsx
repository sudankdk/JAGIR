import { useEffect, useState } from "react";
import { get_user_profile_data } from "../api/EndPoints";
import { SERVER_URL } from "../Constants/Constants";
import { get_username_from_url } from "../Constants/Reusables";

const UserProfile = () => {
  get_username_from_url();

  const [username, setUsername] = useState(get_username_from_url());

  useEffect(() => {
    setUsername(get_username_from_url());
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="pl-16 m-5 w-full">
        <UserDetails username={username} />
      </div>
    </div>
  );
};

const UserDetails = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [role, setRole] = useState(""); // Fixed this line

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await get_user_profile_data(username);
        console.log(data);
        setBio(data.bio || "No bio available");
        setProfileImage(data.profile_image || "");
        setFollowerCount(data.follower_count || 0);
        setFollowingCount(data.following_count || 0);
        setRole(data.role || "Unknown");
      } catch (error) {
        console.log("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [username]);

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-3xl font-semibold mb-4">
        @{username}
        {role && ` - ${role}`}
      </h1>

      {/* Profile photo and follower/following section */}
      <div className="flex items-center mb-4">
        <img
          src={
            loading || !profileImage
              ? "path/to/default/image.png"
              : `${SERVER_URL}${profileImage}`
          }
          alt={`${username}'s profile`}
          className="w-36 h-36 rounded-full object-cover shadow-md mr-6"
        />

        <div className="flex space-x-6">
          <div>
            <p className="text-xl font-semibold">Followers</p>
            <p className="text-lg text-gray-700">
              {loading ? "-" : followerCount}
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">Following</p>
            <p className="text-lg text-gray-700">
              {loading ? "-" : followingCount}
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-600 mt-6 mb-4">
        {loading ? "Loading bio..." : bio}
      </p>

      <button className="w-24 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Edit
      </button>
    </div>
  );
};

export default UserProfile;
