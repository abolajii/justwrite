import React from "react";
import useUserProfileStore from "../store/useUserProfileStore";

const Profile = () => {
  const { profile, updateProfile } = useUserProfileStore();
  return <h2>Profile Page</h2>;
};

export default Profile;
