"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MessageSquare, AlertCircle, Building2, Calendar, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockServices, mockSections } from "@/lib/mock-data";

type QueryType = "FEEDBACK" | "GRIEVANCE";

const STEPS = [
     { id: "type", title: "Query Type" },
     { id: "visit", title: "DC Visit" },
     { id: "service", title: "Service" },
     { id: "subject", title: "Subject" },
     { id: "description", title: "Details" },
     { id: "contact", title: "Contact" },
     { id: "review", title: "Review" },
];

function SubmitPageContent() {
     const router = useRouter();
     const searchParams = useSearchParams();

     const [currentStep, setCurrentStep] = useState(0);
     const [queryType, setQueryType] = useState<QueryType>((searchParams.get("type") as QueryType) || "GRIEVANCE");
     const [visitedDC, setVisitedDC] = useState<boolean | null>(null);
     const [selectedServiceId, setSelectedServiceId] = useState("");
     const [subject, setSubject] = useState("");
     const [description, setDescription] = useState("");
     const [citizenName, setCitizenName] = useState("");
     const [citizenPhone, setCitizenPhone] = useState("");
     const [showSuccessModal, setShowSuccessModal] = useState(false);
     const [submittedReferenceId, setSubmittedReferenceId] = useState("");

     const goNext = () => {
          if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
     };

     const goBack = () => {
          if (currentStep > 0) setCurrentStep(currentStep - 1);
     };

     const handleSubmit = () => {
          // Generate mock reference ID
          const refId = `SAM-2026-${String(Math.floor(Math.random() * 900000) + 100000)}`;
          setSubmittedReferenceId(refId);
          setShowSuccessModal(true);
     };

     const renderStepContent = () => {
          switch (STEPS[currentStep].id) {
               case "type":
                    return (
                         <div className="space-y-6">
                              <div className="text-center mb-8">
                                   <h2 className="text-2xl font-bold text-gray-900 mb-2">What would you like to submit?</h2>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                                   <button
                                        onClick={() => { setQueryType("GRIEVANCE"); goNext(); }}
                                        className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${queryType === "GRIEVANCE" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                   >
                                        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                                        <h3 className="font-semibold text-lg">Grievance</h3>
                                        <p className="text-sm text-gray-500 mt-1">Report a complaint</p>
                                   </button>
                                   <button
                                        onClick={() => { setQueryType("FEEDBACK"); goNext(); }}
                                        className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${queryType === "FEEDBACK" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                                   >
                                        <MessageSquare className="h-10 w-10 text-green-500 mx-auto mb-3" />
                                        <h3 className="font-semibold text-lg">Feedback</h3>
                                        <p className="text-sm text-gray-500 mt-1">Share your experience</p>
                                   </button>
                              </div>
                         </div>
                    );

               case "visit":
                    return (
                         <div className="space-y-6">
                              <div className="text-center mb-8">
                                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Did you visit the DC office?</h2>
                              </div>
                              <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                                   <button
                                        onClick={() => { setVisitedDC(true); goNext(); }}
                                        className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${visitedDC === true ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                                   >
                                        <div className="flex items-center gap-4">
                                             <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                                  <Building2 className="h-8 w-8 text-green-600" />
                                             </div>
                                             <div className="text-left">
                                                  <h3 className="font-semibold text-lg">Yes, I visited</h3>
                                                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                                             </div>
                                        </div>
                                   </button>
                                   <button
                                        onClick={() => { setVisitedDC(false); goNext(); }}
                                        className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${visitedDC === false ? "border-gray-500 bg-gray-50" : "border-gray-200"}`}
                                   >
                                        <div className="flex items-center gap-4">
                                             <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                                                  <X className="h-8 w-8 text-gray-500" />
                                             </div>
                                             <div className="text-left">
                                                  <h3 className="font-semibold text-lg">No, I haven't visited</h3>
                                                  <p className="text-sm text-gray-500">I have a general query</p>
                                             </div>
                                        </div>
                                   </button>
                              </div>
                         </div>
                    );

               case "service":
                    return (
                         <div className="space-y-6">
                              <div className="text-center mb-8">
                                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Select the related service</h2>
                              </div>
                              <div className="max-w-lg mx-auto space-y-3">
                                   {mockServices.map((service) => (
                                        <button
                                             key={service.id}
                                             onClick={() => { setSelectedServiceId(service.id); goNext(); }}
                                             className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedServiceId === service.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
                                        >
                                             <h3 className="font-medium">{service.name}</h3>
                                             <p className="text-sm text-gray-500">{service.description}</p>
                                        </button>
                                   ))}
                              </div>
                         </div>
                    );

               case "subject":
                    return (
                         <div className="space-y-6">
                              <div className="text-center mb-8">
                                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Brief title for your query</h2>
                              </div>
                              <div className="max-w-lg mx-auto">
                                   <Input
                                        placeholder="Enter a brief subject..."
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="h-14 text-lg"
                                   />
                              </div>
                         </div>
                    );

               case "description":
                    return (
                         <div className="space-y-6">
                              <div className="text-center mb-8">
                                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Describe your experience</h2>
                              </div>
                              <div className="max-w-lg mx-auto">
                                   <Textarea
                                        placeholder="Provide details about your query..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={6}
                                        className="text-base"
                                   />
                              </div>
                         </div>
                    );

               case "contact":
                    return (
                         <div className="space-y-6">
                              <div className="text-center mb-8">
                                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
                              </div>
                              <div className="max-w-lg mx-auto space-y-4">
                                   <div>
                                        <Label>Full Name *</Label>
                                        <Input value={citizenName} onChange={(e) => setCitizenName(e.target.value)} placeholder="Enter your name" />
                                   </div>
                                   <div>
                                        <Label>Phone Number</Label>
                                        <Input value={citizenPhone} onChange={(e) => setCitizenPhone(e.target.value)} placeholder="Enter phone number" />
                                   </div>
                              </div>
                         </div>
                    );

               case "review":
                    const selectedService = mockServices.find((s) => s.id === selectedServiceId);
                    return (
                         <div className="space-y-6">
                              <div className="text-center mb-8">
                                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
                              </div>
                              <Card className="max-w-lg mx-auto">
                                   <CardContent className="p-6 space-y-4">
                                        <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium">{queryType}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">{selectedService?.name || "N/A"}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Subject</span><span className="font-medium">{subject}</span></div>
                                        <div className="border-t pt-4"><span className="text-gray-500">Description</span><p className="mt-1">{description}</p></div>
                                        <div className="border-t pt-4 flex justify-between"><span className="text-gray-500">Contact</span><span>{citizenName} • {citizenPhone || "No phone"}</span></div>
                                   </CardContent>
                              </Card>
                         </div>
                    );

               default:
                    return null;
          }
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
               <div className="max-w-2xl mx-auto">
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
                         <ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard
                    </Link>

                    {/* Progress Bar */}
                    <div className="mb-8">
                         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
                         </div>
                         <p className="text-sm text-gray-500 mt-2">Step {currentStep + 1} of {STEPS.length}</p>
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">{renderStepContent()}</div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8">
                         <Button variant="outline" onClick={goBack} disabled={currentStep === 0}>
                              <ArrowLeft className="h-4 w-4 mr-2" />Back
                         </Button>
                         {currentStep === STEPS.length - 1 ? (
                              <Button onClick={handleSubmit} className="bg-gradient-to-r from-green-600 to-emerald-600">
                                   <Check className="h-4 w-4 mr-2" />Submit
                              </Button>
                         ) : (
                              <Button onClick={goNext} disabled={currentStep === 0}>
                                   Next<ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                         )}
                    </div>
               </div>

               {/* Success Modal */}
               <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                    <DialogContent className="sm:max-w-md">
                         <DialogHeader className="text-center">
                              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                                   <CheckCircle2 className="h-10 w-10 text-white" />
                              </div>
                              <DialogTitle className="text-2xl text-center">🎉 Successfully Submitted!</DialogTitle>
                              <DialogDescription className="text-center">Your query has been submitted successfully.</DialogDescription>
                         </DialogHeader>
                         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                              <p className="text-sm text-gray-600 mb-2">Your Reference ID</p>
                              <p className="text-xl font-mono font-bold text-blue-700 bg-white rounded-lg px-4 py-2 inline-block">{submittedReferenceId}</p>
                         </div>
                         <DialogFooter className="flex flex-col gap-2 sm:flex-col">
                              <Button onClick={() => router.push(`/track/${submittedReferenceId}`)} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                                   Track Status
                              </Button>
                              <Button variant="outline" onClick={() => router.push("/dashboard")} className="w-full">
                                   Go to Dashboard
                              </Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>
          </div>
     );
}

export default function SubmitPage() {
     return (
          <Suspense fallback={<div>Loading...</div>}>
               <SubmitPageContent />
          </Suspense>
     );
}
