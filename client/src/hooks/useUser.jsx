import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useLocalStorage from "./useLocalStorage";

function useUser() {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = useCallback(
    (currentUser) => {
      setUser(currentUser);
      setItem("user", JSON.stringify(currentUser));
    },
    [setUser, setItem]
  );

  const removeUser = useCallback(() => {
    setUser(null);
    setItem("user", "");
  }, [setUser, setItem]);

  return { user, addUser, removeUser, setUser };
}

export default useUser;
