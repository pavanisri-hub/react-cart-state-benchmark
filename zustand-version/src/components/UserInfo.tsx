import { useAppStore } from "../store/useAppStore";

function UserInfo() {
  const user = useAppStore((state) => state.user);

  if (!user) {
    return <div>Guest</div>;
  }

  return <div>User: {user.name}</div>;
}

export default UserInfo;