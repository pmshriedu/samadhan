"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, MapPin, Shield, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mockUser } from "@/lib/mock-data";

export default function CitizenProfilePage() {
     const [showPseudonym, setShowPseudonym] = useState(false);
     const [profile, setProfile] = useState({
          fullName: mockUser.name,
          phone: mockUser.phone,
          email: mockUser.email,
          address: mockUser.address,
          pseudonym: mockUser.pseudonym,
     });

     const handleSave = () => {
          alert("Profile saved successfully! (Mock)");
     };

     return (
          <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-emerald-50">
               <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                         <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-4">
                              <ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard
                         </Link>
                         <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                         <p className="text-gray-600">Manage your SAMADHAN citizen profile</p>
                    </div>

                    <Alert className="mb-6 border-green-200 bg-green-50">
                         <Shield className="h-4 w-4 text-green-600" />
                         <AlertDescription className="text-green-800">
                              <strong>Your privacy is protected.</strong> Officers see only your pseudonym when handling your queries.
                         </AlertDescription>
                    </Alert>

                    <Card>
                         <CardHeader>
                              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Profile Information</CardTitle>
                              <CardDescription>Update your personal information below</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-6">
                              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                   <Label className="text-sm font-medium text-green-700">Your Anonymous Identity</Label>
                                   <div className="flex items-center gap-2 mt-1">
                                        <p className="text-lg font-semibold text-green-900">{showPseudonym ? profile.pseudonym : "••••••••••••"}</p>
                                        <Button variant="ghost" size="sm" onClick={() => setShowPseudonym(!showPseudonym)} className="h-8 w-8 p-0">
                                             {showPseudonym ? <EyeOff className="h-4 w-4 text-green-600" /> : <Eye className="h-4 w-4 text-green-600" />}
                                        </Button>
                                   </div>
                                   <p className="text-xs text-green-600 mt-1">This is how officers see your identity</p>
                              </div>

                              <div className="space-y-2">
                                   <Label htmlFor="fullName" className="flex items-center gap-2"><User className="h-4 w-4 text-gray-500" />Full Name</Label>
                                   <Input id="fullName" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
                              </div>

                              <div className="space-y-2">
                                   <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" />Phone Number</Label>
                                   <Input id="phone" value={profile.phone} disabled className="bg-gray-50" />
                                   <p className="text-xs text-gray-500">Your verified phone number (cannot be changed)</p>
                              </div>

                              <div className="space-y-2">
                                   <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" />Email Address</Label>
                                   <Input id="email" value={profile.email} disabled className="bg-gray-50" />
                              </div>

                              <div className="space-y-2">
                                   <Label htmlFor="address" className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" />Address</Label>
                                   <Textarea id="address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} rows={3} />
                              </div>

                              <div className="flex justify-end pt-4 border-t">
                                   <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Save Changes</Button>
                              </div>
                         </CardContent>
                    </Card>
               </div>
          </div>
     );
}
