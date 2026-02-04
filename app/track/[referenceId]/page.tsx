"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle, AlertCircle, MessageSquare, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTickets } from "@/lib/mock-data";

const statusConfig: Record<string, { color: string; bgColor: string; label: string; icon: any }> = {
     IN_PROGRESS: { color: "text-amber-600", bgColor: "bg-amber-100", label: "In Progress", icon: Clock },
     RESOLVED: { color: "text-emerald-600", bgColor: "bg-emerald-100", label: "Resolved", icon: CheckCircle },
     PENDING_INFORMATION: { color: "text-orange-600", bgColor: "bg-orange-100", label: "Info Requested", icon: AlertCircle },
};

export default function TrackPage() {
     const params = useParams();
     const referenceId = params.referenceId as string;

     // Find ticket or create mock
     const ticket = mockTickets.find((t) => t.referenceId === referenceId) || {
          referenceId,
          queryType: "GRIEVANCE" as const,
          priority: "MEDIUM" as const,
          status: "IN_PROGRESS",
          section: { id: "sec-1", name: "Revenue Department" },
          subject: "Query Submitted",
          description: "Your query has been submitted and is being processed.",
          createdAt: new Date().toISOString(),
          slaDeadline: null,
          hasAttachments: false,
          hasPendingInfoRequest: false,
     };

     const status = statusConfig[ticket.status] || statusConfig.IN_PROGRESS;
     const StatusIcon = status.icon;

     const timeline = [
          { status: "Submitted", date: ticket.createdAt, description: "Query submitted successfully" },
          { status: "Under Review", date: new Date().toISOString(), description: "Your query is being reviewed by an officer" },
     ];

     if (ticket.status === "RESOLVED") {
          timeline.push({ status: "Resolved", date: new Date().toISOString(), description: "Your query has been resolved" });
     }

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
               <div className="max-w-3xl mx-auto">
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
                         <ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard
                    </Link>

                    {/* Header Card */}
                    <Card className="mb-6">
                         <CardHeader className="border-b">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm text-gray-500">Reference ID</p>
                                        <CardTitle className="font-mono text-xl">{ticket.referenceId}</CardTitle>
                                   </div>
                                   <Badge className={`${status.bgColor} ${status.color} border-0 text-sm px-4 py-2`}>
                                        <StatusIcon className="h-4 w-4 mr-2" />{status.label}
                                   </Badge>
                              </div>
                         </CardHeader>
                         <CardContent className="pt-6">
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                   <div>
                                        <p className="text-sm text-gray-500">Type</p>
                                        <div className="flex items-center gap-2 mt-1">
                                             {ticket.queryType === "GRIEVANCE" ? (
                                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                             ) : (
                                                  <MessageSquare className="h-5 w-5 text-green-500" />
                                             )}
                                             <span className="font-medium">{ticket.queryType}</span>
                                        </div>
                                   </div>
                                   <div>
                                        <p className="text-sm text-gray-500">Department</p>
                                        <div className="flex items-center gap-2 mt-1">
                                             <Building2 className="h-5 w-5 text-blue-500" />
                                             <span className="font-medium">{ticket.section.name}</span>
                                        </div>
                                   </div>
                                   <div>
                                        <p className="text-sm text-gray-500">Submitted On</p>
                                        <div className="flex items-center gap-2 mt-1">
                                             <Calendar className="h-5 w-5 text-gray-400" />
                                             <span className="font-medium">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                        </div>
                                   </div>
                                   <div>
                                        <p className="text-sm text-gray-500">Priority</p>
                                        <Badge variant="outline" className={ticket.priority === "HIGH" ? "text-red-600 border-red-200" : "text-blue-600 border-blue-200"}>
                                             {ticket.priority}
                                        </Badge>
                                   </div>
                              </div>

                              <div className="border-t pt-4">
                                   <h3 className="font-semibold mb-2">Subject</h3>
                                   <p className="text-gray-700">{ticket.subject}</p>
                              </div>

                              <div className="border-t pt-4 mt-4">
                                   <h3 className="font-semibold mb-2">Description</h3>
                                   <p className="text-gray-700">{ticket.description}</p>
                              </div>
                         </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card>
                         <CardHeader>
                              <CardTitle>Progress Timeline</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="space-y-4">
                                   {timeline.map((item, index) => (
                                        <div key={index} className="flex gap-4">
                                             <div className="flex flex-col items-center">
                                                  <div className={`w-3 h-3 rounded-full ${index === timeline.length - 1 ? "bg-green-500" : "bg-blue-500"}`} />
                                                  {index < timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                                             </div>
                                             <div className="pb-4">
                                                  <p className="font-medium">{item.status}</p>
                                                  <p className="text-sm text-gray-500">{item.description}</p>
                                                  <p className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleString()}</p>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </CardContent>
                    </Card>

                    {/* Action Required Alert */}
                    {ticket.hasPendingInfoRequest && (
                         <Card className="mt-6 border-orange-200 bg-orange-50">
                              <CardContent className="pt-6">
                                   <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                             <AlertCircle className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div>
                                             <h3 className="font-semibold text-orange-800">Additional Information Required</h3>
                                             <p className="text-sm text-orange-700 mt-1">The officer has requested additional information to process your query.</p>
                                             <Button className="mt-3 bg-orange-600 hover:bg-orange-700">Provide Information</Button>
                                        </div>
                                   </div>
                              </CardContent>
                         </Card>
                    )}
               </div>
          </div>
     );
}
