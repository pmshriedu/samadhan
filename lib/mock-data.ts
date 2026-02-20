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
    description: "Land records, mutation, parcha and revenue services",
  },
  {
    id: "sec-2",
    name: "Registration Department",
    description: "Firm, mortgage and deed registrations",
  },
  {
    id: "sec-3",
    name: "Certificate Services",
    description: "Income, caste, COI and related certificates",
  },
  {
    id: "sec-4",
    name: "Public Works Department",
    description: "Roads, buildings and infrastructure",
  },
  {
    id: "sec-5",
    name: "District Administration",
    description: "General administration and permits",
  },
  {
    id: "sec-6",
    name: "NOC Services",
    description: "No Objection Certificates and official clearances",
  },
  {
    id: "sec-7",
    name: "Residence Certificate (RC) Section",
    description: "RC issuance, rectification and duplicate services",
  },
  {
    id: "sec-8",
    name: "Election Section",
    description: "Voter ID and electoral roll services",
  },
  {
    id: "sec-9",
    name: "Disaster Management & Compensation",
    description: "Ex-gratia compensation and relief services",
  },
];

export const mockServices = [
  // Certificate Services
  {
    id: "srv-1",
    name: "COI Certificate",
    description: "Certificate of Identification services",
    sectionId: "sec-3",
    isActive: true,
  },
  {
    id: "srv-2",
    name: "Caste Certificate",
    description: "SC/ST/OBC caste certificates",
    sectionId: "sec-3",
    isActive: true,
  },

  // Revenue
  {
    id: "srv-3",
    name: "Land Records",
    description: "Fard, mutation and parcha related services",
    sectionId: "sec-1",
    isActive: true,
  },
  {
    id: "srv-4",
    name: "Land Revenue",
    description: "Property tax and land revenue collection",
    sectionId: "sec-1",
    isActive: true,
  },
  {
    id: "srv-21",
    name: "Mutation of Inheritance",
    description: "Mutation after death of landowner",
    sectionId: "sec-1",
    isActive: true,
  },
  {
    id: "srv-22",
    name: "Non-Encumbrance Certificate (NEC)",
    description: "Certificate confirming no liabilities",
    sectionId: "sec-1",
    isActive: true,
  },
  {
    id: "srv-23",
    name: "Encumbrance Certificate (EC)",
    description: "Encumbrance details for property",
    sectionId: "sec-1",
    isActive: true,
  },

  // Registration
  {
    id: "srv-5",
    name: "Firm Registration",
    description: "Registration of firm and partnership",
    sectionId: "sec-2",
    isActive: true,
  },
  {
    id: "srv-6",
    name: "Land Registration",
    description: "Sale deed / Gift deed registration",
    sectionId: "sec-2",
    isActive: true,
  },

  // District Administration
  {
    id: "srv-7",
    name: "Trade License",
    description: "Trade license issuance and renewal",
    sectionId: "sec-5",
    isActive: true,
  },
  {
    id: "srv-8",
    name: "Building Permission",
    description: "Building construction permits",
    sectionId: "sec-5",
    isActive: true,
  },

  // PWD
  {
    id: "srv-9",
    name: "Road Maintenance",
    description: "Pothole and road repair complaints",
    sectionId: "sec-4",
    isActive: true,
  },

  // NOC Services
  {
    id: "srv-10",
    name: "NOC for Loan",
    description: "No Objection Certificate for loan",
    sectionId: "sec-6",
    isActive: true,
  },
  {
    id: "srv-11",
    name: "NOC for Government Quarter",
    description: "No dwelling / government quarter NOC",
    sectionId: "sec-6",
    isActive: true,
  },

  // RC Section
  {
    id: "srv-12",
    name: "New RC Application",
    description: "Residence Certificate issuance",
    sectionId: "sec-7",
    isActive: true,
  },
  {
    id: "srv-13",
    name: "Duplicate RC",
    description: "Duplicate Residence Certificate",
    sectionId: "sec-7",
    isActive: true,
  },

  // Election
  {
    id: "srv-14",
    name: "New EPIC Card",
    description: "New voter ID application",
    sectionId: "sec-8",
    isActive: true,
  },
  {
    id: "srv-15",
    name: "EPIC Correction",
    description: "Correction in voter ID",
    sectionId: "sec-8",
    isActive: true,
  },

  // Disaster
  {
    id: "srv-16",
    name: "Ex-Gratia Compensation",
    description: "Compensation for death, injury or house damage",
    sectionId: "sec-9",
    isActive: true,
  },
];

export const mockCategories = [
  // General
  {
    id: "cat-1",
    name: "Processing Delay",
    description: null,
    serviceId: "srv-1",
  },
  {
    id: "cat-2",
    name: "Document Rejection",
    description: null,
    serviceId: "srv-1",
  },
  {
    id: "cat-3",
    name: "Wrong Information",
    description: null,
    serviceId: "srv-3",
  },
  {
    id: "cat-4",
    name: "Staff Behavior",
    description: null,
    serviceId: "srv-3",
  },

  // Revenue
  {
    id: "cat-5",
    name: "Mutation Delay",
    description: null,
    serviceId: "srv-21",
  },
  {
    id: "cat-6",
    name: "Boundary Dispute",
    description: null,
    serviceId: "srv-21",
  },
  {
    id: "cat-7",
    name: "NEC Not Issued",
    description: null,
    serviceId: "srv-22",
  },
  {
    id: "cat-8",
    name: "EC Not Issued",
    description: null,
    serviceId: "srv-23",
  },

  // Registration
  {
    id: "cat-9",
    name: "Registration Delay",
    description: null,
    serviceId: "srv-6",
  },

  // Trade License
  {
    id: "cat-10",
    name: "License Renewal Delay",
    description: null,
    serviceId: "srv-7",
  },

  // Building
  {
    id: "cat-11",
    name: "Permit Approval Delay",
    description: null,
    serviceId: "srv-8",
  },

  // PWD
  {
    id: "cat-12",
    name: "Pothole Complaint",
    description: null,
    serviceId: "srv-9",
  },
  { id: "cat-13", name: "Road Damage", description: null, serviceId: "srv-9" },

  // NOC
  { id: "cat-14", name: "NOC Delay", description: null, serviceId: "srv-10" },
  {
    id: "cat-15",
    name: "Amin Report Pending",
    description: null,
    serviceId: "srv-10",
  },

  // RC
  {
    id: "cat-16",
    name: "RC Verification Pending",
    description: null,
    serviceId: "srv-12",
  },
  {
    id: "cat-17",
    name: "Duplicate RC Delay",
    description: null,
    serviceId: "srv-13",
  },

  // Election
  {
    id: "cat-18",
    name: "EPIC Not Delivered",
    description: null,
    serviceId: "srv-14",
  },
  {
    id: "cat-19",
    name: "Name Correction Not Updated",
    description: null,
    serviceId: "srv-15",
  },

  // Disaster
  {
    id: "cat-20",
    name: "Compensation Not Received",
    description: null,
    serviceId: "srv-16",
  },

  // Additional categories for services without categories
  {
    id: "cat-21",
    name: "Caste Verification Delay",
    description: null,
    serviceId: "srv-2",
  },
  {
    id: "cat-22",
    name: "Category Change Delay",
    description: null,
    serviceId: "srv-2",
  },
  {
    id: "cat-23",
    name: "Tax Payment Issues",
    description: null,
    serviceId: "srv-4",
  },
  {
    id: "cat-24",
    name: "Revenue Collection Delay",
    description: null,
    serviceId: "srv-4",
  },
  {
    id: "cat-25",
    name: "Firm Registration Delay",
    description: null,
    serviceId: "srv-5",
  },
  {
    id: "cat-26",
    name: "Partnership Registration Issues",
    description: null,
    serviceId: "srv-5",
  },
  {
    id: "cat-27",
    name: "Government Quarter NOC Delay",
    description: null,
    serviceId: "srv-11",
  },
  {
    id: "cat-28",
    name: "Quarter Allocation Issues",
    description: null,
    serviceId: "srv-11",
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
    selectedServiceId: "srv-3",
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
    section: { id: "sec-3", name: "Certificate Services" },
    subject: "Excellent Service at District Certificate Office",
    description:
      "I want to appreciate the staff at the District Certificate Office for their quick response and excellent service. The new online application system is working very well.",
    createdAt: "2026-01-28T14:00:00Z",
    slaDeadline: null,
    hasAttachments: false,
    hasPendingInfoRequest: false,
    citizenPhone: "9876543210",
    citizenName: "Bikash Thapa",
    visitedDC: true,
    selectedServiceId: "srv-1",
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
    selectedServiceId: "srv-3",
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
    section: { id: "sec-5", name: "District Administration" },
    subject: "Delay in Trade License Renewal",
    description:
      "I applied for renewal of my trade license 3 weeks ago but haven't received any update. The application was submitted with all required documents. Request to expedite the process.",
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
        changeReason: "Assigned to District Administration",
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

// Mock officers for admin pages
export const mockOfficers = [
  {
    odId: "off-1",
    fullName: "Officer K. Sharma",
    email: "k.sharma@dac.gov.in",
    role: "SECTION_OFFICER",
    section: { sectionId: "sec-1", name: "Revenue Department" },
  },
  {
    odId: "off-2",
    fullName: "Officer R. Lepcha",
    email: "r.lepcha@dac.gov.in",
    role: "JUNIOR_OFFICER",
    section: { sectionId: "sec-1", name: "Revenue Department" },
  },
  {
    odId: "off-3",
    fullName: "Officer T. Bhutia",
    email: "t.bhutia@dac.gov.in",
    role: "JUNIOR_ENGINEER",
    section: { sectionId: "sec-4", name: "Public Works Department" },
  },
  {
    odId: "off-4",
    fullName: "Officer S. Rai",
    email: "s.rai@dac.gov.in",
    role: "SECTION_OFFICER",
    section: { sectionId: "sec-2", name: "Registration Department" },
  },
  {
    odId: "off-5",
    fullName: "Officer P. Tamang",
    email: "p.tamang@dac.gov.in",
    role: "SECTION_OFFICER",
    section: { sectionId: "sec-3", name: "Certificate Services" },
  },
  {
    odId: "off-6",
    fullName: "Officer M. Gurung",
    email: "m.gurung@dac.gov.in",
    role: "SECTION_OFFICER",
    section: { sectionId: "sec-5", name: "District Administration" },
  },
];

// Queue tickets - unassigned tickets waiting for assignment
export const mockQueueTickets = [
  {
    id: "qt-1",
    referenceId: "SAMADHAN-2026-02-05-00102",
    queryType: "GRIEVANCE" as const,
    priority: "MEDIUM" as const,
    status: "QUEUED",
    subject: "Delay in Trade License Renewal",
    description:
      "I applied for renewal of my trade license 3 weeks ago but haven't received any update. The application was submitted with all required documents.",
    visitedDC: false,
    visitDate: null,
    citizenName: "Bikash Thapa",
    citizenEmail: null,
    citizenPhone: "9876543210",
    isAnonymousToOfficer: false,
    createdAt: "2026-02-05T07:00:00Z",
    queuedAt: "2026-02-05T07:00:00Z",
    section: { id: "sec-5", name: "District Administration" },
    hasAttachments: false,
  },
  {
    id: "qt-2",
    referenceId: "SAMADHAN-2026-02-14-00130",
    queryType: "GRIEVANCE" as const,
    priority: "HIGH" as const,
    status: "QUEUED",
    subject: "Road Damage Near Gangtok Bypass",
    description:
      "Major road damage on the bypass road near 5th Mile. A large section of the road has caved in after recent rains creating a dangerous situation for commuters.",
    visitedDC: true,
    visitDate: "2026-02-14T10:00:00Z",
    citizenName: null,
    citizenEmail: null,
    citizenPhone: null,
    isAnonymousToOfficer: true,
    createdAt: "2026-02-14T10:30:00Z",
    queuedAt: "2026-02-14T10:30:00Z",
    section: { id: "sec-4", name: "Public Works Department" },
    hasAttachments: true,
  },
  {
    id: "qt-3",
    referenceId: "SAMADHAN-2026-02-15-00145",
    queryType: "GRIEVANCE" as const,
    priority: "LOW" as const,
    status: "QUEUED",
    subject: "Building Permission Delay",
    description:
      "I applied for building permission for my house construction 2 months ago. The application is still under process with no clear timeline provided.",
    visitedDC: false,
    visitDate: null,
    citizenName: "Tashi Doma",
    citizenEmail: "tashi.d@email.com",
    citizenPhone: "9876543211",
    isAnonymousToOfficer: false,
    createdAt: "2026-02-15T08:00:00Z",
    queuedAt: "2026-02-15T08:00:00Z",
    section: { id: "sec-5", name: "District Administration" },
    hasAttachments: false,
  },
];

// Officer assigned tickets for the officer dashboard view
export const mockOfficerTickets = [
  {
    id: "ot-1",
    referenceId: "SAMADHAN-2026-02-03-00012",
    queryType: "GRIEVANCE" as const,
    priority: "HIGH" as const,
    status: "IN_PROGRESS",
    section: { id: "sec-1", name: "Revenue Department" },
    citizenName: "Bikash Thapa",
    citizenPhone: "9876543210",
    subject: "Delay in Land Mutation Process",
    description:
      "I applied for land mutation 3 months ago but it is still pending without any update.",
    visitDate: "2026-01-15T10:30:00Z",
    assignedOfficer: {
      id: "off-1",
      name: "Officer K. Sharma",
      designation: "Revenue Officer",
      role: "SECTION_OFFICER",
    },
    escalatedTo: null,
    slaStatus: "YELLOW" as const,
    slaDeadline: "2026-02-15T10:30:00Z",
    slaBreachedAt: null,
    createdAt: "2026-01-15T10:30:00Z",
    hasAttachments: true,
    pendingInfoRequests: 0,
    isOverdue: false,
    isSlaBreached: false,
    isAnonymousToOfficer: false,
  },
  {
    id: "ot-2",
    referenceId: "SAMADHAN-2026-01-30-00078",
    queryType: "GRIEVANCE" as const,
    priority: "MEDIUM" as const,
    status: "PENDING_INFORMATION",
    section: { id: "sec-1", name: "Revenue Department" },
    citizenName: "Bikash Thapa",
    citizenPhone: "9876543210",
    subject: "Incorrect Details in Land Fard",
    description: "The fard issued for my property has wrong ownership details.",
    visitDate: "2026-01-30T09:00:00Z",
    assignedOfficer: {
      id: "off-2",
      name: "Officer R. Lepcha",
      designation: "Junior Revenue Officer",
      role: "JUNIOR_OFFICER",
    },
    escalatedTo: null,
    slaStatus: "GREEN" as const,
    slaDeadline: "2026-02-28T09:00:00Z",
    slaBreachedAt: null,
    createdAt: "2026-01-30T09:00:00Z",
    hasAttachments: true,
    pendingInfoRequests: 1,
    isOverdue: false,
    isSlaBreached: false,
    isAnonymousToOfficer: false,
  },
  {
    id: "ot-3",
    referenceId: "SAMADHAN-2026-02-01-00091",
    queryType: "GRIEVANCE" as const,
    priority: "MEDIUM" as const,
    status: "RESOLVED",
    section: { id: "sec-4", name: "Public Works Department" },
    citizenName: "Bikash Thapa",
    citizenPhone: "9876543210",
    subject: "Large Pothole on NH-10 Near Ranipool",
    description:
      "There is a dangerous pothole on the main highway near Ranipool junction.",
    visitDate: null,
    assignedOfficer: {
      id: "off-3",
      name: "Officer T. Bhutia",
      designation: "Junior Engineer, PWD",
      role: "JUNIOR_ENGINEER",
    },
    escalatedTo: null,
    slaStatus: "GREEN" as const,
    slaDeadline: "2026-03-01T08:30:00Z",
    slaBreachedAt: null,
    createdAt: "2026-02-01T08:30:00Z",
    hasAttachments: true,
    pendingInfoRequests: 0,
    isOverdue: false,
    isSlaBreached: false,
    isAnonymousToOfficer: false,
  },
  {
    id: "ot-4",
    referenceId: "SAMADHAN-2026-02-10-00115",
    queryType: "GRIEVANCE" as const,
    priority: "HIGH" as const,
    status: "UNSEEN",
    section: { id: "sec-3", name: "Certificate Services" },
    citizenName: "Karma Wangchuk",
    citizenPhone: "9876543211",
    subject: "Delay in COI Certificate Issuance",
    description:
      "I applied for Certificate of Income 3 weeks ago but haven't received it yet. The application was submitted with all required documents including income proof and identity proof.",
    visitDate: "2026-02-10T11:00:00Z",
    assignedOfficer: {
      id: "off-5",
      name: "Officer P. Tamang",
      designation: "Certificate Officer",
      role: "SECTION_OFFICER",
    },
    escalatedTo: null,
    slaStatus: "RED" as const,
    slaDeadline: "2026-02-20T11:00:00Z",
    slaBreachedAt: null,
    createdAt: "2026-02-10T11:00:00Z",
    hasAttachments: false,
    pendingInfoRequests: 0,
    isOverdue: true,
    isSlaBreached: false,
    isAnonymousToOfficer: false,
  },
];
