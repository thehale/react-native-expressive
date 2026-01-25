// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { View } from "react-native";
import Measured, { useMeasurements } from "./Measured";
import Flow, { type FlowDefinition } from "./Flow";
import styles from "../styles";

export interface SquaresProps {
	rows: number;
	columns: number;
	flow?: FlowDefinition;
	children: Iterable<React.ReactNode>;
}

const DEFAULT_FLOW: FlowDefinition = {
	origin: 'top-left',
	direction: 'column',
}

/**
 * Places its children into a grid of squares.
 */
export default function Squares(props: SquaresProps) {
	return (
		<Measured>
			<MeasuredSquares {...props} />
		</Measured>
	)
}

function MeasuredSquares(props: SquaresProps) {
	const squares = useSquares(props.rows, props.columns, Array.from(props.children));
	const flow = props.flow || DEFAULT_FLOW;

	return (
		<View style={[styles.layout.centered, styles.layout.filled]}>
			<Flow rows={props.rows} columns={props.columns} flow={flow}>
				{squares}
			</Flow>
		</View>
	)
}

function useSquares(rows: number, columns: number, children: React.ReactNode[]) {
	const { width, height } = useMeasurements();
	const length = Math.floor(Math.min(width / columns, height / rows));
	return new Array(rows * columns).fill(null).map((_, i) => (
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
