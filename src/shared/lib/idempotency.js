export function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getIdempotencyHeaders(idempotencyKey = createIdempotencyKey()) {
  return {
    "Idempotency-Key": idempotencyKey,
  };
}
