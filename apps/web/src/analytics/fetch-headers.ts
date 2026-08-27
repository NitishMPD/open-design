/**
 * Merge fetch headers without losing entries from a Headers instance.
 *
 * Object spread only copies enumerable object properties, while Headers keeps
 * its values internally. Call-site headers intentionally win so explicit
 * request context keeps the same precedence as the previous object merge.
 */
export function mergeFetchHeaders(
  defaults: HeadersInit,
  requestHeaders?: HeadersInit,
): Headers {
  const merged = new Headers(defaults);
  new Headers(requestHeaders).forEach((value, name) => {
    merged.set(name, value);
  });
  return merged;
}
