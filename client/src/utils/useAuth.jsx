import { useCallback, useEffect } from "react";
import useUser from "./useUser";
import useLocalStorage from "./useLocalStorage";

function useAuth() {
  const { user, addUser: originalAddUser, removeUser, setUser } = useUser();
  const { getItem: originalGetItem } = useLocalStorage();

  const addUser = useCallback(originalAddUser, [originalAddUser]);
  const getItem = useCallback(originalGetItem, [originalGetItem]);

  useEffect(() => {
    const storedUser = getItem("user");
    if (storedUser) {
      addUser(JSON.parse(storedUser));
    }
  }, [addUser, getItem]);

  const login = (currentUser) => {
    addUser(currentUser);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, setUser };
}

export default useAuth;
