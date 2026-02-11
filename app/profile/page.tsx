"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  Save,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { mockAuth, mockUser } from "@/lib/mock-data";

export default function CitizenProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPseudonym, setShowPseudonym] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    pseudonym: "",
  });

  useEffect(() => {
    if (!mockAuth.isAuthenticated()) {
      router.push("/login");
      return;
    }
    // Simulate loading
    const timer = setTimeout(() => {
      setProfile({
        fullName: mockUser.name,
        phone: mockUser.phone,
        email: mockUser.email,
        address: mockUser.address,
        pseudonym: mockUser.pseudonym,
      });
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setIsSaving(false);
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your SAMADHAN citizen profile</p>
        </div>

        {/* Privacy Notice */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <Shield className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Your privacy is protected.</strong> Officers see only your
            pseudonym when handling your queries. Your real identity is kept
            confidential and only visible to authorized administrators.
          </AlertDescription>
        </Alert>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pseudonym Display */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <Label className="text-sm font-medium text-green-700">
                Your Anonymous Identity
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-semibold text-green-900">
                  {showPseudonym ? profile.pseudonym : "••••••••••••"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPseudonym(!showPseudonym)}
                  className="h-8 w-8 p-0"
                >
                  {showPseudonym ? (
                    <EyeOff className="h-4 w-4 text-green-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-green-600" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-green-600 mt-1">
                This is how officers see your identity
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                Full Name
              </Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
                placeholder="Enter your full name"
              />
              <p className="text-xs text-gray-500">
                Your real name (kept confidential from officers)
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={profile.phone}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">
                Your verified phone number (cannot be changed)
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                Email Address
              </Label>
              <Input
                id="email"
                value={profile.email}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">
                System-generated email for your account
              </p>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                Address
              </Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
                placeholder="Enter your address"
                rows={3}
              />
              <p className="text-xs text-gray-500">
                Your address (optional, kept confidential)
              </p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Privacy Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <p>
                <strong>Officers</strong> can only see your pseudonym and query
                details. They cannot access your real name, phone, or address.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <p>
                <strong>Administrators</strong> may access your real identity
                only for official purposes and accountability.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <p>
                Your <strong>pseudonym</strong> is randomly generated and unique
                to you. It cannot be changed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
