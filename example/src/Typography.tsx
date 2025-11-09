// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { View } from 'react-native';
import { Text } from 'react-native-expressive';

export default function Typography() {
  return (
    <View>
      <Text variant="display large">Display Large</Text>
      <Text variant="display medium">Display Medium</Text>
      <Text variant="display small">Display Small</Text>
      <Text variant="headline large">Headline Large</Text>
      <Text variant="headline medium">Headline Medium</Text>
      <Text variant="headline small">Headline Small</Text>
      <Text variant="title large">Title Large</Text>
      <Text variant="title medium">Title Medium</Text>
      <Text variant="title small">Title Small</Text>
      <Text variant="label large">Label Large</Text>
      <Text variant="label medium">Label Medium</Text>
      <Text variant="label small">Label Small</Text>
      <Text variant="body large">Body Large</Text>
      <Text variant="body medium">Body Medium</Text>
      <Text variant="body small">Body Small</Text>
    </View>
  );
}
