// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { useMaterialTheme } from '../theme/material/useMaterialTheme';

export default function Divider() {
  const { theme } = useMaterialTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.outline }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
  },
});
