// Mock data store for SAMADHAN app

export const MOCK_OTP = "123456";

export const mockUser = {
  userId: "user-001",
  phone: "9876543210",
  name: "Bikash Thapa",
  pseudonym: "Helpful Citizen 42",
  email: "citizen42@samadhan.gov",
  address: "123 Main Street, Mianwali",
};

export const mockSections = [
  { id: "sec-1", name: "Revenue Department", description: "Land and tax related" },
  { id: "sec-2", name: "Health Department", description: "Healthcare services" },
  { id: "sec-3", name: "Education Department", description: "Schools and colleges" },
];

export const mockServices = [
  { id: "srv-1", name: "Land Records", description: "Fard, mutation etc.", sectionId: "sec-1" },
  { id: "srv-2", name: "Tax Collection", description: "Property tax", sectionId: "sec-1" },
  { id: "srv-3", name: "Hospital Services", description: "DHQ services", sectionId: "sec-2" },
];

export const mockCategories = [
  { id: "cat-1", name: "Delay in Processing", serviceId: "srv-1" },
  { id: "cat-2", name: "Staff Behavior", serviceId: "srv-1" },
  { id: "cat-3", name: "Document Issues", serviceId: "srv-1" },
];

export const mockTickets = [
  {
    referenceId: "SAM-2026-001234",
    queryType: "GRIEVANCE" as const,
    priority: "HIGH" as const,
    status: "IN_PROGRESS",
    section: { id: "sec-1", name: "Revenue Department" },
    subject: "Delay in Land Mutation",
    description: "I applied for land mutation 3 months ago but still pending without any update.",
    createdAt: "2026-01-15T10:30:00Z",
    slaDeadline: "2026-02-15T10:30:00Z",
    hasAttachments: true,
    hasPendingInfoRequest: false,
  },
  {
    referenceId: "SAM-2026-001235",
    queryType: "FEEDBACK" as const,
    priority: "LOW" as const,
    status: "RESOLVED",
    section: { id: "sec-2", name: "Health Department" },
    subject: "Excellent Service at DHQ",
    description: "I want to appreciate the staff at DHQ Hospital for their quick response.",
    createdAt: "2026-01-20T14:00:00Z",
    slaDeadline: null,
    hasAttachments: false,
    hasPendingInfoRequest: false,
  },
  {
    referenceId: "SAM-2026-001236",
    queryType: "GRIEVANCE" as const,
    priority: "MEDIUM" as const,
    status: "PENDING_INFORMATION",
    section: { id: "sec-1", name: "Revenue Department" },
    subject: "Incorrect Fard Details",
    description: "The fard issued has wrong ownership details that need correction.",
    createdAt: "2026-01-25T09:00:00Z",
    slaDeadline: "2026-02-25T09:00:00Z",
    hasAttachments: true,
    hasPendingInfoRequest: true,
  },
];

// Session management (in-memory for mock)
let isLoggedIn = false;

export const mockAuth = {
  login: () => { isLoggedIn = true; },
  logout: () => { isLoggedIn = false; },
  isAuthenticated: () => isLoggedIn,
  getSession: () => isLoggedIn ? mockUser : null,
};
