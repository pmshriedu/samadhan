// Mock data store for SAMADHAN app

export const MOCK_OTP = "123456";

export const mockUser = {
  userId: "user-001",
  phone: "9876543210",
  name: "Bikash Thapa",
  pseudonym: "Helpful Citizen 42",
  email: "citizen42@samadhan.gov",
  address: "Below Deorali Bazaar, Gangtok, Sikkim - 737102",
};

export const mockSections = [
  {
    id: "sec-1",
    name: "Revenue Department",
    description: "Land and tax related services",
  },
  {
    id: "sec-2",
    name: "Health Department",
    description: "Healthcare and hospital services",
  },
  {
    id: "sec-3",
    name: "Education Department",
    description: "Schools, colleges and education",
  },
  {
    id: "sec-4",
    name: "Public Works Department",
    description: "Roads, buildings and infrastructure",
  },
  {
    id: "sec-5",
    name: "Water Supply Department",
    description: "Drinking water and sanitation",
  },
];

export const mockServices = [
  {
    id: "srv-1",
    name: "Land Records",
    description: "Fard, mutation, land certificates",
    sectionId: "sec-1",
    isActive: true,
  },
  {
    id: "srv-2",
    name: "Tax Collection",
    description: "Property tax, house tax",
    sectionId: "sec-1",
    isActive: true,
  },
  {
    id: "srv-3",
    name: "Hospital Services",
    description: "STNM Hospital services",
    sectionId: "sec-2",
    isActive: true,
  },
  {
    id: "srv-4",
    name: "Birth/Death Certificate",
    description: "Registration and certificates",
    sectionId: "sec-2",
    isActive: true,
  },
  {
    id: "srv-5",
    name: "School Admissions",
    description: "Government school admissions",
    sectionId: "sec-3",
    isActive: true,
  },
  {
    id: "srv-6",
    name: "Road Maintenance",
    description: "Potholes, road repairs",
    sectionId: "sec-4",
    isActive: true,
  },
  {
    id: "srv-7",
    name: "Water Connection",
    description: "New connection and billing",
    sectionId: "sec-5",
    isActive: true,
  },
];

export const mockCategories = [
  {
    id: "cat-1",
    name: "Delay in Processing",
    description: null,
    serviceId: "srv-1",
  },
  {
    id: "cat-2",
    name: "Staff Behavior",
    description: null,
    serviceId: "srv-1",
  },
  {
    id: "cat-3",
    name: "Document Issues",
    description: null,
    serviceId: "srv-1",
  },
  {
    id: "cat-4",
    name: "Wrong Information",
    description: null,
    serviceId: "srv-1",
  },
  {
    id: "cat-5",
    name: "Long Wait Time",
    description: null,
    serviceId: "srv-3",
  },
  {
    id: "cat-6",
    name: "Medicine Availability",
    description: null,
    serviceId: "srv-3",
  },
  {
    id: "cat-7",
    name: "Pothole Complaint",
    description: null,
    serviceId: "srv-6",
  },
  { id: "cat-8", name: "Water Leakage", description: null, serviceId: "srv-7" },
  {
    id: "cat-9",
    name: "Irregular Supply",
    description: null,
    serviceId: "srv-7",
  },
];

export interface MockTicket {
  referenceId: string;
  queryType: "FEEDBACK" | "GRIEVANCE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: string;
  section: { id: string; name: string };
  subject: string;
  description: string;
  createdAt: string;
  slaDeadline: string | null;
  hasAttachments: boolean;
  hasPendingInfoRequest: boolean;
  isDraft?: boolean;
  citizenPhone?: string;
  citizenName?: string;
  isAnonymousToOfficer?: boolean;
  visitedDC?: boolean;
  visitDate?: string;
  selectedServiceId?: string;
  resolutionMessage?: string | null;
  assignedOfficer?: { name: string; designation: string } | null;
  attachments?: Array<{
    id: string;
    fileName: string;
    originalName: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
  }>;
  infoRequests?: Array<{
    id: string;
    description: string;
    documentTypes: string | null;
    deadline: string;
    status: string;
    citizenResponse: string | null;
    respondedAt: string | null;
    createdAt: string;
  }>;
  statusHistory?: Array<{
    id: string;
    fromStatus: string | null;
    toStatus: string;
    changeReason: string | null;
    isSystemGenerated: boolean;
    createdAt: string;
  }>;
}

export const mockTickets: MockTicket[] = [
  {
    referenceId: "SAMADHAN-2026-02-03-00012",
    queryType: "GRIEVANCE",
    priority: "HIGH",
    status: "IN_PROGRESS",
    section: { id: "sec-1", name: "Revenue Department" },
    subject: "Delay in Land Mutation Process",
    description:
      "I applied for land mutation 3 months ago (Application No: MUT/2025/4567) but it is still pending without any update. I have visited the office multiple times but keep getting told to come back later. The delay is causing issues with my property sale.",
    createdAt: "2026-01-15T10:30:00Z",
    slaDeadline: "2026-02-15T10:30:00Z",
    hasAttachments: true,
    hasPendingInfoRequest: false,
    citizenPhone: "9876543210",
    citizenName: "Bikash Thapa",
    visitedDC: true,
    visitDate: "2026-01-15T10:30:00Z",
    selectedServiceId: "srv-1",
    resolutionMessage: null,
    assignedOfficer: {
      name: "Officer K. Sharma",
      designation: "Revenue Officer",
    },
    attachments: [
      {
        id: "att-1",
        fileName: "mutation_application.pdf",
        originalName: "mutation_application.pdf",
        fileType: "application/pdf",
        fileSize: 245000,
        createdAt: "2026-01-15T10:30:00Z",
      },
      {
        id: "att-2",
        fileName: "receipt.jpg",
        originalName: "receipt.jpg",
        fileType: "image/jpeg",
        fileSize: 180000,
        createdAt: "2026-01-15T10:30:00Z",
      },
    ],
    infoRequests: [],
    statusHistory: [
      {
        id: "sh-1",
        fromStatus: null,
        toStatus: "QUEUED",
        changeReason: "Ticket submitted",
        isSystemGenerated: true,
        createdAt: "2026-01-15T10:30:00Z",
      },
      {
        id: "sh-2",
        fromStatus: "QUEUED",
        toStatus: "UNSEEN",
        changeReason: "Assigned to Revenue Department",
        isSystemGenerated: true,
        createdAt: "2026-01-15T11:00:00Z",
      },
      {
        id: "sh-3",
        fromStatus: "UNSEEN",
        toStatus: "SEEN",
        changeReason: "Reviewed by officer",
        isSystemGenerated: false,
        createdAt: "2026-01-16T09:15:00Z",
      },
      {
        id: "sh-4",
        fromStatus: "SEEN",
        toStatus: "ACKNOWLEDGED",
        changeReason: "Acknowledged and assigned",
        isSystemGenerated: false,
        createdAt: "2026-01-17T10:00:00Z",
      },
      {
        id: "sh-5",
        fromStatus: "ACKNOWLEDGED",
        toStatus: "IN_PROGRESS",
        changeReason:
          "Investigation started - checking with sub-registrar office",
        isSystemGenerated: false,
        createdAt: "2026-01-20T14:30:00Z",
      },
    ],
  },
  {
    referenceId: "SAMADHAN-2026-01-28-00045",
    queryType: "FEEDBACK",
    priority: "LOW",
    status: "CLOSED",
    section: { id: "sec-2", name: "Health Department" },
    subject: "Excellent Service at STNM Hospital",
    description:
      "I want to appreciate the staff at STNM Hospital Emergency Ward for their quick response and excellent care during my recent visit. The new digital queue system is working very well.",
    createdAt: "2026-01-28T14:00:00Z",
    slaDeadline: null,
    hasAttachments: false,
    hasPendingInfoRequest: false,
    citizenPhone: "9876543210",
    citizenName: "Bikash Thapa",
    visitedDC: true,
    selectedServiceId: "srv-3",
    resolutionMessage: null,
    statusHistory: [
      {
        id: "sh-6",
        fromStatus: null,
        toStatus: "CLOSED",
        changeReason: "Feedback received",
        isSystemGenerated: true,
        createdAt: "2026-01-28T14:00:00Z",
      },
    ],
  },
  {
    referenceId: "SAMADHAN-2026-01-30-00078",
    queryType: "GRIEVANCE",
    priority: "MEDIUM",
    status: "PENDING_INFORMATION",
    section: { id: "sec-1", name: "Revenue Department" },
    subject: "Incorrect Details in Land Fard",
    description:
      "The fard issued for my property (Plot No: 234/A, Tadong) has wrong ownership details. The name mentioned is my late father's but the mutation was completed 2 years ago. This needs urgent correction.",
    createdAt: "2026-01-30T09:00:00Z",
    slaDeadline: "2026-02-28T09:00:00Z",
    hasAttachments: true,
    hasPendingInfoRequest: true,
    citizenPhone: "9876543210",
    citizenName: "Bikash Thapa",
    visitedDC: true,
    visitDate: "2026-01-30T09:00:00Z",
    selectedServiceId: "srv-1",
    resolutionMessage: null,
    assignedOfficer: {
      name: "Officer R. Lepcha",
      designation: "Junior Revenue Officer",
    },
    attachments: [
      {
        id: "att-3",
        fileName: "fard_copy.pdf",
        originalName: "fard_copy.pdf",
        fileType: "application/pdf",
        fileSize: 320000,
        createdAt: "2026-01-30T09:00:00Z",
      },
    ],
    infoRequests: [
      {
        id: "ir-1",
        description:
          "Please provide a copy of the completed mutation order and death certificate of the previous owner for verification.",
        documentTypes: "Mutation Order, Death Certificate",
        deadline: "2026-02-10T09:00:00Z",
        status: "PENDING",
        citizenResponse: null,
        respondedAt: null,
        createdAt: "2026-02-01T11:00:00Z",
      },
    ],
    statusHistory: [
      {
        id: "sh-7",
        fromStatus: null,
        toStatus: "QUEUED",
        changeReason: "Ticket submitted",
        isSystemGenerated: true,
        createdAt: "2026-01-30T09:00:00Z",
      },
      {
        id: "sh-8",
        fromStatus: "QUEUED",
        toStatus: "UNSEEN",
        changeReason: "Assigned to Revenue Department",
        isSystemGenerated: true,
        createdAt: "2026-01-30T09:30:00Z",
      },
      {
        id: "sh-9",
        fromStatus: "UNSEEN",
        toStatus: "SEEN",
        changeReason: null,
        isSystemGenerated: false,
        createdAt: "2026-01-31T10:00:00Z",
      },
      {
        id: "sh-10",
        fromStatus: "SEEN",
        toStatus: "PENDING_INFORMATION",
        changeReason: "Additional documents required for verification",
        isSystemGenerated: false,
        createdAt: "2026-02-01T11:00:00Z",
      },
    ],
  },
  {
    referenceId: "SAMADHAN-2026-02-01-00091",
    queryType: "GRIEVANCE",
    priority: "MEDIUM",
    status: "RESOLVED",
    section: { id: "sec-4", name: "Public Works Department" },
    subject: "Large Pothole on NH-10 Near Ranipool",
    description:
      "There is a dangerous pothole on the main highway near Ranipool junction which has caused multiple accidents. It needs immediate repair before the monsoon season.",
    createdAt: "2026-02-01T08:30:00Z",
    slaDeadline: "2026-03-01T08:30:00Z",
    hasAttachments: true,
    hasPendingInfoRequest: false,
    citizenPhone: "9876543210",
    citizenName: "Bikash Thapa",
    visitedDC: false,
    selectedServiceId: "srv-6",
    resolutionMessage:
      "The pothole has been repaired by the PWD maintenance team on 05-Feb-2026. A road inspection was conducted and the section has been permanently patched. Thank you for reporting this issue.",
    assignedOfficer: {
      name: "Officer T. Bhutia",
      designation: "Junior Engineer, PWD",
    },
    attachments: [
      {
        id: "att-4",
        fileName: "pothole_photo.jpg",
        originalName: "pothole_photo.jpg",
        fileType: "image/jpeg",
        fileSize: 450000,
        createdAt: "2026-02-01T08:30:00Z",
      },
    ],
    statusHistory: [
      {
        id: "sh-11",
        fromStatus: null,
        toStatus: "QUEUED",
        changeReason: "Ticket submitted",
        isSystemGenerated: true,
        createdAt: "2026-02-01T08:30:00Z",
      },
      {
        id: "sh-12",
        fromStatus: "QUEUED",
        toStatus: "UNSEEN",
        changeReason: "Assigned to PWD",
        isSystemGenerated: true,
        createdAt: "2026-02-01T09:00:00Z",
      },
      {
        id: "sh-13",
        fromStatus: "UNSEEN",
        toStatus: "ACKNOWLEDGED",
        changeReason: "Matter noted; site inspection scheduled",
        isSystemGenerated: false,
        createdAt: "2026-02-02T10:00:00Z",
      },
      {
        id: "sh-14",
        fromStatus: "ACKNOWLEDGED",
        toStatus: "IN_PROGRESS",
        changeReason: "Repair work commenced",
        isSystemGenerated: false,
        createdAt: "2026-02-04T08:00:00Z",
      },
      {
        id: "sh-15",
        fromStatus: "IN_PROGRESS",
        toStatus: "RESOLVED",
        changeReason: "Pothole repaired and road inspected",
        isSystemGenerated: false,
        createdAt: "2026-02-05T16:00:00Z",
      },
    ],
  },
  {
    referenceId: "SAMADHAN-2026-02-05-00102",
    queryType: "GRIEVANCE",
    priority: "LOW",
    status: "UNSEEN",
    section: { id: "sec-5", name: "Water Supply Department" },
    subject: "Irregular Water Supply in Deorali Area",
    description:
      "The water supply in Deorali area has been very irregular for the past 2 weeks. We are getting water only once in 3 days instead of the daily schedule. Request to look into this matter.",
    createdAt: "2026-02-05T07:00:00Z",
    slaDeadline: "2026-03-05T07:00:00Z",
    hasAttachments: false,
    hasPendingInfoRequest: false,
    citizenPhone: "9876543210",
    citizenName: "Bikash Thapa",
    visitedDC: false,
    selectedServiceId: "srv-7",
    resolutionMessage: null,
    statusHistory: [
      {
        id: "sh-16",
        fromStatus: null,
        toStatus: "QUEUED",
        changeReason: "Ticket submitted",
        isSystemGenerated: true,
        createdAt: "2026-02-05T07:00:00Z",
      },
      {
        id: "sh-17",
        fromStatus: "QUEUED",
        toStatus: "UNSEEN",
        changeReason: "Assigned to Water Supply Department",
        isSystemGenerated: true,
        createdAt: "2026-02-05T07:30:00Z",
      },
    ],
  },
];

// Session management (in-memory for mock)
let isLoggedIn = false;

export const mockAuth = {
  login: () => {
    isLoggedIn = true;
  },
  logout: () => {
    isLoggedIn = false;
  },
  isAuthenticated: () => isLoggedIn,
  getSession: () => (isLoggedIn ? mockUser : null),
};
