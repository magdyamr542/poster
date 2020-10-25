import { Link } from "@material-ui/core";
import * as React from "react";

interface UsernameLinkProps {
  username: string;
  userId: string;
  color: string;
}

export const UsernameLink: React.FC<UsernameLinkProps> = ({
  username,
  userId,
  color,
}) => {
  const userHref: string = `/user/${userId}`;

  return (
    <Link href={userHref}>
      <span
        style={{
          marginRight: 12,
          fontWeight: "bold",
          color,
        }}
      >
        {username}
      </span>
    </Link>
  );
};
