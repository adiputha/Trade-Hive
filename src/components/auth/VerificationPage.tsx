import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";

const VerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification link to <strong>{email}</strong>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>
              Please check your email and follow the instructions to verify your
              account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-md bg-primary/10 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-primary">
                    Verification email sent
                  </h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      Click the link in the email we sent to {email} to verify
                      your account and complete registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>The verification link will expire in 24 hours.</p>
              <p className="mt-2">
                If you don't see the email in your inbox, please check your spam
                folder.
              </p>
            </div>

            <Button className="w-full">Resend verification email</Button>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-center text-sm text-gray-600">
              Already verified?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-gray-500">
          Need help?{" "}
          <a href="#" className="font-medium text-gray-700 hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;
