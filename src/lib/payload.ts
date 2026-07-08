import { getPayload } from 'payload'
import config from '@payload-config'

// Cached Payload Local API client for server components / route handlers.
export const getPayloadClient = () => getPayload({ config })
