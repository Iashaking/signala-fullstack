import { users, searches, signals, type User, type InsertUser, type Search, type InsertSearch, type Signal, type InsertSignal } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Saved searches
  getSavedSearches(userId: number): Promise<Search[]>;
  createSavedSearch(search: InsertSearch & { userId: number }): Promise<Search>;
  deleteSavedSearch(searchId: number, userId: number): Promise<void>;
  
  // Saved signals
  getSavedSignals(userId: number): Promise<Signal[]>;
  createSavedSignal(signal: InsertSignal): Promise<Signal>;
  deleteSavedSignal(signalId: number, userId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private searches: Map<number, Search>;
  private signals: Map<number, Signal>;
  private currentUserId: number;
  private currentSearchId: number;
  private currentSignalId: number;

  constructor() {
    this.users = new Map();
    this.searches = new Map();
    this.signals = new Map();
    this.currentUserId = 1;
    this.currentSearchId = 1;
    this.currentSignalId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Saved searches methods
  async getSavedSearches(userId: number): Promise<Search[]> {
    return Array.from(this.searches.values()).filter(search => search.userId === userId);
  }

  async createSavedSearch(insertSearch: InsertSearch & { userId: number }): Promise<Search> {
    const id = this.currentSearchId++;
    const search: Search = {
      id,
      userId: insertSearch.userId,
      name: insertSearch.name,
      businessIdea: insertSearch.businessIdea,
      platforms: insertSearch.platforms,
      searchType: insertSearch.searchType,
      intentLevel: insertSearch.intentLevel,
      timeRange: insertSearch.timeRange,
      maxResults: insertSearch.maxResults,
      resultsCount: null,
      createdAt: new Date()
    };
    this.searches.set(id, search);
    return search;
  }

  async deleteSavedSearch(searchId: number, userId: number): Promise<void> {
    const search = this.searches.get(searchId);
    if (search && search.userId === userId) {
      this.searches.delete(searchId);
    }
  }

  // Saved signals methods
  async getSavedSignals(userId: number): Promise<Signal[]> {
    return Array.from(this.signals.values()).filter(signal => signal.userId === userId);
  }

  async createSavedSignal(insertSignal: InsertSignal): Promise<Signal> {
    const id = this.currentSignalId++;
    const signal: Signal = {
      id,
      userId: insertSignal.userId,
      searchId: insertSignal.searchId || null,
      platform: insertSignal.platform,
      title: insertSignal.title,
      snippet: insertSignal.snippet,
      url: insertSignal.url,
      source: insertSignal.source,
      relevanceScore: insertSignal.relevanceScore,
      urgencyLevel: insertSignal.urgencyLevel,
      signalType: insertSignal.signalType,
      engagement: insertSignal.engagement || {},
      isSaved: insertSignal.isSaved || null,
      createdAt: new Date()
    };
    this.signals.set(id, signal);
    return signal;
  }

  async deleteSavedSignal(signalId: number, userId: number): Promise<void> {
    const signal = this.signals.get(signalId);
    if (signal && signal.userId === userId) {
      this.signals.delete(signalId);
    }
  }
}

export const storage = new MemStorage();
