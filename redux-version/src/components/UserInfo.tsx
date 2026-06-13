import { useSelector } from "react-redux";


function UserInfo() {
const user = useSelector((state: any) => state.app.user);

  if (!user) {
    return <div>Guest</div>;
  }

  return <div>User: {user.name}</div>;
}

export default UserInfo;