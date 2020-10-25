import { NextPage } from "next";
import * as React from "react";
import { useEffect } from "react";
import { InfoMsg } from "../../component/InfoMsg";
import { Layout } from "../../component/Layout";
import { UserProfile } from "../../component/UserProfile";
import { User } from "../../interfaces/types";
import { AxiosRequestService } from "../../services/AxiosRequestService";
import { UserService } from "../../services/UserService";

interface UserPageProps {
  userId: string;
}
const UserPage: NextPage<UserPageProps> = ({ userId }) => {
  const [user, setUser] = React.useState<User | null>(null);
  useEffect(() => {
    getUser(userId);
  }, []);

  const getUser = async (id: string) => {
    const request = AxiosRequestService.getUserByIdRequest(id);
    await UserService.getUserById(request)
      .then((user) => {
        setUser(user);
        return user;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!user)
    return <InfoMsg color={"red"} msg={"getting the user ..."}></InfoMsg>;
  return (
    <>
      <Layout size={"normal"}>
        <UserProfile username={user.name} userId={userId} email={user.email} />
      </Layout>
    </>
  );
};

UserPage.getInitialProps = async ({ query }) => {
  const userId = query.userId as string;
  return { userId };
};

export default UserPage;
