import React from "react";

const ProfileDetails = ({ name, email, image }) => {
  return (
    <div className="p-6">
      <img
        src={image || "/avatar.png"}
        alt={`${name}'s avatar`}
        className="w-24 h-24 rounded-full"
      />
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p>{email}</p>
    </div>
  );
};

export default ProfileDetails;
