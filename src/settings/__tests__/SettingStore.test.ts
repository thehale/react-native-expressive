// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { SettingsStore } from '../SettingsStore';
import type { Setting, Settings } from '../types';

describe('settings', () => {
  it('initialize to their defined default values', () => {
    const store = new SettingsStore(createTestDefinitions());

    expect(store.getSnapshot()).toEqual({
      dessert: 'cookies',
      price: 10,
      open: true,
    });
  });

  it('can update one at a time', async () => {
    const store = new SettingsStore(createTestDefinitions());

    store.update({ dessert: 'pie' });

    expect(store.getSnapshot()).toEqual({
      dessert: 'pie',
      price: 10,
      open: true,
    });
  });

  it('can update multiple at once', async () => {
    const store = new SettingsStore(createTestDefinitions());

    store.update({ dessert: 'cake', price: 20, open: false });

    expect(store.getSnapshot()).toEqual({
      dessert: 'cake',
      price: 20,
      open: false,
    });
  });

  it('rejects invalid updates', async () => {
    const store = new SettingsStore(createTestDefinitions());

    store.update({
      dessert: 'brussel sprouts',
      price: -5,
      open: 'yes' as unknown as boolean,
    });

    expect(store.getSnapshot()).toEqual({
      dessert: 'cookies',
      price: 10,
      open: true,
    });
  });

  it('rejects updates to unknown settings', async () => {
    const store = new SettingsStore(createTestDefinitions());

    // @ts-expect-error Testing invalid key
    store.update({ unknown: 'value' });

    expect(store.getSnapshot()).toEqual({
      dessert: 'cookies',
      price: 10,
      open: true,
    });
  });

  it('can reset to default values', async () => {
    const store = new SettingsStore(createTestDefinitions());

    store.update({ dessert: 'pie', price: 15, open: false });
    expect(store.getSnapshot()).toEqual({
      dessert: 'pie',
      price: 15,
      open: false,
    });

    store.reset();
    expect(store.getSnapshot()).toEqual({
      dessert: 'cookies',
      price: 10,
      open: true,
    });
  });
});

describe('subscribe', () => {
  it('supports listening for updates', async () => {
    const store = new SettingsStore(createTestDefinitions());
    const listener = jest.fn();

    const unsubscribe = store.subscribe(listener, 'test-listener');
    store.update({ dessert: 'cake' });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith();

    unsubscribe();
    store.update({ price: 20 });

    expect(listener).toHaveBeenCalledTimes(1); // No additional calls after unsubscribe
  });

  it('does not notify listeners on invalid updates', () => {
    const store = new SettingsStore(createTestDefinitions());
    const listener = jest.fn();

    store.subscribe(listener, 'test-listener');
    store.update({ dessert: 'brussel sprouts' });

    expect(listener).not.toHaveBeenCalled();
  });

  it('does not notify listeners when no values change', () => {
    const store = new SettingsStore(createTestDefinitions());
    const listener = jest.fn();

    store.subscribe(listener, 'test-listener');
    store.update({ dessert: 'cookies' }); // same as default

    expect(listener).not.toHaveBeenCalled();
  });
});

describe('snapshots', () => {
  test('stay stable across reads', () => {
    const store = new SettingsStore(createTestDefinitions());

    const snapshot1 = store.getSnapshot();
    const snapshot2 = store.getSnapshot();

    expect(snapshot1).toBe(snapshot2);
  });

  test('update after state change', () => {
    const store = new SettingsStore(createTestDefinitions());

    const snapshot1 = store.getSnapshot();
    store.update({ dessert: 'pie' });
    const snapshot2 = store.getSnapshot();

    expect(snapshot1).not.toBe(snapshot2);
    expect(snapshot2).toEqual({ dessert: 'pie', price: 10, open: true });
  });
});

function createTestDefinitions() {
  let dessert = 'cookies';
  let price = 10;
  let open = true;
  return {
    dessert: {
      default: 'cookies',
      validate: (value: string) => ['cookies', 'cake', 'pie'].includes(value),
      update: async (value: string) => {
        dessert = value;
      },
      read: async () => dessert,
    } satisfies Setting<string>,
    price: {
      default: 10,
      validate: (value: number) => value >= 0,
      update: async (value: number) => {
        price = value;
      },
      read: async () => price,
    } satisfies Setting<number>,
    open: {
      default: true as boolean,
      validate: (value: boolean) => typeof value === 'boolean',
      update: async (value: boolean) => {
        open = value;
      },
      read: async () => open,
    } satisfies Setting<boolean>,
  } satisfies Settings;
}
