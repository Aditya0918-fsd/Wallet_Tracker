import { identity, isArrayLike, iteratee } from "./es-toolkit.mjs";
// ../../node_modules/.pnpm/es-toolkit@1.53.2/node_modules/es-toolkit/dist/compat/_internal/toArray.mjs
function toArray(value) {
	return Array.isArray(value) ? value : Array.from(value);
}
// ../../node_modules/.pnpm/es-toolkit@1.53.2/node_modules/es-toolkit/dist/compat/math/maxBy.mjs
/**
* Finds the element in an array that has the maximum value when applying
* the `iteratee` to each element.
*
* @template T - The type of elements in the array.
* @param items The array of elements to search.
* @param [iteratee=identity]
* The criteria used to determine the maximum value.
*  - If a **function** is provided, it extracts a numeric value from each element.
*  - If a **string** is provided, it is treated as a key to extract values from the objects.
*  - If a **[key, value]** pair is provided, it matches elements with the specified key-value pair.
*  - If an **object** is provided, it matches elements that contain the specified properties.
* @returns The element with the maximum value as determined by the `iteratee`.
* @example
* maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
* maxBy([], x => x.a); // Returns: undefined
* maxBy(
*   [
*     { name: 'john', age: 30 },
*     { name: 'jane', age: 28 },
*     { name: 'joe', age: 26 },
*   ],
*   x => x.age
* ); // Returns: { name: 'john', age: 30 }
* maxBy([{ a: 1 }, { a: 2 }], 'a'); // Returns: { a: 2 }
* maxBy([{ a: 1 }, { a: 2 }], ['a', 1]); // Returns: { a: 1 }
* maxBy([{ a: 1 }, { a: 2 }], { a: 1 }); // Returns: { a: 1 }
*/
function maxBy(items, iteratee$1 = identity) {
	if (items == null) return;
	const array = toArray(items);
	if (array.length === 0) return;
	const getValue = iteratee(iteratee$1);
	let maxElement;
	let max;
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		const current = getValue(element);
		if (current == null || Number.isNaN(current) || typeof current === "symbol") continue;
		if (max === void 0 || current > max) {
			max = current;
			maxElement = element;
		}
	}
	return maxElement;
}
// ../../node_modules/.pnpm/es-toolkit@1.53.2/node_modules/es-toolkit/dist/compat/math/minBy.mjs
/**
* Finds the element in an array that has the minimum value when applying
* the `iteratee` to each element.
*
* @template T - The type of elements in the array.
* @param items The array of elements to search.
* @param [iteratee=identity]
* The criteria used to determine the minimum value.
*  - If a **function** is provided, it extracts a numeric value from each element.
*  - If a **string** is provided, it is treated as a key to extract values from the objects.
*  - If a **[key, value]** pair is provided, it matches elements with the specified key-value pair.
*  - If an **object** is provided, it matches elements that contain the specified properties.
* @returns The element with the minimum value as determined by the `iteratee`.
* @example
* minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
* minBy([], x => x.a); // Returns: undefined
* minBy(
*   [
*     { name: 'john', age: 30 },
*     { name: 'jane', age: 28 },
*     { name: 'joe', age: 26 },
*   ],
*   x => x.age
* ); // Returns: { name: 'joe', age: 26 }
* minBy([{ a: 1 }, { a: 2 }], 'a'); // Returns: { a: 1 }
* minBy([{ a: 1 }, { a: 2 }], ['a', 1]); // Returns: { a: 2 }
* minBy([{ a: 1 }, { a: 2 }], { a: 1 }); // Returns: { a: 2 }
*/
function minBy(items, iteratee$1 = identity) {
	if (items == null) return;
	const array = toArray(items);
	if (array.length === 0) return;
	const getValue = iteratee(iteratee$1);
	let minElement;
	let min;
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		const current = getValue(element);
		if (current == null || Number.isNaN(current) || typeof current === "symbol") continue;
		if (min === void 0 || current < min) {
			min = current;
			minElement = element;
		}
	}
	return minElement;
}
// ../../node_modules/.pnpm/es-toolkit@1.53.2/node_modules/es-toolkit/dist/array/last.mjs
/**
* Returns the last element of an array.
*
* This function takes an array and returns the last element of the array.
* If the array is empty, the function returns `undefined`.
*
* Unlike some implementations, this function is optimized for performance
* by directly accessing the last index of the array.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to get the last element.
* @returns The last element of the array, or `undefined` if the array is empty.
*
* @example
* const arr = [1, 2, 3];
* const lastElement = last(arr);
* // lastElement will be 3
*
* const emptyArr: number[] = [];
* const noElement = last(emptyArr);
* // noElement will be undefined
*/
function last$1(arr) {
	return arr[arr.length - 1];
}
// ../../node_modules/.pnpm/es-toolkit@1.53.2/node_modules/es-toolkit/dist/compat/array/last.mjs
/**
* Returns the last element of an array.
*
* This function takes an array and returns the last element of the array.
* If the array is empty, the function returns `undefined`.
*
* Unlike some implementations, this function is optimized for performance
* by directly accessing the last index of the array.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to get the last element.
* @returns The last element of the array, or `undefined` if the array is empty.
*
* @example
* const arr = [1, 2, 3];
* const lastElement = last(arr);
* // lastElement will be 3
*
* const emptyArr: number[] = [];
* const noElement = last(emptyArr);
* // noElement will be undefined
*/
function last(array) {
	if (!isArrayLike(array) || array.length === 0) return;
	return last$1(toArray(array));
}
export { last, maxBy, minBy };
