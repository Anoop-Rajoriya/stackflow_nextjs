import React from "react";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CalendarDays, Edit, Shield } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type Props = {
  avatar: string | null;
  fullName: string;
  email: string;
  emailVerification: boolean;
  bio: string | null;
  joined: string;
  children: React.ReactNode;
};

function ProfileCard({
  avatar,
  fullName,
  email,
  emailVerification,
  bio,
  joined,
  children,
}: Props) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage
                src={avatar || "/images/avatars.png"}
                alt={fullName}
              />
              <AvatarFallback className="text-2xl">
                {fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{fullName}</h1>
                {emailVerification && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    <Shield className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{email}</p>
            </div>

            {bio && <p className="text-sm leading-relaxed">{bio}</p>}

            <div className="flex items-center space-x-1 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{joined}</span>
            </div>
          </div>

          {children}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
