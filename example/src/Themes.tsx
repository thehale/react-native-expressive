// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-expressive';
import {
  useMaterialTheme,
  MaterialBlue,
  MaterialCyan,
  MaterialGreen,
  MaterialOrange,
  MaterialPink,
  MaterialRed,
  MaterialYellow,
} from 'react-native-expressive';

export default function Themes() {
  const { setTheme, setScheme, resetTheme } = useMaterialTheme();
  return (
    <View style={styles.container}>
      <Text variant="headline">Theme Picker</Text>
      <View style={styles.section}>
        <Button mode="contained" onPress={() => setTheme(MaterialBlue)}>
          Blue
        </Button>
        <Button mode="contained" onPress={() => setTheme(MaterialCyan)}>
          Cyan
        </Button>
        <Button mode="contained" onPress={() => setTheme(MaterialGreen)}>
          Green
        </Button>
        <Button mode="contained" onPress={() => setTheme(MaterialOrange)}>
          Orange
        </Button>
        <Button mode="contained" onPress={() => setTheme(MaterialPink)}>
          Pink
        </Button>
        <Button mode="contained" onPress={() => setTheme(MaterialRed)}>
          Red
        </Button>
        <Button mode="contained" onPress={() => setTheme(MaterialYellow)}>
          Yellow
        </Button>
      </View>
      <View style={styles.section}>
        <Button mode="outlined" onPress={() => setScheme('light')}>
          Light
        </Button>
        <Button mode="outlined" onPress={() => setScheme('dark')}>
          Dark
        </Button>
        <Button mode="outlined" onPress={() => setScheme('system')}>
          System
        </Button>
        <Button mode="text" onPress={() => resetTheme()}>
          Reset
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16, marginBlock: 16 },
  section: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
