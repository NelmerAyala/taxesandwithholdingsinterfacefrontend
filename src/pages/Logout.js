import React from "react";

import useUser from "../hooks/useUser";

export default function Logout() {
  const { logout } = useUser();

  return <>{logout()}</>;
}
