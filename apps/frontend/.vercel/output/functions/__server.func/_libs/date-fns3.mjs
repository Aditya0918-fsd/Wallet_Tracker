import { constructFrom, normalizeDates } from "./date-fns.mjs";
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/normalizeInterval.js
function normalizeInterval(context, interval) {
	const [start, end] = normalizeDates(context, interval.start, interval.end);
	return {
		start,
		end
	};
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/eachDayOfInterval.js
/**
* The {@link eachDayOfInterval} function options.
*/
/**
* The {@link eachDayOfInterval} function result type. It resolves the proper data type.
* It uses the first argument date object type, starting from the date argument,
* then the start interval date, and finally the end interval date. If
* a context function is passed, it uses the context function return type.
*/
/**
* @name eachDayOfInterval
* @category Interval Helpers
* @summary Return the array of dates within the specified time interval.
*
* @description
* Return the array of dates within the specified time interval.
*
* @typeParam IntervalType - Interval type.
* @typeParam Options - Options type.
*
* @param interval - The interval.
* @param options - An object with options.
*
* @returns The array with starts of days from the day of the interval start to the day of the interval end
*
* @example
* // Each day between 6 October 2014 and 10 October 2014:
* const result = eachDayOfInterval({
*   start: new Date(2014, 9, 6),
*   end: new Date(2014, 9, 10)
* })
* //=> [
* //   Mon Oct 06 2014 00:00:00,
* //   Tue Oct 07 2014 00:00:00,
* //   Wed Oct 08 2014 00:00:00,
* //   Thu Oct 09 2014 00:00:00,
* //   Fri Oct 10 2014 00:00:00
* // ]
*/
function eachDayOfInterval(interval, options) {
	const { start, end } = normalizeInterval(options?.in, interval);
	let reversed = +start > +end;
	const endTime = reversed ? +start : +end;
	const date = reversed ? end : start;
	date.setHours(0, 0, 0, 0);
	let step = options?.step ?? 1;
	if (!step) return [];
	if (step < 0) {
		step = -step;
		reversed = !reversed;
	}
	const dates = [];
	while (+date <= endTime) {
		dates.push(constructFrom(start, date));
		date.setDate(date.getDate() + step);
		date.setHours(0, 0, 0, 0);
	}
	return reversed ? dates.reverse() : dates;
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/eachMonthOfInterval.js
/**
* The {@link eachMonthOfInterval} function options.
*/
/**
* The {@link eachMonthOfInterval} function result type. It resolves the proper data type.
*/
/**
* @name eachMonthOfInterval
* @category Interval Helpers
* @summary Return the array of months within the specified time interval.
*
* @description
* Return the array of months within the specified time interval.
*
* @typeParam IntervalType - Interval type.
* @typeParam Options - Options type.
*
* @param interval - The interval.
* @param options - An object with options.
*
* @returns The array with starts of months from the month of the interval start to the month of the interval end
*
* @example
* // Each month between 6 February 2014 and 10 August 2014:
* const result = eachMonthOfInterval({
*   start: new Date(2014, 1, 6),
*   end: new Date(2014, 7, 10)
* })
* //=> [
* //   Sat Feb 01 2014 00:00:00,
* //   Sat Mar 01 2014 00:00:00,
* //   Tue Apr 01 2014 00:00:00,
* //   Thu May 01 2014 00:00:00,
* //   Sun Jun 01 2014 00:00:00,
* //   Tue Jul 01 2014 00:00:00,
* //   Fri Aug 01 2014 00:00:00
* // ]
*/
function eachMonthOfInterval(interval, options) {
	const { start, end } = normalizeInterval(options?.in, interval);
	let reversed = +start > +end;
	const endTime = reversed ? +start : +end;
	const date = reversed ? end : start;
	date.setHours(0, 0, 0, 0);
	date.setDate(1);
	let step = options?.step ?? 1;
	if (!step) return [];
	if (step < 0) {
		step = -step;
		reversed = !reversed;
	}
	const dates = [];
	while (+date <= endTime) {
		dates.push(constructFrom(start, date));
		date.setMonth(date.getMonth() + step);
	}
	return reversed ? dates.reverse() : dates;
}
export { eachDayOfInterval, eachMonthOfInterval };
