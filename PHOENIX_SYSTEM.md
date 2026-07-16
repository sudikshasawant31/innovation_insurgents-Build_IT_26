# PHOENIX - Civilization Operating System
## Emergency Coordination and Survival Protocol Network

### System Overview
PHOENIX is a comprehensive emergency coordination platform designed for crisis situations, survivor management, resource distribution, and civilization rebuilding. Built with Next.js 16, React, TypeScript, Tailwind CSS, and Neon PostgreSQL with Better Auth.

### Tech Stack
- **Frontend**: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js Server Actions, Drizzle ORM
- **Database**: Neon PostgreSQL
- **Authentication**: Better Auth (email + password)
- **Data Fetching**: SWR (Stale-While-Revalidate)
- **UI Framework**: shadcn/ui components

### Core Modules

#### 1. **Dashboard** (`/dashboard`)
Main operational hub with real-time metrics:
- Active threat count and severity distribution
- Registered survivor tracking
- Verified survivor registry
- Available resources overview
- Regional situation summaries
- Quick access to all major systems

#### 2. **Knowledge Capsules** (`/knowledge`)
Survival information and protocols:
- Searchable database of survival techniques
- Categorized by: Survival, Medical, Supply, Security, Communication
- Priority-based filtering (Critical, High, Medium)
- Location-specific information
- Add and manage knowledge entries

#### 3. **Situation Map** (`/map`)
Geographic threat and resource visualization:
- Interactive map showing threat locations
- Resource point markers
- Survivor location data
- Regional status reports
- Confidence levels for data accuracy

#### 4. **Survivor Registry** (`/survivors`)
Community member database:
- Verified survivors with skills verification
- Location tracking
- Group size management
- Health status monitoring (Stable, Recovering, Critical)
- Contact methods and communication protocols
- Skill tags for expertise identification

#### 5. **Resource Exchange** (`/resources`)
Global trading and logistics:
- Resource listings with quantities
- Availability status (Available, Limited, Unavailable)
- Condition ratings (Excellent, Good, Fair)
- Location-based filtering
- Request trade functionality
- Resource types: Water, Food, Medical, Shelter, Power, Communications, Tools

#### 6. **Intelligence Center** (`/intelligence`)
AI-analyzed regional analysis:
- Threat escalation pattern analysis
- Network health metrics
- Data quality assurance (94%+)
- Regional intelligence summaries
- Infrastructure and resource availability status
- Predictive threat assessment

### Database Schema

#### Authentication Tables (Better Auth)
- `user` - User accounts
- `session` - Session management
- `account` - OAuth/provider accounts
- `verification` - Email verification and password reset

#### Core Application Tables
- **knowledge_capsules**: Survival protocols and knowledge entries
- **resource_exchange**: Available resources for trading
- **survivor_registry**: Verified survivor profiles and contacts
- **threat_alerts**: Active threats with severity and location
- **situation_summaries**: Regional emergency status reports
- **communication_events**: Inter-survivor communication logs

### API Routes
All routes use server actions located in `/app/actions/phoenix.ts`:
- `getThreatAlerts()` - Get user's threat reports
- `getActiveThreatAlerts()` - Get active threats only
- `createThreatAlert()` - Report new threat
- `getSurvivors()` - Get registered survivors
- `getVerifiedSurvivors()` - Get verified community members
- `createSurvivor()` - Register survivor
- `getResources()` - Get user resources
- `getAvailableResources()` - Get marketplace resources
- `createResource()` - List resource for trade
- `getKnowledgeCapsules()` - Access survival knowledge
- `getAllKnowledgeCapsules()` - Search all knowledge
- `createKnowledgeCapsule()` - Add survival protocol
- `getSituationSummaries()` - Regional reports
- `getLatestSituationSummaries()` - Top regional reports
- `getDashboardMetrics()` - Dashboard statistics

### Design System

#### Color Palette (Dark Futuristic Theme)
- **Primary**: Cyan (#00d9ff) - Main accent, highlights
- **Secondary**: Amber (#ffa500) - Warnings, secondary actions
- **Alert**: Red (#ff3333) - Critical alerts, dangers
- **Success**: Lime Green (#1eff00) - Operational status, safe
- **Background**: Deep Blue (#0a0f2c) - Primary dark background
- **Card**: Navy Blue (#1a2555) - Card and container backgrounds
- **Text**: Light Blue (#e0e8ff) - Primary text
- **Muted**: Slate Blue (#374a6f) - Secondary text

#### Components
- `DashboardCard` - Statistics and metric display
- `PhoenixHeader` - Navigation with logo and logout
- `ThreatBadge` - Threat severity indicators
- UI Primitives: Card, Input, Label, Button

#### Animations
- Framer Motion for page transitions and widget stagger
- CSS animations: Pulse, grid movement, alert pulse
- Smooth hover effects and transitions
- Loading states with spinner

### Authentication Flow
1. Landing page checks session status
2. Unauthenticated users see landing/sign-in/sign-up
3. Authenticated users see dashboard
4. Protected routes require session validation
5. Server actions use `getUserId()` for per-user data scoping
6. Better Auth manages sessions and cookies

### User Workflows

#### Emergency Response
1. User signs into dashboard
2. Reviews active threats and critical alerts
3. Checks survivor registry for available personnel
4. Locates resources on situation map
5. Coordinates response through communication hub

#### Knowledge Sharing
1. Navigate to Knowledge Capsules
2. Search by category or keyword
3. Filter by priority (Critical > High > Medium)
4. Review detailed survival protocols
5. Add new knowledge for community benefit

#### Resource Management
1. Access Resource Exchange
2. Browse available resources by type
3. Check condition and availability
4. Request trades with other survivors
5. Track ongoing exchanges

#### Community Building
1. Register as verified survivor in registry
2. List skills and expertise
3. Set contact method (Radio, Satellite, etc.)
4. Connect with other survivors
5. Coordinate group activities

### Security Features
- Email + password authentication via Better Auth
- Session-based security
- Per-user data scoping (no cross-user data access)
- Parameterized queries preventing SQL injection
- HTTPS enforced in production
- CSRF protection via Next.js
- Input validation and sanitization

### Performance Optimizations
- SWR for client-side caching and revalidation
- Server actions for efficient data mutation
- CSS Grid and Flexbox for layout
- Image optimization with next/image
- Code splitting and lazy loading
- CSS animations over JavaScript animations

### Deployment
- Deploy to Vercel with `vercel` CLI
- Environment variables configured in Vercel dashboard
- GitHub integration for continuous deployment
- Auto-scaling for traffic spikes
- CDN for static assets

### Getting Started

#### Local Development
```bash
# Install dependencies
pnpm install

# Set up environment variables
# Create .env.local with DATABASE_URL and BETTER_AUTH_SECRET

# Run development server
pnpm dev

# Access at http://localhost:3000
```

#### Production Deployment
```bash
# Deploy to Vercel
vercel

# Or use GitHub integration for automatic deployments
```

### Environment Variables Required
- `DATABASE_URL` - Neon PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Random 32+ character string for session signing

### Known Limitations
- Map visualization is placeholder (ready for MapLibre integration)
- Intelligence analysis is static mock data
- No persistent file uploads (ready for Blob storage integration)
- Communication is event-logged only (not real-time messaging)

### Future Enhancements
- Real-time WebSocket communication
- MapLibre GL integration for interactive maps
- Video/image upload and sharing
- Advanced search and filtering
- User notifications system
- Analytics dashboard
- Mobile application
- Offline-first capabilities
- Blockchain verification for critical data

### Documentation
- Database schema: See `/lib/db/schema.ts`
- Server actions: See `/app/actions/phoenix.ts`
- Authentication setup: See `/lib/auth.ts`
- UI components: See `/components/`

---

**PHOENIX System v1.0** - Built for emergency coordination and civilization rebuilding during crisis situations.
