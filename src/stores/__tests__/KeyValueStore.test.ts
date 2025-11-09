// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import KeyValueStore, { type ExternalKeyValueStore } from '../KeyValueStore';

describe('default behavior', () => {
  it('stores and retrieves values', async () => {
    const store = new KeyValueStore();

    await store.put('key', 'value');
    await store.put('dessert', 'cookies');

    expect(await store.read('key')).toBe('value');
    expect(await store.read('dessert')).toBe('cookies');
  });

  it('returns default value if key not found', async () => {
    const store = new KeyValueStore();

    expect(await store.read('cookies', 'default')).toBe('default');
  });

  it('returns empty string if key not found and no default value provided', async () => {
    const store = new KeyValueStore();

    expect(await store.read('cookies')).toBe('');
  });
});

describe('with custom external store', () => {
  class TestExternalStore implements ExternalKeyValueStore {
    async get(key: string): Promise<string | null> {
      return key === 'exists' ? 'stored value' : null;
    }
    async set(_key: string, _value: string): Promise<void> {
      /* no-op */
    }
  }

  it('uses external store to read values', async () => {
    const store = new KeyValueStore(new TestExternalStore());

    store.put('exists', 'new value'); // should be ignored by external store

    expect(await store.read('exists')).toBe('stored value');
  });

  it('returns a default value when external store returns null', async () => {
    const store = new KeyValueStore(new TestExternalStore());

    expect(await store.read('nonexistent', 'default')).toBe('default');
  });

  it('returns an empty string when external store returns null and no default provided', async () => {
    const store = new KeyValueStore(new TestExternalStore());

    expect(await store.read('nonexistent')).toBe('');
  });
});
