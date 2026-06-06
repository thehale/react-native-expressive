// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { View } from 'react-native';
import { TextInput } from 'react-native-expressive';
import { space } from '../../src/styles';
import { useState } from 'react';

export default function TextInputs() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('Default Value');

  return (
    <View style={{ gap: space.default }}>
      <TextInput
        placeholder="Enter text here"
        value={text1}
        onChangeText={setText1}
      />
      <TextInput value={text2} onChangeText={setText2} />
    </View>
  );
}
