import React from "react";
import { Mail, Verified } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  email: string;
  emailVerification: boolean;
  children: React.ReactNode;
};

function AccountInfoCard({ email, emailVerification, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Account Information</span>
        </CardTitle>
        <CardDescription>
          Your account details and communication preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          {emailVerification ? (
            <Button disabled>
              <Verified className="w-5 h-5 mr-2" /> Verified
            </Button>
          ) : (
            <Button>Verify Email</Button>
          )}
        </div>

        <Separator />

        {children}
      </CardContent>
    </Card>
  );
}

export default AccountInfoCard;
