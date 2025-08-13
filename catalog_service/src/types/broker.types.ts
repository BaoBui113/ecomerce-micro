export enum CatalogEvent {
  CREATE_ORDER = "create_order",
  CANCEL_ORDER = "cancel_order",
}

export type TOPIC_TYPE = "OrderEvents" | "CatalogEvents";

export interface MessageType {
  headers?: Record<string, any>;
  event: string; // Changed from CatalogEvent to string to accept any event type
  data: Record<string, any>;
}

export enum CatalogStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
