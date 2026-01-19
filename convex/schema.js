import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    roomCode: v.string(),
    // White player (room creator)
    whitePlayer: v.optional(v.any()),
    // Black player (room joiner)
    blackPlayer: v.optional(v.any()),
    // Game state
    gameState: v.optional(v.any()),
    lastMove: v.optional(v.any()),
    gameStarted: v.optional(v.boolean()),
    // Timestamps
    createdAt: v.number(),
    lastUpdate: v.optional(v.number()),
  })
    .index("by_roomCode", ["roomCode"])
});
