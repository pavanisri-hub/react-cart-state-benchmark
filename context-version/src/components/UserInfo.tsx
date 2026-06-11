import { useAppContext } from "../context/AppContext";

function UserInfo() {
  const { state } = useAppContext();
  const { name, isLoggedIn } = state.user;

  return (
    <div>
      User: {name} ({isLoggedIn ? "Logged in" : "Guest"})
    </div>
  );
}

export default UserInfo;