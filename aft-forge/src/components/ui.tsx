import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function Panel({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section className={`panel ${className}`.trim()} id={id}>
      {children}
    </section>
  )
}

export function Eyebrow({ children, tone }: { children: ReactNode; tone?: string }) {
  return <div className={`eyebrow ${tone ? `tone-${tone}` : ''}`}>{children}</div>
}

export function SectionHeader({
  eyebrow,
  title,
  action,
  description,
}: {
  eyebrow?: string
  title: string
  action?: ReactNode
  description?: string
}) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  )
}

export function Pill({
  children,
  tone = 'neutral',
  dot = false,
}: {
  children: ReactNode
  tone?: 'neutral' | 'lime' | 'amber' | 'red' | 'blue' | 'violet'
  dot?: boolean
}) {
  return (
    <span className={`pill tone-${tone}`}>
      {dot && <span className="pill-dot" />}
      {children}
    </span>
  )
}

export function Ring({
  value,
  max = 100,
  size = 152,
  label,
  sublabel,
  tone = 'lime',
  caption,
}: {
  value: number
  max?: number
  size?: number
  label: string
  sublabel?: string
  tone?: 'lime' | 'amber' | 'red' | 'blue'
  caption?: string
}) {
  const stroke = size > 130 ? 9 : 7
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(1, value / max))
  const offset = circumference * (1 - pct)
  return (
    <div className={`ring-wrap ring-${tone}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          className="ring-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="ring-value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center">
        <strong>{label}</strong>
        {sublabel && <span>{sublabel}</span>}
        {caption && <small>{caption}</small>}
      </div>
    </div>
  )
}

export function ProgressBar({
  value,
  max = 100,
  tone = 'lime',
  label,
  right,
}: {
  value: number
  max?: number
  tone?: 'lime' | 'amber' | 'red' | 'blue' | 'violet'
  label?: string
  right?: string
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="progress-block">
      {(label || right) && (
        <div className="progress-label">
          <span>{label}</span>
          <span>{right}</span>
        </div>
      )}
      <div className="progress-track">
        <div className={`progress-fill tone-${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function Stat({
  label,
  value,
  unit,
  detail,
  tone = 'neutral',
  icon,
}: {
  label: string
  value: string | number
  unit?: string
  detail?: string
  tone?: 'neutral' | 'lime' | 'amber' | 'red' | 'blue'
  icon?: ReactNode
}) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>
      <div className="stat-value">
        {value}
        {unit && <span>{unit}</span>}
      </div>
      {detail && <div className="stat-detail">{detail}</div>}
    </div>
  )
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  )
}

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  wide = false,
}: {
  open: boolean
  onClose: () => void
  title: string
  eyebrow?: string
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className={`modal ${wide ? 'modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}

export interface ChartPoint {
  label: string
  value: number
  projected?: boolean
}

export function TrendChart({
  points,
  goal,
  unit,
  height = 220,
  tone = 'lime',
  showGoal = true,
}: {
  points: ChartPoint[]
  goal?: number
  unit?: string
  height?: number
  tone?: 'lime' | 'amber' | 'blue' | 'red'
  showGoal?: boolean
}) {
  if (points.length === 0) return <EmptyState title="No data yet" body="Log a measurement to start the trend." />
  const width = 640
  const padX = 30
  const padY = 28
  const values = points.map((point) => point.value)
  if (goal !== undefined) values.push(goal)
  const min = Math.min(...values) - Math.max(1, (Math.max(...values) - Math.min(...values)) * 0.08)
  const max = Math.max(...values) + Math.max(1, (Math.max(...values) - Math.min(...values)) * 0.08)
  const xFor = (index: number) =>
    padX + (index / Math.max(1, points.length - 1)) * (width - padX * 2)
  const yFor = (value: number) =>
    padY + ((max - value) / Math.max(1, max - min)) * (height - padY * 2)
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${xFor(index)} ${yFor(point.value)}`).join(' ')
  const area = `${path} L ${xFor(points.length - 1)} ${height - padY} L ${xFor(0)} ${height - padY} Z`
  const goalY = goal !== undefined ? yFor(goal) : null
  const last = points[points.length - 1]
  return (
    <div className={`trend-chart tone-${tone}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend chart">
        <defs>
          <linearGradient id={`fill-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.24" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => {
          const y = padY + (line / 3) * (height - padY * 2)
          return <line key={line} className="chart-grid" x1={padX} y1={y} x2={width - padX} y2={y} />
        })}
        {showGoal && goalY !== null && (
          <>
            <line className="chart-goal" x1={padX} y1={goalY} x2={width - padX} y2={goalY} />
            <text className="chart-goal-label" x={width - padX} y={goalY - 7} textAnchor="end">
              GOAL {goal}
              {unit ? ` ${unit}` : ''}
            </text>
          </>
        )}
        <path className="chart-area" d={area} fill={`url(#fill-${tone})`} />
        <path className="chart-line" d={path} fill="none" />
        {points.map((point, index) => (
          <g key={`${point.label}-${index}`}>
            <circle
              className={`chart-dot ${point.projected ? 'projected' : ''}`}
              cx={xFor(index)}
              cy={yFor(point.value)}
              r={point.projected ? 3.5 : 4.5}
            />
            {(index === 0 || index === points.length - 1) && (
              <text
                className="chart-label"
                x={xFor(index)}
                y={height - 7}
                textAnchor={index === 0 ? 'start' : 'end'}
              >
                {point.label}
              </text>
            )}
          </g>
        ))}
        <text className="chart-value" x={xFor(points.length - 1) - 8} y={yFor(last.value) - 12} textAnchor="end">
          {last.value}
          {unit ? ` ${unit}` : ''}
        </text>
      </svg>
    </div>
  )
}

export function KeyValue({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="key-value">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

const REST_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const REST_DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function RestDayPicker({
  value,
  onChange,
}: {
  value: number[]
  onChange: (days: number[]) => void
}) {
  return (
    <div className="restday-picker">
      <div className="restday-chips" role="group" aria-label="Rest days">
        {REST_DAY_LETTERS.map((letter, day) => {
          const active = value.includes(day)
          return (
            <button
              key={day}
              type="button"
              className={active ? 'active' : ''}
              title={`${REST_DAY_NAMES[day]} — rest day`}
              aria-pressed={active}
              onClick={() => {
                if (active) {
                  onChange(value.filter((candidate) => candidate !== day))
                } else if (value.length < 5) {
                  onChange([...value, day].sort((a, b) => a - b))
                }
              }}
            >
              {letter}
            </button>
          )
        })}
      </div>
      <small>{7 - value.length} training days · {value.length} rest</small>
    </div>
  )
}
