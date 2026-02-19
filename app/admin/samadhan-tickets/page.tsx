"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Search,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  Clock,
  User,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Eye,
  Send,
  Loader2,
  ArrowUpRight,
  FileText,
  Timer,
  RotateCcw,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner";
import { format, formatDistanceToNow, differenceInHours } from "date-fns";
import { mockOfficerTickets } from "@/lib/mock-data";

type TicketType = (typeof mockOfficerTickets)[0];

export default function MockSamadhanTicketsPage() {
  const [tickets, setTickets] = useState(mockOfficerTickets);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // View dialog
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewTicket, setViewTicket] = useState<TicketType | null>(null);

  // Update dialog
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTicket, setUpdateTicket] = useState<TicketType | null>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNote, setUpdateNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Stats
  const stats = useMemo(
    () => ({
      total: tickets.length,
      pending: tickets.filter((t) =>
        ["UNSEEN", "ASSIGNED", "IN_PROGRESS", "PENDING_INFORMATION"].includes(
          t.status,
        ),
      ).length,
      resolved: tickets.filter((t) => t.status === "RESOLVED").length,
      overdue: tickets.filter((t) => {
        const hours = differenceInHours(new Date(), new Date(t.createdAt));
        return hours > 72 && t.status !== "RESOLVED" && t.status !== "CLOSED";
      }).length,
    }),
    [tickets],
  );

  const filteredTickets = useMemo(() => {
    let filtered = [...tickets];

    // Tab filter
    if (activeTab === "pending") {
      filtered = filtered.filter((t) =>
        ["UNSEEN", "ASSIGNED", "IN_PROGRESS", "PENDING_INFORMATION"].includes(
          t.status,
        ),
      );
    } else if (activeTab === "resolved") {
      filtered = filtered.filter((t) => t.status === "RESOLVED");
    } else if (activeTab === "overdue") {
      filtered = filtered.filter((t) => {
        const hours = differenceInHours(new Date(), new Date(t.createdAt));
        return hours > 72 && t.status !== "RESOLVED" && t.status !== "CLOSED";
      });
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === filterStatus);
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.referenceId.toLowerCase().includes(q) ||
          (t.subject || "").toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }

    return filtered;
  }, [tickets, activeTab, filterStatus, searchQuery]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        variant: "default" | "secondary" | "destructive" | "outline";
        label: string;
        className?: string;
      }
    > = {
      UNSEEN: { variant: "destructive", label: "New" },
      ASSIGNED: { variant: "outline", label: "Assigned" },
      IN_PROGRESS: {
        variant: "default",
        label: "In Progress",
        className: "bg-blue-500",
      },
      PENDING_INFORMATION: {
        variant: "default",
        label: "Pending Info",
        className: "bg-amber-500",
      },
      RESOLVED: {
        variant: "default",
        label: "Resolved",
        className: "bg-green-500",
      },
      CLOSED: { variant: "secondary", label: "Closed" },
    };
    const config = statusMap[status] || {
      variant: "outline" as const,
      label: status,
    };
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <Badge variant="destructive">High</Badge>;
      case "MEDIUM":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "LOW":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getSLAIndicator = (ticket: TicketType) => {
    const hours = differenceInHours(new Date(), new Date(ticket.createdAt));
    if (ticket.status === "RESOLVED" || ticket.status === "CLOSED") {
      return (
        <span className="text-green-600 text-xs flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Completed
        </span>
      );
    }
    if (hours > 72) {
      return (
        <span className="text-red-600 text-xs flex items-center gap-1 font-medium">
          <Timer className="h-3 w-3" /> Overdue ({hours}h)
        </span>
      );
    }
    if (hours > 48) {
      return (
        <span className="text-amber-600 text-xs flex items-center gap-1">
          <Clock className="h-3 w-3" /> Approaching ({hours}h)
        </span>
      );
    }
    return (
      <span className="text-gray-500 text-xs flex items-center gap-1">
        <Clock className="h-3 w-3" /> {hours}h elapsed
      </span>
    );
  };

  const openViewDialog = (ticket: TicketType) => {
    setViewTicket(ticket);
    setShowViewDialog(true);
    // Mark UNSEEN → IN_PROGRESS
    if (ticket.status === "UNSEEN") {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticket.id ? { ...t, status: "IN_PROGRESS" } : t,
        ),
      );
    }
  };

  const openUpdateDialog = (ticket: TicketType) => {
    setUpdateTicket(ticket);
    setUpdateStatus(ticket.status);
    setUpdateNote("");
    setShowUpdateDialog(true);
  };

  const handleUpdate = () => {
    if (!updateStatus) {
      toast.error("Please select a status");
      return;
    }
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowUpdateDialog(false);
      setTickets((prev) =>
        prev.map((t) =>
          t.id === updateTicket?.id ? { ...t, status: updateStatus } : t,
        ),
      );
      toast.success(
        `Ticket ${updateTicket?.referenceId} updated to ${updateStatus.replace(/_/g, " ").toLowerCase()}`,
      );
      setUpdateTicket(null);
    }, 1000);
  };

  return (
    <div className="min-h-[60vh] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-2 transition-colors text-sm"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Admin
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-indigo-600" />
              My SAMADHAN Tickets
            </h1>
            <p className="text-gray-500">
              View and manage tickets assigned to you
            </p>
          </div>
          <Button
            onClick={() => toast.info("Mock: Tickets refreshed")}
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {stats.pending}
                  </p>
                </div>
                <RotateCcw className="h-8 w-8 text-amber-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.resolved}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.overdue}
                  </p>
                </div>
                <Timer className="h-8 w-8 text-red-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs + Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All ({tickets.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved ({stats.resolved})
              </TabsTrigger>
              <TabsTrigger value="overdue">
                Overdue ({stats.overdue})
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="UNSEEN">New</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="PENDING_INFORMATION">
                    Pending Info
                  </SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Ticket Cards - shown in all tabs, filtering handled via useMemo */}
          <TabsContent value={activeTab} className="mt-4">
            {filteredTickets.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No tickets found</h3>
                  <p className="text-gray-500 mt-1">
                    {activeTab === "overdue"
                      ? "Great! No tickets are overdue."
                      : "No tickets match your filters."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className={`transition-all hover:shadow-md ${
                      ticket.status === "UNSEEN"
                        ? "border-red-300 bg-red-50/30"
                        : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        {/* Left - ticket info */}
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {ticket.referenceId}
                            </code>
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                            {ticket.queryType === "GRIEVANCE" ? (
                              <Badge
                                variant="destructive"
                                className="gap-1 text-xs"
                              >
                                <AlertCircle className="h-3 w-3" />
                                Grievance
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500 gap-1 text-xs">
                                <MessageSquare className="h-3 w-3" />
                                Feedback
                              </Badge>
                            )}
                          </div>

                          {ticket.subject && (
                            <h3 className="font-medium text-sm truncate">
                              {ticket.subject}
                            </h3>
                          )}

                          <p className="text-sm text-gray-600 line-clamp-2">
                            {ticket.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {ticket.section.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(new Date(ticket.createdAt), "PP")}
                            </span>
                            {getSLAIndicator(ticket)}
                            {ticket.isAnonymousToOfficer && (
                              <span className="flex items-center gap-1 text-amber-600">
                                <User className="h-3 w-3" />
                                Anonymous
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right - actions */}
                        <div className="flex sm:flex-col items-center gap-2 sm:min-w-[120px] justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openViewDialog(ticket)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {ticket.status !== "RESOLVED" &&
                            ticket.status !== "CLOSED" && (
                              <Button
                                size="sm"
                                onClick={() => openUpdateDialog(ticket)}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Update
                              </Button>
                            )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
              <DialogDescription>
                Full details for assigned ticket
              </DialogDescription>
            </DialogHeader>

            {viewTicket && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <code className="font-mono text-lg">
                    {viewTicket.referenceId}
                  </code>
                  <div className="flex gap-2">
                    {getStatusBadge(viewTicket.status)}
                    {getPriorityBadge(viewTicket.priority)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium capitalize">
                      {viewTicket.queryType.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Section</p>
                    <p className="font-medium">{viewTicket.section.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="font-medium">
                      {format(new Date(viewTicket.createdAt), "PPp")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time Elapsed</p>
                    <p className="font-medium">
                      {formatDistanceToNow(new Date(viewTicket.createdAt))}
                    </p>
                  </div>
                </div>

                {viewTicket.subject && (
                  <div>
                    <p className="text-gray-500 text-sm">Subject</p>
                    <p className="font-medium">{viewTicket.subject}</p>
                  </div>
                )}

                <div>
                  <p className="text-gray-500 text-sm">Description</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg mt-1 whitespace-pre-wrap">
                    {viewTicket.description}
                  </p>
                </div>

                {!viewTicket.isAnonymousToOfficer &&
                  (viewTicket.citizenName || viewTicket.citizenPhone) && (
                    <div className="border-t pt-4">
                      <p className="text-gray-500 text-sm mb-2">
                        Contact Information
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {viewTicket.citizenName && (
                          <div>
                            <p className="text-gray-500">Name</p>
                            <p>{viewTicket.citizenName}</p>
                          </div>
                        )}
                        {viewTicket.citizenPhone && (
                          <div>
                            <p className="text-gray-500">Phone</p>
                            <p>{viewTicket.citizenPhone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {viewTicket.isAnonymousToOfficer && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">
                      This ticket was submitted anonymously
                    </span>
                  </div>
                )}

                {/* SLA */}
                <div className="border-t pt-4">
                  <p className="text-gray-500 text-sm mb-1">SLA Status</p>
                  {getSLAIndicator(viewTicket)}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowViewDialog(false)}
              >
                Close
              </Button>
              {viewTicket &&
                viewTicket.status !== "RESOLVED" &&
                viewTicket.status !== "CLOSED" && (
                  <Button
                    onClick={() => {
                      setShowViewDialog(false);
                      openUpdateDialog(viewTicket);
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Update Dialog */}
        <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Ticket Status</DialogTitle>
              <DialogDescription>
                Update the status and add a note for ticket{" "}
                {updateTicket?.referenceId}
              </DialogDescription>
            </DialogHeader>

            {updateTicket && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Status</span>
                    {getStatusBadge(updateTicket.status)}
                  </div>
                </div>

                <div>
                  <Label>New Status</Label>
                  <Select value={updateStatus} onValueChange={setUpdateStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select new status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="PENDING_INFORMATION">
                        Pending Information
                      </SelectItem>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Note (optional)</Label>
                  <Textarea
                    className="mt-1"
                    placeholder="Add a note about this update..."
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowUpdateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!updateStatus || isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Update
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
