import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get a room by room code
export const getRoom = query({
  args: { roomCode: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_roomCode", (q) => q.eq("roomCode", args.roomCode))
      .first();
    return room;
  },
});

// Check if room exists
export const roomExists = query({
  args: { roomCode: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_roomCode", (q) => q.eq("roomCode", args.roomCode))
      .first();
    return !!room;
  },
});

// Store/update a room
export const storeRoom = mutation({
  args: {
    roomCode: v.string(),
    game: v.any(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("rooms")
      .withIndex("by_roomCode", (q) => q.eq("roomCode", args.roomCode))
      .first();

    if (existing) {
      // Update existing room
      await ctx.db.patch(existing._id, {
        ...args.game,
        lastUpdate: Date.now(),
      });
    } else {
      // Create new room
      await ctx.db.insert("rooms", {
        ...args.game,
        lastUpdate: Date.now(),
      });
    }
  },
});

// Delete a room
export const deleteRoom = mutation({
  args: { roomCode: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_roomCode", (q) => q.eq("roomCode", args.roomCode))
      .first();
    if (room) {
      await ctx.db.delete(room._id);
    }
  },
});

// List all available rooms (waiting for a second player)
export const listRooms = query({
  handler: async (ctx) => {
    const rooms = await ctx.db.query("rooms").collect();
    return rooms
      .filter((room) => room.whitePlayer?.connected && !room.blackPlayer?.connected)
      .map((room) => ({
        roomCode: room.roomCode,
        hostName: room.whitePlayer?.name || 'Player',
        createdAt: room.createdAt,
      }));
  },
});
