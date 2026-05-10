/**
 * In-flight request deduplication.
 *
 * If `factory` is already running for a given `key`, additional calls
 * share the existing Promise instead of starting a new run. The map
 * entry clears once the Promise settles, so retries after errors and
 * subsequent calls after success both start fresh.
 *
 * Rejection propagates to every awaiting caller.
 */
const inflight = new Map<string, Promise<unknown>>();

export function dedupe<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const promise = factory().finally(() => {
    inflight.delete(key);
  });
  inflight.set(key, promise);
  return promise;
}
