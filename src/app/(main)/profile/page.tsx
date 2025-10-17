"use client";

import React from "react";
import { UserOnlyRoute } from "@/components/shared/RouteProvider";

function Profile() {
  return <div className="flex-1">Profile</div>;
}

export default UserOnlyRoute(Profile);
