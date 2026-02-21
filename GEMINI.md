# Trauma-Informed Care (TIC) Resource Guide: Project Standards

## 1. Vision & Purpose
A high-end, mindful micro-learning platform for stressed healthcare workers. The goal is to reduce cognitive load while providing evidence-based trauma-informed care resources through a curated, multi-step discovery process.

## 2. Tech Stack
- **Frontend**: React 19 (Vite) + Tailwind CSS v4.
- **Backend/DB**: Supabase (PostgreSQL).
- **Testing:** All new components must include a Vitest unit test.
- **State Management**: React Context + TanStack Query (for server state).
- **Routing**: React Router 7.
- **Icons**: Lucide React.
- **Auth**: Supabase Auth with RBAC (Role-Based Access Control).

## 3. Design System: "Calm Clinic"
- **Aesthetic**: Soft, approachable, professional, "Single Task" focus.
- **Palette**:
  - `Base`: Slate-50 (#f8fafc) - Background.
  - `Primary/Accent`: Sage-500 (#87a96b) - Growth & Safety.
  - `Secondary/Dusk`: Dusk-Blue-500 (#557ca4) - Trust & Professionalism.
  - `Surface`: White (#ffffff) - Cards & Modals.
- **Radius**: `rounded-2xl` (1rem) for basic components, `rounded-[2.5rem]` (2.5rem) for major containers and modals.
- **Typography**: Inter (Sans-serif), bold/black headings (font-black), relaxed line heights.

## 4. Core Logic: "The Discovery Flow"
- **Multi-Step Filtering**:
  1. **Time Lens**: Select duration (5m Micro-break, 20m Deep breath, 40m Focus session).
  2. **Energy/Type**: Select medium (Article, Video, Research Paper).
  3. **Population Filter**: Refine results by target population (Youth, Healthcare, Families, etc.).
- **Persistence**: Filters are synchronized with `localStorage` to maintain user context during sessions.
- **Unlock Mechanism**: Results and subsequent steps are progressively revealed to reduce choice paralysis.
- **Navigation**: Smooth auto-scrolling (`scrollIntoView`) with specific offsets (`scroll-mt-24`).

## 5. Security & Governance (RBAC)
- **Roles**:
  - `Public`: Read-only access to `resources`. Permission to `INSERT` into `proposed_resources`.
  - `Admin`: Full CRUD on `resources`. Access to `/admin` dashboard.
- **RBAC Implementation**:
  - `user_roles` table maps `user_id` to `role`.
  - Protected routes via `ProtectedRoute.jsx` component.
- **Row Level Security (RLS)**:
  - `resources`: Public SELECT. Admin ALL.
  - `proposed_resources`: Public INSERT. Admin ALL.
- **Bot Defense**: 
  - Honeypot fields on public contribution forms (`full_name_verification`).
  - Database-level validation for submission status.

## 6. Admin Features
- **Review Queue**: Interface for approving or rejecting user-submitted resources.
- **Direct Entry**: Ability for admins to manually add verified resources to the database.
- **Resource Management**: Global list view with delete capabilities for maintenance.
- **RPC Actions**: Uses Supabase RPC (`approve_resource`) for atomic approval operations.

## 7. Component & Animation Standards
- **Component Architecture**: 
  - `ResourceCard`: High scannability with type icons, duration badges, and population tags.
  - `ResourceViewer`: In-page iframe modal with "Open in New Tab" fallback.
  - `ContributionModal`: Multi-field form with feedback states and honeypot.
  - `Button`: Standardized styled component for project-wide consistency.
- **Animations (Tailwind v4 Custom)**:
  - `animate-fade-in-up`: Subtle entrance for sections.
  - `animate-scale-in`: Pop-in effect for cards and modals.
  - `animate-fade-in`: Backdrop transitions.
  - `stagger-X`: Incremental delays for list items.

## 8. Workflow Rules
- **Language**: All application content, resources, and UI text MUST be in English.
- **Information Density**: Strictly maintain one primary task per scroll-view.
- **Mobile First**: All layouts must be responsive, touch-friendly, and optimized for thumb navigation.
- **Content Quality**: Every resource must be tagged with a target population and estimated reading/viewing time.
- After completing a task or a significant set of changes, always propose a Git commit.
- Use the Conventional Commits format (e.g., feat: add login logic).
- Ask for permission to run: `git add . && git commit -m "<message>" && git push`.
