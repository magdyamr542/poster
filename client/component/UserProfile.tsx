import * as React from "react";
import { useState, useEffect } from "react";

interface UserProfileProps {
  userId: string;
  username: string;
  email: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  username,
  email,
}) => {
  return <div> {username} </div>;
};
