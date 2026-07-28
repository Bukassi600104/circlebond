export type ServiceStatus = "ok" | "degraded" | "error";

export type HealthResponse = {
  status: ServiceStatus;
  application: ServiceStatus;
  firebase: "configured" | "not_configured";
  sqlConnect: "pending_remote_verification" | "not_configured";
  environment: string;
  timestamp: string;
};
