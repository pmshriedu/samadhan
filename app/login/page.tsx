"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Loader2, ArrowRight, Shield, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { MOCK_OTP, mockAuth } from "@/lib/mock-data";

export default function SamadhanLoginPage() {
     const router = useRouter();
     const [step, setStep] = useState<"phone" | "otp">("phone");
     const [phone, setPhone] = useState("");
     const [otp, setOtp] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState("");

     const handleSendOTP = (e: React.FormEvent) => {
          e.preventDefault();
          const cleanPhone = phone.replace(/\D/g, "");
          if (cleanPhone.length < 10) {
               setError("Please enter a valid 10-digit phone number");
               return;
          }
          setIsLoading(true);
          // Mock delay
          setTimeout(() => {
               setIsLoading(false);
               setStep("otp");
               setError("");
               // alert(`Mock OTP sent! Use: ${MOCK_OTP}`);
          }, 1000);
     };

     const handleVerifyOTP = (e: React.FormEvent) => {
          e.preventDefault();
          if (otp !== MOCK_OTP) {
               setError(`Invalid OTP. Use: ${MOCK_OTP}`);
               return;
          }
          setIsLoading(true);
          setTimeout(() => {
               mockAuth.login();
               router.push("/dashboard");
          }, 500);
     };

     return (
          <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-emerald-50">
               <div className="w-full max-w-md">
                    <Link href="/" className="inline-flex items-center text-sm text-green-700 hover:text-green-800 mb-6 font-medium">
                         <ArrowLeft className="h-4 w-4 mr-2" />
                         Back to Home
                    </Link>

                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-green-100">
                         <div className="text-center px-6 pt-8 pb-6 bg-gradient-to-b from-green-50 to-white">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                   <MessageSquare className="h-10 w-10 text-white" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                   {step === "phone" ? "Login to SAMADHAN" : "Verify OTP"}
                              </h1>
                              <p className="text-gray-500 text-sm">
                                   {step === "phone" ? "Enter your phone number to continue" : `Enter the 6-digit code (Use: ${MOCK_OTP})`}
                              </p>
                         </div>

                         <div className="px-6 pb-8">
                              {error && (
                                   <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                        {error}
                                   </div>
                              )}

                              {step === "phone" ? (
                                   <form onSubmit={handleSendOTP} className="space-y-6">
                                        <div className="relative">
                                             <Input
                                                  type="tel"
                                                  placeholder="Enter 10-digit phone number"
                                                  value={phone}
                                                  onChange={(e) => setPhone(e.target.value)}
                                                  className="h-14 pl-14 pr-4 text-lg border-2 rounded-full border-green-200 focus:border-green-500"
                                             />
                                             <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                       <Phone className="w-4 h-4 text-green-600" />
                                                  </div>
                                             </div>
                                        </div>

                                        <Button
                                             type="submit"
                                             disabled={isLoading || phone.replace(/\D/g, "").length < 10}
                                             className="w-full h-14 rounded-full text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                        >
                                             {isLoading ? (
                                                  <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Sending OTP...</>
                                             ) : (
                                                  <>Continue<ArrowRight className="h-5 w-5 ml-2" /></>
                                             )}
                                        </Button>
                                   </form>
                              ) : (
                                   <form onSubmit={handleVerifyOTP} className="space-y-6">
                                        <div className="bg-green-50 rounded-xl p-4 border border-green-100 text-center">
                                             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                  <Shield className="w-5 h-5 text-green-600" />
                                             </div>
                                             <p className="text-sm text-green-700">
                                                  OTP sent to <span className="font-semibold">{phone}</span>
                                             </p>
                                        </div>

                                        <div className="flex justify-center">
                                             <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                                                  <InputOTPGroup className="gap-2">
                                                       {[0, 1, 2, 3, 4, 5].map((index) => (
                                                            <InputOTPSlot key={index} index={index} className="w-11 h-12 text-lg border-2 border-green-200 rounded-xl" />
                                                       ))}
                                                  </InputOTPGroup>
                                             </InputOTP>
                                        </div>

                                        <Button
                                             type="submit"
                                             disabled={isLoading || otp.length !== 6}
                                             className="w-full h-14 rounded-full text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600"
                                        >
                                             {isLoading ? (
                                                  <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Verifying...</>
                                             ) : (
                                                  <><Check className="h-5 w-5 mr-2" />Verify & Continue</>
                                             )}
                                        </Button>

                                        <div className="flex items-center justify-center gap-4 text-sm">
                                             <button type="button" onClick={() => alert(`Use OTP: ${MOCK_OTP}`)} className="text-green-600 hover:underline">
                                                  Resend OTP
                                             </button>
                                             <span className="text-gray-300">|</span>
                                             <button type="button" onClick={() => { setStep("phone"); setOtp(""); }} className="text-gray-500 hover:underline">
                                                  Change Number
                                             </button>
                                        </div>
                                   </form>
                              )}

                              <div className="relative my-6">
                                   <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                                   <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-4 text-gray-400 font-medium">or</span>
                                   </div>
                              </div>

                              <div className="text-center">
                                   <p className="text-sm text-gray-600 mb-3">Don't want to register?</p>
                                   <Link href="/submit">
                                        <Button variant="outline" className="rounded-full border-2 border-green-200 hover:bg-green-50 px-6">
                                             Continue as Guest
                                        </Button>
                                   </Link>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
