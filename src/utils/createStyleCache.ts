// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

export function createStyleCache() {
  const cache = new Map<string, ViewStyle | TextStyle>();

  function cachedStyle<T extends ViewStyle | TextStyle>(
    key: string,
    compute: () => T
  ): T {
    if (!cache.has(key)) {
      cache.set(key, StyleSheet.create({ _: compute() })._);
    }
    return cache.get(key) as T;
  }

  return { cache, cachedStyle } as const;
}
