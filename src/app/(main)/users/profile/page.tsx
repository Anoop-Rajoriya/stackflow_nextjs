import ProtectedRoute from "@/components/common/ProtectedRoute";
import React from "react";

function Profile() {
  return (
    <ProtectedRoute>
      <div>Profile</div>
    </ProtectedRoute>
  );
}

export default Profile;
