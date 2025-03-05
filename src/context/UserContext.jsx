/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const context = createContext();

export default function UserContext({ children }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <context.Provider value={{ user, setUser, token, role }}>
      {children}
    </context.Provider>
  );
}
