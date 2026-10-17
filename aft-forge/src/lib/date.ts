const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAYS_LONG = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function parseISO(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, (month ?? 1) - 1, day ?? 1)
}

export function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayISO(): string {
  return toISO(new Date())
}

export function addDays(value: string | Date, days: number): string {
  const date = typeof value === 'string' ? parseISO(value) : new Date(value)
  date.setDate(date.getDate() + days)
  return toISO(date)
}

export function addDaysDate(value: string | Date, days: number): Date {
  const date = typeof value === 'string' ? parseISO(value) : new Date(value)
  date.setDate(date.getDate() + days)
  return date
}

export function daysBetween(from: string, to: string): number {
  const a = parseISO(from).getTime()
  const b = parseISO(to).getTime()
  return Math.round((b - a) / 86_400_000)
}

export function weekday(value: string): string {
  return WEEKDAYS[parseISO(value).getDay()]
}

export function weekdayLong(value: string): string {
  return WEEKDAYS_LONG[parseISO(value).getDay()]
}

export function formatShort(value: string): string {
  const date = parseISO(value)
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`
}

export function formatTiny(value: string): string {
  const date = parseISO(value)
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`
}

export function formatLong(value: string): string {
  const date = parseISO(value)
  return `${WEEKDAYS_LONG[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function nextMonday(from = todayISO()): string {
  const date = parseISO(from)
  const day = date.getDay()
  const offset = day === 1 ? 0 : (8 - day) % 7
  return addDays(from, offset)
}

export function isToday(value: string): boolean {
  return value === todayISO()
}

export function isPast(value: string): boolean {
  return value < todayISO()
}

export function isBetween(value: string, start: string, end: string): boolean {
  return value >= start && value <= end
}

export function monthLabel(value: string): string {
  return MONTHS[parseISO(value).getMonth()]
}

export function daysLabel(days: number): string {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day'
  if (days > 1) return `${days} days`
  return `${Math.abs(days)} days ago`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
