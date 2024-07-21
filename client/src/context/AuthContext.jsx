import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({ user: null, setUser: () => {} });

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={userValue}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
