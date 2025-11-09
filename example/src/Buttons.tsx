// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';
import { Text, Button, Row } from 'react-native-expressive';

export default function Buttons() {
  const modes = ['text', 'contained', 'outlined', 'tonal', 'elevated'] as const;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title" style={styles.mode}>
          Mode
        </Text>
        <Text variant="title" style={styles.intent}>
          Normal
        </Text>
        <Text variant="title" style={styles.intent}>
          Danger
        </Text>
      </View>
      {modes.map((mode) => (
        <Row key={mode} itemStyle={styles.button}>
          <Text variant="body">{mode}</Text>
          <Button mode={mode}>Button</Button>
          <Button mode={mode} disabled>
            Button
          </Button>
          <Button mode={mode} intent="danger">
            Button
          </Button>
          <Button mode={mode} intent="danger" disabled>
            Button
          </Button>
        </Row>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', marginVertical: 8 },
  mode: { flex: 1, textAlign: 'left' },
  intent: { flex: 2, textAlign: 'center' },
  button: { flex: 1 },
});
