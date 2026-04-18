"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Mail, ChevronLeft, ChevronRight, Clock, CheckCircle } from "lucide-react"

type Tab = "demo" | "contact"

interface ContactDemoModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: Tab
}

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function ContactDemoModal({ isOpen, onClose, defaultTab = "demo" }: ContactDemoModalProps) {
  const today = new Date()

  const [activeTab, setActiveTab] = useState<Tab>(defaultTab)
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", company: "", message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab)
      setBooked(false)
      setSubmitted(false)
    }
  }, [isOpen, defaultTab])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  // ── Calendar helpers ──
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return d < t
  }
  const isWeekend = (day: number) => {
    const d = new Date(currentYear, currentMonth, day)
    return d.getDay() === 0 || d.getDay() === 6
  }
  const isSelected = (day: number) =>
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === currentMonth &&
    selectedDate?.getFullYear() === currentYear
  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === currentMonth &&
    today.getFullYear() === currentYear

  const handleDayClick = (day: number) => {
    if (isPast(day) || isWeekend(day)) return
    setSelectedDate(new Date(currentYear, currentMonth, day))
    setSelectedTime(null)
  }

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return
    setBooked(true)
  }

  const handleSend = () => {
    const { firstName, lastName, email, company, message } = formData
    if (!email || !message) return
    const subject = encodeURIComponent("Inquiry from YJ Ventures Website")
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nCompany: ${company}\n\n${message}`
    )
    window.location.href = `mailto:hello@yjventures.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Get in Touch</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-muted rounded-xl p-1 gap-1">
            {(["demo", "contact"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "demo"
                  ? <><Calendar className="h-4 w-4" />Book a Demo</>
                  : <><Mail className="h-4 w-4" />Contact Us</>}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">

          {/* ── DEMO TAB ── */}
          {activeTab === "demo" && (
            booked ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Demo Booked!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll see you on <span className="text-foreground font-medium">{formatDate(selectedDate!)}</span> at{" "}
                    <span className="text-foreground font-medium">{selectedTime}</span>.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A confirmation will be sent to your email.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Calendar */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  {/* Month nav */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-semibold text-foreground">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 mb-2">
                    {DAY_NAMES.map((d) => (
                      <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-y-1">
                    {/* Empty cells before first day */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {/* Day cells */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1
                      const disabled = isPast(day) || isWeekend(day)
                      const selected = isSelected(day)
                      const todayMark = isToday(day)
                      return (
                        <button
                          key={day}
                          onClick={() => handleDayClick(day)}
                          disabled={disabled}
                          className={`
                            mx-auto h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all
                            ${selected
                              ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/30"
                              : disabled
                              ? "text-muted-foreground/30 cursor-not-allowed"
                              : todayMark
                              ? "text-primary font-bold hover:bg-primary/10"
                              : "text-foreground hover:bg-muted cursor-pointer"
                            }
                          `}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Weekends unavailable · Select a weekday
                  </p>
                </div>

                {/* Time slots — shown after date selected */}
                {selectedDate && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">
                        Available times for {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                            selectedTime === time
                              ? "bg-gradient-to-br from-primary to-accent text-primary-foreground border-transparent shadow-sm"
                              : "bg-background border-border text-muted-foreground hover:border-primary hover:text-foreground"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Book button */}
                <button
                  onClick={handleBook}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl text-sm transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                >
                  {!selectedDate
                    ? "Select a Date"
                    : !selectedTime
                    ? "Select a Time"
                    : `Confirm — ${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${selectedTime}`}
                </button>
              </div>
            )
          )}

          {/* ── CONTACT TAB ── */}
          {activeTab === "contact" && (
            submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your email client has been opened with the message. We'll get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "First Name", key: "firstName", placeholder: "John" },
                    { label: "Last Name", key: "lastName", placeholder: "Doe" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        {label}
                      </label>
                      <input
                        className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder={placeholder}
                        value={formData[key as keyof typeof formData]}
                        onChange={(e) => setFormData(p => ({ ...p, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>

                {[
                  { label: "Email *", key: "email", type: "email", placeholder: "john@company.com" },
                  { label: "Company", key: "company", type: "text", placeholder: "Your Company" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder={placeholder}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData(p => ({ ...p, [key]: e.target.value }))}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                </div>

                <button
                  onClick={handleSend}
                  disabled={!formData.email || !formData.message}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send Message →
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}