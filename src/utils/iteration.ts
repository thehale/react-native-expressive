// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Produces an array of numbers from [start, end).
 */
export function range(start: number, end: number) {
	return Array.from({ length: end - start }).map((_, index) => index + start);
}