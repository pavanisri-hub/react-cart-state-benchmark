import { useUserContext } from "../context/UserContext";

function UserInfo() {
  const { user } = useUserContext();

  return (
    <div>
      User: {user.name} ({user.isLoggedIn ? "Logged in" : "Guest"})
    </div>
  );
}

export default UserInfo;