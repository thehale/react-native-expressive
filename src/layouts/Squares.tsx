// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { View } from "react-native";
import Measured, { useMeasurements } from "./Measured";
import Flow, { type FlowProps } from "./Flow";
import styles from "../styles";
import { sequence } from "../utils/iteration";

export default function Squares(props: FlowProps) {
	return (
		<Measured>
			<MeasuredSquares {...props} />
		</Measured>
	)
}

function MeasuredSquares(props: FlowProps) {
	const squares = useSquares(props.rows, props.columns, Array.from(props.children));

	return (
		<View style={[styles.layout.centered, styles.layout.filled]}>
			<Flow {...props}>
				{squares}
			</Flow>
		</View>
	)
}

function useSquares(rows: number, columns: number, children: React.ReactNode[]) {
	const { width, height } = useMeasurements();
	const length = Math.floor(Math.min(width / columns, height / rows));
	return sequence(rows * columns).map(i => (
		<Square key={i} size={length}>
			{children[i]}
		</Square>
	));
}

interface SquareProps {
	children: React.ReactNode;
	size: number;
}

function Square(props: SquareProps) {
	return (
		<View style={{ width: props.size, height: props.size }}>
			{props.children}
		</View>
	)
}
