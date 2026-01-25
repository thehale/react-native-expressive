// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import React from "react"
import { StyleSheet, View } from "react-native";

/**
 * A `View` that fills all available space.
 * 
 * i.e. forces `{ width: '100%', height: '100%' }`
 */
export default function Filled(props: React.ComponentProps<typeof View>) {
	return (
		<View {...props} style={[props.style, styles.container]}>
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	}
});