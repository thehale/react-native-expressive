// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, type ViewStyle } from 'react-native';

const style = <S extends ViewStyle>(s: S) => StyleSheet.create({ s: s }).s;

export const centered = style({
  justifyContent: 'center',
  alignItems: 'center',
});

export const filled = style({
  width: '100%',
  height: '100%',
} as const);
