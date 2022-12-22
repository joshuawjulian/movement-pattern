import { Temporal } from '@js-temporal/polyfill';
import { z } from 'zod';

const StringDayOfWeekZod = z.object({
	short: z.string().length(3),
	long: z.string(),
});

type StringDayOfWeekType = z.infer<typeof StringDayOfWeekZod>;

const StringDayOfWeek: { [key: number]: StringDayOfWeekType } = {
	1: {
		short: 'mon',
		long: 'Monday',
	},
	2: {
		short: 'tue',
		long: 'Tuesday',
	},
	3: {
		short: 'wed',
		long: 'Wednesday',
	},
	4: {
		short: 'thu',
		long: 'Thursday',
	},
	5: {
		short: 'fri',
		long: 'Friday',
	},
	6: {
		short: 'sat',
		long: 'Saturday',
	},
	7: {
		short: 'sun',
		long: 'Sunday',
	},
};

export function dayNumberToString(num: number): StringDayOfWeekType {
	if (num > 7 || num < 1) throw new Error('Number must be >= 1 and <= 7');

	return StringDayOfWeek[num];
}

export function getFullWeeksOfMonthYear(
	monthYear: Temporal.PlainYearMonth,
) {
	let first = Temporal.PlainDate.from({
		day: 1,
		month: monthYear.month,
		year: monthYear.year,
	});

	while (first.dayOfWeek > 1) first = first.subtract({ days: 1 });

	let last = Temporal.PlainDate.from({
		day: monthYear.daysInMonth,
		month: monthYear.month,
		year: monthYear.year,
	});

	while (last.dayOfWeek < 7) last = last.add({ days: 1 });

	return arrayOfDays(first, last);
}

export function arrayOfDays(
	start: Temporal.PlainDate,
	end: Temporal.PlainDate,
): Temporal.PlainDate[] {
	let days: Temporal.PlainDate[] = [];
	let workingDate = start;
	while (Temporal.PlainDate.compare(workingDate, end) < 1) {
		days.push(workingDate);
		workingDate = workingDate.add({ days: 1 });
	}
	return days;
}
