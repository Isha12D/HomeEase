import React from "react";
import { useAuth } from "../Context/AuthContext";
import UserProfile from "../Components/UserProfile";
import ProviderProfile from "../Components/ProviderProfile";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <p>Please login</p>;

  return user.role === "provider"
    ? <ProviderProfile />
    : <UserProfile />;
};

export default Profile;
