"use client";

import React from "react";
import useAuthStore from "@/lib/stores/authStore";

import ProtectedRoute from "@/components/common/ProtectedRoute";
import ProfileCard from "@/components/profile/ProfileCard";
import AccountInfoCard from "@/components/profile/AccountInfoCard";
import SettingsCard from "@/components/profile/SettingsCard";
import EditProfilDialog from "@/components/profile/EditProfilDialog";
import ChangePasswordDialog from "@/components/profile/ChangePasswordDialog";
import DeleteAccountDialog from "@/components/profile/DeleteAccountDialog";

function Profile() {
  const { profile } = useAuthStore();
  const createdAtDateString = new Date(profile?.createdAt!).toDateString();
  const passwordUpdateDateString = new Date(
    profile?.passwordUpdate!
  ).toDateString();

  return (
    <ProtectedRoute>
      {!profile ? (
        <div>Loading...</div>
      ) : (
        <div className="flex-1 space-y-4">
          <ProfileCard
            avatar={profile.avatar || null}
            fullName={profile.fullName}
            email={profile.email}
            emailVerification={profile.emailVerification}
            bio={profile.bio || null}
            joined={createdAtDateString}
          >
            <EditProfilDialog />
          </ProfileCard>
          <AccountInfoCard
            email={profile.email}
            emailVerification={profile.emailVerification}
          >
            <ChangePasswordDialog passwordUpdate={passwordUpdateDateString} />
          </AccountInfoCard>
          <SettingsCard>
            <DeleteAccountDialog />
          </SettingsCard>
        </div>
      )}
    </ProtectedRoute>
  );
}

export default Profile;
