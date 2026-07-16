import { pgTable, text, timestamp, boolean, serial, integer, decimal } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// --- PHOENIX App Tables ---
export const knowledgeCapsules = pgTable('knowledge_capsules', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  content: text('content').notNull(),
  location: text('location'),
  priority: text('priority').default('medium'),
  status: text('status').default('archived'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const resourceExchange = pgTable('resource_exchange', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  resourceType: text('resourceType').notNull(),
  quantity: integer('quantity').notNull(),
  location: text('location').notNull(),
  condition: text('condition'),
  availability: text('availability').default('available'),
  offeringUserId: text('offeringUserId'),
  requestingUserId: text('requestingUserId'),
  exchangeStatus: text('exchangeStatus').default('open'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const survivorRegistry = pgTable('survivor_registry', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  displayName: text('displayName').notNull(),
  location: text('location').notNull(),
  skills: text('skills'),
  healthStatus: text('healthStatus').default('stable'),
  groupSize: integer('groupSize').default(1),
  contactMethod: text('contactMethod'),
  verificationStatus: text('verificationStatus').default('unverified'),
  lastSeen: timestamp('lastSeen').notNull().defaultNow(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const threatAlerts = pgTable('threat_alerts', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  threatType: text('threatType').notNull(),
  severity: text('severity').default('medium'),
  location: text('location').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  description: text('description'),
  isActive: boolean('isActive').default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const situationSummaries = pgTable('situation_summaries', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  region: text('region').notNull(),
  summary: text('summary').notNull(),
  affectedPopulation: integer('affectedPopulation'),
  infrastructureStatus: text('infrastructureStatus'),
  resourceAvailability: text('resourceAvailability'),
  confidence: decimal('confidence', { precision: 3, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const communicationEvents = pgTable('communication_events', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  eventType: text('eventType').notNull(),
  recipientId: text('recipientId'),
  message: text('message'),
  status: text('status').default('pending'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
})
