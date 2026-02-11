"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  Loader2,
  Download,
  Calendar,
  User,
  Building,
  Shield,
  Eye,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";
import { mockTickets, mockAuth, type MockTicket } from "@/lib/mock-data";

const statusConfig: Record<
  string,
  { color: string; bgColor: string; label: string; icon: React.ElementType }
> = {
  UNSEEN: {
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    label: "Pending Review",
    icon: Clock,
  },
  SEEN: {
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    label: "Under Review",
    icon: Eye,
  },
  ACKNOWLEDGED: {
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    label: "Acknowledged",
    icon: CheckCircle,
  },
  IN_PROGRESS: {
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    label: "In Progress",
    icon: RefreshCw,
  },
  PENDING_INFORMATION: {
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    label: "Information Requested",
    icon: AlertTriangle,
  },
  RESOLVED: {
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    label: "Resolved",
    icon: CheckCircle,
  },
  CLOSED: {
    color: "text-green-600",
    bgColor: "bg-green-100",
    label: "Closed",
    icon: CheckCircle,
  },
  CLOSED_NO_RESPONSE: {
    color: "text-red-600",
    bgColor: "bg-red-100",
    label: "Closed - No Response",
    icon: XCircle,
  },
  ESCALATED: {
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    label: "Escalated",
    icon: AlertCircle,
  },
  APPEALED: {
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    label: "Appealed - Under Review",
    icon: AlertCircle,
  },
};

const queryTypeConfig = {
  FEEDBACK: { icon: MessageSquare, color: "green" },
  GRIEVANCE: { icon: AlertCircle, color: "red" },
};

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ referenceId: string }>;
}) {
  const { referenceId } = use(params);
  const router = useRouter();
  const [ticket, setTicket] = useState<MockTicket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [selectedInfoRequestId, setSelectedInfoRequestId] = useState<
    string | null
  >(null);
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [appealReason, setAppealReason] = useState("");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const found = mockTickets.find((t) => t.referenceId === referenceId);
      if (found) {
        if (found.queryType === "FEEDBACK") {
          toast.error(
            "Feedback submissions cannot be tracked. You can view them in your dashboard.",
          );
          router.push("/");
          return;
        }
        setTicket(found);
      } else {
        toast.error("Ticket not found");
        router.push("/");
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [referenceId, router]);

  const handleAcceptResolution = () => {
    toast.success("Resolution accepted. Thank you!");
  };

  const handleSubmitInfoResponse = (requestId: string) => {
    if (!responseText.trim()) {
      toast.error("Please provide a response");
      return;
    }
    setIsSubmittingResponse(true);
    setTimeout(() => {
      toast.success("Response submitted successfully");
      setResponseText("");
      setSelectedInfoRequestId(null);
      setIsSubmittingResponse(false);
    }, 1000);
  };

  const handleFileAppeal = () => {
    if (appealReason.length < 20) {
      toast.error(
        "Please provide a detailed reason for appeal (at least 20 characters)",
      );
      return;
    }
    toast.success("Appeal filed successfully");
    setIsAppealModalOpen(false);
    setAppealReason("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Ticket not found</p>
      </div>
    );
  }

  const status = statusConfig[ticket.status] || statusConfig.UNSEEN;
  const StatusIcon = status.icon;
  const queryConfig = queryTypeConfig[ticket.queryType];
  const QueryIcon = queryConfig.icon;
  const pendingInfoRequest = ticket.infoRequests?.find(
    (r) => r.status === "PENDING",
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Main Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 ${
                    ticket.queryType === "GRIEVANCE"
                      ? "bg-red-100"
                      : "bg-green-100"
                  } rounded-lg flex items-center justify-center`}
                >
                  <QueryIcon
                    className={`h-6 w-6 ${
                      ticket.queryType === "GRIEVANCE"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {ticket.referenceId}
                  </CardTitle>
                  <CardDescription>
                    {ticket.queryType.charAt(0) +
                      ticket.queryType.slice(1).toLowerCase()}
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${status.color} border-current`}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Ticket Summary Card */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Ticket Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Query Type */}
                <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      ticket.queryType === "GRIEVANCE"
                        ? "bg-red-100"
                        : "bg-green-100"
                    }`}
                  >
                    <QueryIcon
                      className={`h-5 w-5 ${
                        ticket.queryType === "GRIEVANCE"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Query Type</p>
                    <p className="font-semibold text-gray-900">
                      {ticket.queryType.charAt(0) +
                        ticket.queryType.slice(1).toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                {ticket.queryType === "GRIEVANCE" && (
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        ticket.priority === "HIGH"
                          ? "bg-red-100"
                          : ticket.priority === "MEDIUM"
                            ? "bg-amber-100"
                            : "bg-blue-100"
                      }`}
                    >
                      <AlertCircle
                        className={`h-5 w-5 ${
                          ticket.priority === "HIGH"
                            ? "text-red-600"
                            : ticket.priority === "MEDIUM"
                              ? "text-amber-600"
                              : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Priority Level</p>
                      <p className="font-semibold text-gray-900">
                        {ticket.priority.charAt(0) +
                          ticket.priority.slice(1).toLowerCase()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Section */}
                {ticket.queryType === "GRIEVANCE" && (
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                      <Building className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Section/Department
                      </p>
                      <p className="font-semibold text-gray-900">
                        {ticket.section.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submitted Date */}
                <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Submitted On</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(ticket.createdAt), "PPp")}
                    </p>
                  </div>
                </div>

                {/* SLA Deadline */}
                {ticket.slaDeadline && (
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-100">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Expected Resolution
                      </p>
                      <p className="font-semibold text-gray-900">
                        {format(new Date(ticket.slaDeadline), "PPp")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Assigned Officer */}
                {ticket.assignedOfficer && (
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm sm:col-span-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned Officer</p>
                      <p className="font-semibold text-gray-900">
                        {ticket.assignedOfficer.name}
                        {ticket.assignedOfficer.designation && (
                          <span className="text-gray-500 font-normal text-sm ml-1">
                            ({ticket.assignedOfficer.designation})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            {/* Attachments */}
            <Separator />
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Attachments
                </h3>
                {ticket.attachments && ticket.attachments.length > 0 && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {ticket.attachments.length} file(s) attached
                  </span>
                )}
              </div>

              {ticket.attachments && ticket.attachments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ticket.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center space-x-2 p-3 rounded-lg transition-colors bg-gray-50 hover:bg-gray-100"
                    >
                      <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          title={attachment.originalName}
                        >
                          {attachment.originalName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {attachment.fileType?.split("/")[1]?.toUpperCase() ||
                            "File"}
                          {attachment.fileSize &&
                            ` • ${(attachment.fileSize / 1024).toFixed(1)} KB`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toast.info("Mock: File download simulated")
                        }
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No attachments were added
                </p>
              )}
            </div>

            {/* Resolution Message */}
            {ticket.resolutionMessage && (
              <>
                <Separator />
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolution
                  </h3>
                  <p className="text-green-700 whitespace-pre-wrap">
                    {ticket.resolutionMessage}
                  </p>

                  {/* Action Buttons for Resolved Status */}
                  {ticket.status === "RESOLVED" && (
                    <div className="mt-4 flex gap-3">
                      <Button
                        onClick={handleAcceptResolution}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept Resolution
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsAppealModalOpen(true)}
                      >
                        File Appeal
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Information Request Response */}
            {pendingInfoRequest && (
              <>
                <Separator />
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Information Requested
                  </h3>
                  <p className="text-orange-700 mb-3">
                    {pendingInfoRequest.description}
                  </p>
                  <p className="text-sm text-orange-600 mb-4">
                    Deadline:{" "}
                    {format(new Date(pendingInfoRequest.deadline), "PPp")}
                  </p>

                  {selectedInfoRequestId === pendingInfoRequest.id ? (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Your response..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleSubmitInfoResponse(pendingInfoRequest.id)
                          }
                          disabled={isSubmittingResponse}
                        >
                          {isSubmittingResponse ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4 mr-2" />
                          )}
                          Submit Response
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedInfoRequestId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() =>
                        setSelectedInfoRequestId(pendingInfoRequest.id)
                      }
                    >
                      Respond Now
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Status Timeline */}
        {ticket.statusHistory && ticket.statusHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticket.statusHistory.map((history) => {
                  const historyStatus =
                    statusConfig[history.toStatus] || statusConfig.UNSEEN;
                  const HistoryIcon = historyStatus.icon;

                  return (
                    <div
                      key={history.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${historyStatus.bgColor}`}
                      >
                        <HistoryIcon
                          className={`h-4 w-4 ${historyStatus.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{historyStatus.label}</p>
                        {history.changeReason && (
                          <p className="text-sm text-gray-600 whitespace-pre-line">
                            {history.changeReason}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          {format(new Date(history.createdAt), "PPp")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appeal Modal */}
        {isAppealModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>File Appeal</CardTitle>
                <CardDescription>
                  If you are not satisfied with the resolution, you can file an
                  appeal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Please explain why you are appealing this resolution..."
                  value={appealReason}
                  onChange={(e) => setAppealReason(e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-gray-500">
                  Minimum 20 characters required
                </p>
                <div className="flex gap-2">
                  <Button onClick={handleFileAppeal} className="flex-1">
                    Submit Appeal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAppealModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
