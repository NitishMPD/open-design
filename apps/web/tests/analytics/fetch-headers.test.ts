import { describe, expect, it } from 'vitest';

import { mergeFetchHeaders } from '../../src/analytics/fetch-headers';

describe('mergeFetchHeaders', () => {
  it('preserves content and workspace headers supplied as Headers', () => {
    const requestHeaders = new Headers({
      'content-type': 'application/json',
      'x-od-workspace-id': 'workspace-1',
    });

    const merged = mergeFetchHeaders(
      { 'x-od-analytics-device-id': 'device-1' },
      requestHeaders,
    );

    expect(merged.get('content-type')).toBe('application/json');
    expect(merged.get('x-od-workspace-id')).toBe('workspace-1');
    expect(merged.get('x-od-analytics-device-id')).toBe('device-1');
  });

  it('keeps explicit request headers authoritative', () => {
    const merged = mergeFetchHeaders(
      { 'x-request-id': 'analytics-request' },
      { 'x-request-id': 'caller-request' },
    );

    expect(merged.get('x-request-id')).toBe('caller-request');
  });
});
