'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  threatAlerts,
  survivorRegistry,
  resourceExchange,
  knowledgeCapsules,
  situationSummaries,
  communicationEvents,
} from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Threat Alerts
export async function getThreatAlerts() {
  const userId = await getUserId()
  return db
    .select()
    .from(threatAlerts)
    .where(eq(threatAlerts.userId, userId))
    .orderBy(desc(threatAlerts.createdAt))
}

export async function getActiveThreatAlerts() {
  const userId = await getUserId()
  return db
    .select()
    .from(threatAlerts)
    .where(and(eq(threatAlerts.userId, userId), eq(threatAlerts.isActive, true)))
    .orderBy(desc(threatAlerts.severity))
}

export async function createThreatAlert(data: {
  threatType: string
  severity: string
  location: string
  latitude?: number
  longitude?: number
  description?: string
}) {
  const userId = await getUserId()
  await db.insert(threatAlerts).values({
    userId,
    ...data,
  })
  revalidatePath('/')
}

export async function updateThreatAlert(id: number, data: any) {
  const userId = await getUserId()
  await db
    .update(threatAlerts)
    .set(data)
    .where(and(eq(threatAlerts.id, id), eq(threatAlerts.userId, userId)))
  revalidatePath('/')
}

export async function deleteThreatAlert(id: number) {
  const userId = await getUserId()
  await db
    .delete(threatAlerts)
    .where(and(eq(threatAlerts.id, id), eq(threatAlerts.userId, userId)))
  revalidatePath('/')
}

// Survivor Registry
export async function getSurvivors() {
  const userId = await getUserId()
  return db
    .select()
    .from(survivorRegistry)
    .where(eq(survivorRegistry.userId, userId))
    .orderBy(desc(survivorRegistry.createdAt))
}

export async function getVerifiedSurvivors() {
  return db
    .select()
    .from(survivorRegistry)
    .where(eq(survivorRegistry.verificationStatus, 'verified'))
    .orderBy(desc(survivorRegistry.lastSeen))
}

export async function createSurvivor(data: {
  displayName: string
  location: string
  skills?: string
  healthStatus?: string
  groupSize?: number
  contactMethod?: string
}) {
  const userId = await getUserId()
  await db.insert(survivorRegistry).values({
    userId,
    ...data,
  })
  revalidatePath('/')
}

export async function updateSurvivor(id: number, data: any) {
  const userId = await getUserId()
  await db
    .update(survivorRegistry)
    .set(data)
    .where(and(eq(survivorRegistry.id, id), eq(survivorRegistry.userId, userId)))
  revalidatePath('/')
}

// Resource Exchange
export async function getResources() {
  const userId = await getUserId()
  return db
    .select()
    .from(resourceExchange)
    .where(eq(resourceExchange.userId, userId))
    .orderBy(desc(resourceExchange.createdAt))
}

export async function getAvailableResources() {
  return db
    .select()
    .from(resourceExchange)
    .where(eq(resourceExchange.exchangeStatus, 'open'))
    .orderBy(desc(resourceExchange.createdAt))
}

export async function createResource(data: {
  resourceType: string
  quantity: number
  location: string
  condition?: string
  availability?: string
}) {
  const userId = await getUserId()
  await db.insert(resourceExchange).values({
    userId,
    ...data,
  })
  revalidatePath('/')
}

export async function updateResource(id: number, data: any) {
  const userId = await getUserId()
  await db
    .update(resourceExchange)
    .set(data)
    .where(and(eq(resourceExchange.id, id), eq(resourceExchange.userId, userId)))
  revalidatePath('/')
}

export async function deleteResource(id: number) {
  const userId = await getUserId()
  await db
    .delete(resourceExchange)
    .where(and(eq(resourceExchange.id, id), eq(resourceExchange.userId, userId)))
  revalidatePath('/')
}

// Knowledge Capsules
export async function getKnowledgeCapsules() {
  const userId = await getUserId()
  return db
    .select()
    .from(knowledgeCapsules)
    .where(eq(knowledgeCapsules.userId, userId))
    .orderBy(desc(knowledgeCapsules.priority))
}

export async function getAllKnowledgeCapsules() {
  return db
    .select()
    .from(knowledgeCapsules)
    .orderBy(desc(knowledgeCapsules.priority))
}

export async function createKnowledgeCapsule(data: {
  title: string
  category: string
  content: string
  location?: string
  priority?: string
}) {
  const userId = await getUserId()
  await db.insert(knowledgeCapsules).values({
    userId,
    ...data,
  })
  revalidatePath('/')
}

// Situation Summaries
export async function getSituationSummaries() {
  const userId = await getUserId()
  return db
    .select()
    .from(situationSummaries)
    .where(eq(situationSummaries.userId, userId))
    .orderBy(desc(situationSummaries.createdAt))
}

export async function getLatestSituationSummaries() {
  return db
    .select()
    .from(situationSummaries)
    .orderBy(desc(situationSummaries.createdAt))
    .limit(10)
}

export async function createSituationSummary(data: {
  region: string
  summary: string
  affectedPopulation?: number
  infrastructureStatus?: string
  resourceAvailability?: string
  confidence?: number
}) {
  const userId = await getUserId()
  await db.insert(situationSummaries).values({
    userId,
    ...data,
  })
  revalidatePath('/')
}

// Communication Events
export async function logCommunicationEvent(data: {
  eventType: string
  recipientId?: string
  message?: string
  status?: string
}) {
  const userId = await getUserId()
  await db.insert(communicationEvents).values({
    userId,
    ...data,
  })
  revalidatePath('/')
}

export async function getCommunicationEvents() {
  const userId = await getUserId()
  return db
    .select()
    .from(communicationEvents)
    .where(eq(communicationEvents.userId, userId))
    .orderBy(desc(communicationEvents.timestamp))
}

// Dashboard aggregation
export async function getDashboardMetrics() {
  const userId = await getUserId()

  const [threats, survivors, resources, situations] = await Promise.all([
    db
      .select()
      .from(threatAlerts)
      .where(and(eq(threatAlerts.userId, userId), eq(threatAlerts.isActive, true))),
    db
      .select()
      .from(survivorRegistry)
      .where(eq(survivorRegistry.userId, userId)),
    db
      .select()
      .from(resourceExchange)
      .where(and(eq(resourceExchange.userId, userId), eq(resourceExchange.exchangeStatus, 'open'))),
    db
      .select()
      .from(situationSummaries)
      .where(eq(situationSummaries.userId, userId))
      .orderBy(desc(situationSummaries.createdAt))
      .limit(5),
  ])

  const criticalThreats = threats.filter((t) => t.severity === 'critical').length
  const allVerifiedSurvivors = await getVerifiedSurvivors()

  return {
    activeThreatCount: threats.length,
    criticalThreatCount: criticalThreats,
    survivorCount: survivors.length,
    verifiedSurvivorCount: allVerifiedSurvivors.length,
    availableResourceCount: resources.length,
    regionsSummary: situations,
    threatSeverityDistribution: {
      critical: threats.filter((t) => t.severity === 'critical').length,
      high: threats.filter((t) => t.severity === 'high').length,
      medium: threats.filter((t) => t.severity === 'medium').length,
      low: threats.filter((t) => t.severity === 'low').length,
    },
  }
}
