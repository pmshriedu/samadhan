"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, MessageSquare, AlertCircle, Clock, CheckCircle, Search, RefreshCw, AlertTriangle, FileText, Calendar, ChevronRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAuth, mockUser, mockTickets } from "@/lib/mock-data";

const statusConfig: Record<string, { color: string; bgColor: string; label: string }> = {
     IN_PROGRESS: { color: "text-amber-600", bgColor: "bg-amber-100", label: "In Progress" },
     RESOLVED: { color: "text-emerald-600", bgColor: "bg-emerald-100", label: "Resolved" },
     PENDING_INFORMATION: { color: "text-orange-600", bgColor: "bg-orange-100", label: "Info Requested" },
     CLOSED: { color: "text-green-600", bgColor: "bg-green-100", label: "Closed" },
};

const queryTypeConfig = {
     FEEDBACK: { color: "text-emerald-600", bgColor: "bg-emerald-100", label: "Feedback" },
     GRIEVANCE: { color: "text-red-600", bgColor: "bg-red-100", label: "Grievance" },
};

export default function CitizenDashboardPage() {
     const router = useRouter();
     const [searchQuery, setSearchQuery] = useState("");
     const [activeTab, setActiveTab] = useState("all");

     useEffect(() => {
          if (!mockAuth.isAuthenticated()) {
               router.push("/login");
          }
     }, [router]);

     const filteredTickets = mockTickets.filter((ticket) => {
          const matchesSearch = ticket.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
               ticket.description.toLowerCase().includes(searchQuery.toLowerCase());

          if (activeTab === "active") return ["IN_PROGRESS", "PENDING_INFORMATION"].includes(ticket.status) && matchesSearch;
          if (activeTab === "resolved") return ticket.status === "RESOLVED" && matchesSearch;
          return matchesSearch;
     });

     const stats = {
          total: mockTickets.length,
          active: mockTickets.filter((t) => ["IN_PROGRESS", "PENDING_INFORMATION"].includes(t.status)).length,
          actionRequired: mockTickets.filter((t) => t.hasPendingInfoRequest).length,
          resolved: mockTickets.filter((t) => t.status === "RESOLVED").length,
     };

     const handleLogout = () => {
          mockAuth.logout();
          router.push("/");
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    {/* Welcome Section */}
                    <div className="mb-6 sm:mb-8">
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        Welcome back, {mockUser.name.split(" ")[0]}!
                                   </h1>
                                   <p className="text-gray-500 mt-1">Track and manage your queries from this dashboard</p>
                              </div>
                              <div className="flex items-center gap-3">
                                   <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                                   <Link href="/submit">
                                        <Button className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600">
                                             <Plus className="h-4 w-4" />New Query
                                        </Button>
                                   </Link>
                              </div>
                         </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
                         <Card className="bg-white border-0 shadow-sm">
                              <CardContent className="p-4 sm:p-6">
                                   <div className="flex items-center justify-between">
                                        <div>
                                             <p className="text-sm font-medium text-gray-500">Total Queries</p>
                                             <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                                             <FileText className="h-6 w-6 text-slate-600" />
                                        </div>
                                   </div>
                              </CardContent>
                         </Card>

                         <Card className="bg-white border-0 shadow-sm">
                              <CardContent className="p-4 sm:p-6">
                                   <div className="flex items-center justify-between">
                                        <div>
                                             <p className="text-sm font-medium text-gray-500">Active</p>
                                             <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">{stats.active}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                             <Clock className="h-6 w-6 text-blue-600" />
                                        </div>
                                   </div>
                              </CardContent>
                         </Card>

                         <Card className={`bg-white border-0 shadow-sm ${stats.actionRequired > 0 ? "ring-2 ring-orange-300" : ""}`}>
                              <CardContent className="p-4 sm:p-6">
                                   <div className="flex items-center justify-between">
                                        <div>
                                             <p className="text-sm font-medium text-gray-500">Action Required</p>
                                             <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-1">{stats.actionRequired}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                             <AlertTriangle className="h-6 w-6 text-orange-600" />
                                        </div>
                                   </div>
                              </CardContent>
                         </Card>

                         <Card className="bg-white border-0 shadow-sm">
                              <CardContent className="p-4 sm:p-6">
                                   <div className="flex items-center justify-between">
                                        <div>
                                             <p className="text-sm font-medium text-gray-500">Resolved</p>
                                             <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">{stats.resolved}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                             <CheckCircle className="h-6 w-6 text-green-600" />
                                        </div>
                                   </div>
                              </CardContent>
                         </Card>
                    </div>

                    {/* Main Content */}
                    <Card className="bg-white border-0 shadow-sm">
                         <div className="border-b border-gray-100 p-4">
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                   <Tabs value={activeTab} onValueChange={setActiveTab}>
                                        <TabsList className="bg-gray-100 p-1">
                                             <TabsTrigger value="all" className="data-[state=active]:bg-white px-4 py-2">All ({stats.total})</TabsTrigger>
                                             <TabsTrigger value="active" className="data-[state=active]:bg-white px-4 py-2">Active ({stats.active})</TabsTrigger>
                                             <TabsTrigger value="resolved" className="data-[state=active]:bg-white px-4 py-2">Resolved ({stats.resolved})</TabsTrigger>
                                        </TabsList>
                                   </Tabs>

                                   <div className="relative flex-1 sm:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                             placeholder="Search queries..."
                                             value={searchQuery}
                                             onChange={(e) => setSearchQuery(e.target.value)}
                                             className="pl-10 bg-gray-50 border-gray-200"
                                        />
                                   </div>
                              </div>
                         </div>

                         <div className="divide-y divide-gray-100">
                              {filteredTickets.map((ticket) => {
                                   const status = statusConfig[ticket.status] || statusConfig.IN_PROGRESS;
                                   const queryConfig = queryTypeConfig[ticket.queryType];

                                   return (
                                        <Link key={ticket.referenceId} href={`/track/${ticket.referenceId}`}>
                                             <div className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${ticket.hasPendingInfoRequest ? "bg-orange-50/50" : ""}`}>
                                                  <div className="flex items-start gap-4">
                                                       <div className={`w-10 h-10 sm:w-12 sm:h-12 ${queryConfig.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                            {ticket.queryType === "GRIEVANCE" ? <AlertCircle className={`h-5 w-5 sm:h-6 sm:w-6 ${queryConfig.color}`} /> : <MessageSquare className={`h-5 w-5 sm:h-6 sm:w-6 ${queryConfig.color}`} />}
                                                       </div>

                                                       <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                                 <div className="flex items-center gap-2 flex-wrap">
                                                                      <span className="font-mono text-sm font-semibold text-gray-900">{ticket.referenceId}</span>
                                                                      <Badge variant="outline" className={`${queryConfig.bgColor} ${queryConfig.color} border-0 text-xs`}>
                                                                           {queryConfig.label}
                                                                      </Badge>
                                                                      {ticket.hasPendingInfoRequest && (
                                                                           <Badge className="bg-orange-500 text-white text-xs">Action Required</Badge>
                                                                      )}
                                                                 </div>
                                                                 <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                                                            </div>

                                                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{ticket.subject}</p>

                                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                                 <span className="flex items-center gap-1">
                                                                      <LayoutDashboard className="h-3.5 w-3.5" />{ticket.section.name}
                                                                 </span>
                                                                 <span className="flex items-center gap-1">
                                                                      <Calendar className="h-3.5 w-3.5" />{new Date(ticket.createdAt).toLocaleDateString()}
                                                                 </span>
                                                            </div>
                                                       </div>

                                                       <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 hidden sm:block" />
                                                  </div>
                                             </div>
                                        </Link>
                                   );
                              })}
                         </div>
                    </Card>

                    {/* Quick Actions */}
                    <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <Link href="/submit?type=FEEDBACK">
                              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                   <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                             <MessageSquare className="h-6 w-6 text-emerald-600" />
                                        </div>
                                        <div>
                                             <h3 className="font-semibold text-gray-900">Submit Feedback</h3>
                                             <p className="text-sm text-gray-500">Share your experience</p>
                                        </div>
                                   </CardContent>
                              </Card>
                         </Link>

                         <Link href="/submit?type=GRIEVANCE">
                              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                   <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                             <AlertCircle className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div>
                                             <h3 className="font-semibold text-gray-900">File Grievance</h3>
                                             <p className="text-sm text-gray-500">Report an issue</p>
                                        </div>
                                   </CardContent>
                              </Card>
                         </Link>
                    </div>
               </div>
          </div>
     );
}
