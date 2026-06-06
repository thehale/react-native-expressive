// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';
import {
  s,
  Button,
  Segment,
  Segmented,
  Text,
  type ColorScheme,
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
  const { setTheme, scheme, setScheme, resetTheme } = useMaterialTheme();
  return (
    <View style={styles.container}>
      <Text variant="headline">Theme Picker</Text>
      <Segmented
        value={scheme}
        onChange={(value) => setScheme(value as ColorScheme)}
      >
        <Segment value="light">Light</Segment>
        <Segment value="system">System</Segment>
        <Segment value="dark">Dark</Segment>
      </Segmented>
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
        <Button mode="text" onPress={() => resetTheme()}>
          Reset
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: s.space.double, marginBlock: s.space.double },
  section: { flexDirection: 'row', flexWrap: 'wrap', gap: s.space.default },
});
