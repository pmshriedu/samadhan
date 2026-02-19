"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2,
  Search,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  Clock,
  User,
  Building2,
  ArrowUpRight,
  Inbox,
  UserPlus,
  Eye,
  ArrowLeft,
  CheckCircle2,
  Gavel,
} from "lucide-react";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { mockQueueTickets, mockOfficers, mockSections } from "@/lib/mock-data";

export default function MockSamadhanQueuePage() {
  const [tickets, setTickets] = useState(mockQueueTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSection, setFilterSection] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // Assignment dialog
  const [selectedTicket, setSelectedTicket] = useState<
    (typeof mockQueueTickets)[0] | null
  >(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);

  // View dialog
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewTicket, setViewTicket] = useState<
    (typeof mockQueueTickets)[0] | null
  >(null);

  // Stats
  const stats = {
    total: tickets.length,
    grievances: tickets.filter((t) => t.queryType === "GRIEVANCE").length,
    highPriority: tickets.filter((t) => t.priority === "HIGH").length,
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filterSection !== "all" && ticket.section.id !== filterSection)
      return false;
    if (filterPriority !== "all" && ticket.priority !== filterPriority)
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        ticket.referenceId.toLowerCase().includes(q) ||
        (ticket.subject || "").toLowerCase().includes(q) ||
        ticket.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

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

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "GRIEVANCE":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" /> Grievance
          </Badge>
        );
      case "FEEDBACK":
        return (
          <Badge className="bg-green-500 gap-1">
            <MessageSquare className="h-3 w-3" /> Feedback
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const openAssignDialog = (ticket: (typeof mockQueueTickets)[0]) => {
    setSelectedTicket(ticket);
    setSelectedOfficer("");
    setSelectedPriority(ticket.priority || "");
    setShowAssignDialog(true);
  };

  const openViewDialog = (ticket: (typeof mockQueueTickets)[0]) => {
    setViewTicket(ticket);
    setShowViewDialog(true);
  };

  const handleAssign = () => {
    if (!selectedOfficer || !selectedPriority) {
      toast.error("Please select an officer and priority");
      return;
    }
    setIsAssigning(true);
    setTimeout(() => {
      setIsAssigning(false);
      setShowAssignDialog(false);
      // Remove ticket from queue
      setTickets((prev) => prev.filter((t) => t.id !== selectedTicket?.id));
      const officer = mockOfficers.find((o) => o.odId === selectedOfficer);
      toast.success(
        `Ticket assigned to ${officer?.fullName || "officer"} with ${selectedPriority} priority`,
      );
      setSelectedTicket(null);
      setSelectedOfficer("");
      setSelectedPriority("");
    }, 1200);
  };

  const filteredOfficers = selectedTicket
    ? mockOfficers.filter(
        (o) => o.section?.sectionId === selectedTicket.section.id,
      )
    : [];

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
              <Gavel className="h-6 w-6 text-blue-600" />
              SAMADHAN Queue
            </h1>
            <p className="text-gray-500">
              Review and assign queued tickets to section officers
            </p>
          </div>
          <Button
            onClick={() => toast.info("Mock: Queue refreshed")}
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total in Queue</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Inbox className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Grievances</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.grievances}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">High Priority</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {stats.highPriority}
                  </p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-amber-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by reference ID, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={filterSection} onValueChange={setFilterSection}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {mockSections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Queue Table */}
        <Card>
          <CardHeader>
            <CardTitle>Queued Tickets</CardTitle>
            <CardDescription>
              Tickets waiting to be assigned to section officers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Queue is empty!</h3>
                <p className="text-gray-500 mt-1">
                  All tickets have been assigned to officers.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {ticket.referenceId}
                          </code>
                        </TableCell>
                        <TableCell>{getTypeBadge(ticket.queryType)}</TableCell>
                        <TableCell>
                          {getPriorityBadge(ticket.priority)}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {ticket.subject || ticket.description.slice(0, 50)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">
                              {ticket.section.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {formatDistanceToNow(new Date(ticket.createdAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openViewDialog(ticket)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openAssignDialog(ticket)}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assign Dialog */}
        <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Ticket</DialogTitle>
              <DialogDescription>
                Assign this ticket to a section officer for handling.
              </DialogDescription>
            </DialogHeader>

            {selectedTicket && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference</span>
                    <code className="font-mono">
                      {selectedTicket.referenceId}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    {getTypeBadge(selectedTicket.queryType)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Section</span>
                    <span>{selectedTicket.section.name}</span>
                  </div>
                </div>

                <div>
                  <Label>Select Officer</Label>
                  <Select
                    value={selectedOfficer}
                    onValueChange={setSelectedOfficer}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose an officer..." />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredOfficers.length > 0 ? (
                        filteredOfficers.map((officer) => (
                          <SelectItem key={officer.odId} value={officer.odId}>
                            <span className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>{officer.fullName}</span>
                              <Badge variant="outline" className="ml-2">
                                {officer.role}
                              </Badge>
                            </span>
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem key="none" value="none" disabled>
                          No officers in this section
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {filteredOfficers.length === 0 && selectedTicket && (
                    <p className="text-sm text-amber-600 mt-2">
                      No officers found in {selectedTicket.section.name} section
                    </p>
                  )}
                </div>

                <div>
                  <Label>Priority Level</Label>
                  <Select
                    value={selectedPriority}
                    onValueChange={setSelectedPriority}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Set priority level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          High Priority
                        </span>
                      </SelectItem>
                      <SelectItem value="MEDIUM">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Medium Priority
                        </span>
                      </SelectItem>
                      <SelectItem value="LOW">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-400" />
                          Low Priority
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAssignDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssign}
                disabled={!selectedOfficer || !selectedPriority || isAssigning}
              >
                {isAssigning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign Officer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Ticket Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
              <DialogDescription>
                Review ticket information before assignment
              </DialogDescription>
            </DialogHeader>

            {viewTicket && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-lg">
                    {viewTicket.referenceId}
                  </code>
                  <div className="flex gap-2">
                    {getTypeBadge(viewTicket.queryType)}
                    {getPriorityBadge(viewTicket.priority)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
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
                </div>

                {viewTicket.subject && (
                  <div>
                    <p className="text-gray-500 text-sm">Subject</p>
                    <p className="font-medium">{viewTicket.subject}</p>
                  </div>
                )}

                <div>
                  <p className="text-gray-500 text-sm">Description</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg mt-1">
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
                      Citizen opted for anonymous submission
                    </span>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowViewDialog(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowViewDialog(false);
                  if (viewTicket) openAssignDialog(viewTicket);
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Assign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
