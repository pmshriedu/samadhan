# SAMADHAN Citizen Portal - Component Structure

## 📁 Directory Structure

```
/app
  /samadhan
    /login
      page.tsx          ✅ Login with OTP verification
    /dashboard
      page.tsx          ✅ Citizen dashboard with ticket overview
    /profile
      page.tsx          ✅ User profile management
    /submit
      page.tsx          ✅ Multi-step query submission form
    /track
      /[referenceId]
        page.tsx        ✅ Track ticket by reference ID
    layout.tsx          ✅ Layout for samadhan section
    
/lib
  mock-data.ts          ✅ Mock data store with authentication
  utils.ts              ✅ Utility functions
```

## 🎯 Features Implemented

### 1. **Login Page** (`/samadhan/login`)
- Phone number input with validation
- OTP verification (Mock OTP: `123456`)
- Guest access option
- Responsive design with gradient backgrounds

### 2. **Dashboard Page** (`/samadhan/dashboard`)
- Welcome section with user name
- Statistics cards (Total, Active, Action Required, Resolved)
- Ticket listing with search and filter
- Tab navigation (All, Active, Resolved)
- Quick action cards for feedback and grievances
- Protected route (redirects to login if not authenticated)

### 3. **Profile Page** (`/samadhan/profile`)
- Display user information
- Pseudonym privacy feature (show/hide)
- Editable fields (name, address)
- Disabled fields for verified data (phone, email)
- Privacy alert about pseudonym usage

### 4. **Submit Page** (`/samadhan/submit`)
- 7-step wizard form:
  1. Query type selection (Grievance/Feedback)
  2. DC office visit confirmation
  3. Service selection
  4. Subject input
  5. Description textarea
  6. Contact information
  7. Review and submit
- Progress bar indicator
- Success modal with reference ID
- Navigation to track page after submission

### 5. **Track Page** (`/samadhan/track/[referenceId]`)
- Dynamic route for any reference ID
- Ticket details display
- Progress timeline
- Status badges
- Action required alerts
- Fallback for non-existent tickets

## 🔐 Mock Authentication

The mock authentication system is in `/lib/mock-data.ts`:

```typescript
// Login
mockAuth.login()

// Logout
mockAuth.logout()

// Check authentication
mockAuth.isAuthenticated()

// Get current user
mockAuth.getSession()
```

**Mock OTP:** `123456`

## 📊 Mock Data

### Mock User
- Name: Muhammad Ali
- Phone: 9876543210
- Pseudonym: Helpful Citizen 42

### Mock Tickets
- SAM-2026-001234 (Grievance - In Progress)
- SAM-2026-001235 (Feedback - Resolved)
- SAM-2026-001236 (Grievance - Pending Information)

### Mock Services
- Land Records (Revenue Department)
- Tax Collection (Revenue Department)
- Hospital Services (Health Department)

## 🎨 Design Features

- **Gradient backgrounds** for visual appeal
- **Responsive design** for mobile and desktop
- **Status color coding** for quick identification
- **Interactive cards** with hover effects
- **Progress indicators** for multi-step forms
- **Modal dialogs** for confirmations
- **Badge components** for status display

## 🚀 Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Home: http://localhost:3000
   - Login: http://localhost:3000/samadhan/login
   - Dashboard: http://localhost:3000/samadhan/dashboard

3. **Test the flow:**
   - Login with any 10-digit phone number
   - Use OTP: `123456`
   - Explore dashboard, submit queries, track tickets

## 🔄 Navigation Flow

```
Login (/samadhan/login)
  ↓
Dashboard (/samadhan/dashboard)
  ↓
  ├─→ Submit Query (/samadhan/submit)
  │     ↓
  │   Success Modal
  │     ↓
  │   Track Page (/samadhan/track/[id])
  │
  ├─→ Profile (/samadhan/profile)
  │
  └─→ Track Ticket (/samadhan/track/[id])
```

## ✅ All Components Added Successfully

All components have been added to your project structure without breaking any existing functionality. The components use:

- ✅ Existing UI components from `/components/ui`
- ✅ Next.js 14+ App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Lucide React icons
- ✅ shadcn/ui components

## 🎯 Next Steps

You can now:
1. Test all the pages in your browser
2. Customize the mock data in `/lib/mock-data.ts`
3. Replace mock authentication with real API calls
4. Add more features as needed
5. Connect to a real backend

---

**Note:** All pages are fully functional with mock data. The authentication is client-side only for demonstration purposes.
