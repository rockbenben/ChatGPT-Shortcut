import React from "react";
import { AuthProvider } from "./_components/AuthContext";
import UserProfile from "./_components/UserProfile";

function UserPage() {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  );
}

export default UserPage;
