import type { CollectionBeforeValidateHook } from 'payload'
import { APIError } from 'payload'
import sharp from 'sharp'

// Rejects image uploads whose longest edge is under `minEdge` pixels, so small
// low-resolution photos don't end up looking soft when enlarged on the site.
// Only runs when a new file is being uploaded.
export const requireMinImageEdge = (minEdge: number): CollectionBeforeValidateHook =>
  async ({ data, req }) => {
    const file = req.file
    if (!file?.data) return data

    let width = 0
    let height = 0
    try {
      const meta = await sharp(file.data).metadata()
      width = meta.width ?? 0
      height = meta.height ?? 0
    } catch {
      // Not a readable image — let Payload's own upload validation handle it.
      return data
    }

    const longest = Math.max(width, height)
    if (longest > 0 && longest < minEdge) {
      // APIError (400) surfaces the message cleanly in the admin instead of a
      // generic 500.
      throw new APIError(
        `This image is too small (${width}×${height}px). Please upload a photo at least ${minEdge}px on its longest side — ideally the original from a phone or camera.`,
        400,
      )
    }

    return data
  }
