import type { DayPlan, WeekPlan } from '../types'

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function icsDate(date: string, hour = 6): string {
  const [year, month, day] = date.split('-').map(Number)
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}0000`
}

function escape(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function dayDescription(day: DayPlan): string {
  const blocks = day.blocks
    .map((block) => {
      const items = block.items
        .map((item) => `- ${item.name}: ${item.prescription}`)
        .join('\n')
      return `${block.label}\n${items}`
    })
    .join('\n\n')
  return `${day.intent}\n\n${blocks}\n\nMinimum: ${day.minimum}\n\nCoach: ${day.coachNote}`
}

export function buildIcs(weeks: WeekPlan[], calendarName = 'AFT FORGE'): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AFT FORGE//Soldier Performance System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escape(calendarName)}`,
    'X-WR-TIMEZONE:UTC',
  ]
  for (const week of weeks) {
    for (const day of week.days) {
      lines.push('BEGIN:VEVENT')
      lines.push(`UID:${day.id}@aftforge.local`)
      lines.push(`DTSTAMP:${icsDate(day.date)}`)
      lines.push(`DTSTART:${icsDate(day.date)}`)
      lines.push(`DTEND:${icsDate(day.date, 6 + Math.ceil(day.durationMin / 60))}`)
      lines.push(`SUMMARY:${escape(`[${day.type.toUpperCase()}] ${day.title}`)}`)
      lines.push(`DESCRIPTION:${escape(dayDescription(day))}`)
      lines.push('END:VEVENT')
    }
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

export function downloadText(filename: string, content: string, type = 'text/plain'): void {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function downloadIcs(weeks: WeekPlan[]): void {
  downloadText('aft-forge-plan.ics', buildIcs(weeks), 'text/calendar;charset=utf-8')
}
