import { users, type User, type InsertUser, messages, type Message, type InsertMessage } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

// Database-backed storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getMessages(): Promise<Message[]> {
    return db.select().from(messages).orderBy(messages.id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  // Initialize with a welcome message if none exists
  async initialize(): Promise<void> {
    const existingMessages = await this.getMessages();
    
    if (existingMessages.length === 0) {
      await this.createMessage({
        content: "Hello! I'm your AI assistant. How can I help you today?",
        role: "assistant"
      });
    }
  }
}

// Create and initialize the storage
export const storage = new DatabaseStorage();

// Initialize the database with welcome message
(async () => {
  try {
    await storage.initialize();
    console.log('Database storage initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database storage:', error);
  }
})();
