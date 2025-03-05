import { useContext, useState } from "react";
import { context } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../utilities/AxiosInstance";
import TravelerProfiles from "../components/Profiles/TravelerProfiles";
import AgencyProfile from "../components/Profiles/AgencyProfile";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, token } = useContext(context);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    if (isEditing) {
      const edit = async () => {
        await axiosInstance
          .put(
            `/api/auth/update/${user._id}`,
            {
              name,
              email,
              password,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      edit();
    }
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const handlLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
        <div className="relative">
          <FontAwesomeIcon
            onClick={handleEdit}
            title="Edit Profile"
            icon={faPen}
            className="text-xl absolute right-4 top-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer transition"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-gray-100 p-3 rounded-full shadow-md">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="profile"
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="text-6xl text-gray-500"
              />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500 my-2">{user.email}</p>
            <span className="text-sm  bg-blue-100 text-blue-600 px-4 py-1 rounded-full">
              {user.role}
            </span>
          </div>
        </div>

        <div className="mt-4 " onClick={handlLogout}>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>

        {/******* Profile Edit ******/}

        {isEditing && (
          <div className="fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
              <button
                onClick={handleCancelEdit}
                className="absolute top-3 right-3"
              >
                <FontAwesomeIcon
                  icon={faCancel}
                  className="text-xl text-gray-600"
                />
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleEdit}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/******* Profile Tabs *******/}

      {user.role === "traveler" ? <TravelerProfiles /> : <AgencyProfile />}
    </>
  );
}
