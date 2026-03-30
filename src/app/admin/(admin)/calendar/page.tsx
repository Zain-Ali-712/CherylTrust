"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";

type Event = {
  id: string;
  title: string;
  clientId: string;
  service?: string;
  start: string;
  startTime?: string;
  endTime?: string;
  status: string;
  color: string;
};

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getStartOfWeek(new Date()));

  function getStartOfWeek(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // Adjust to Sunday
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  const fetchCalendar = async (start: Date) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    
    // Fetch specifically the calendar endpoint which is optimized
    const res = await fetch(`/api/calendar?start=${start.toISOString()}&end=${end.toISOString()}`);
    if (res.ok) {
        setEvents(await res.json());
    }
  };

  useEffect(() => {
    fetchCalendar(currentWeekStart);
  }, [currentWeekStart]);

  const prevWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7);
    setCurrentWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7);
    setCurrentWeekStart(d);
  };

  // Generate week days
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    return d;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-serif text-dark">Calendar</h1>
        <div className="flex items-center gap-4">
            <button onClick={prevWeek} className="p-2 bg-black/5 hover:bg-black/10 rounded-lg transition"><FiChevronLeft /></button>
            <span className="font-semibold w-40 text-center">
                {currentWeekStart.toLocaleDateString([], { month: 'short', day: 'numeric' })} 
                {' - '} 
                {weekDays[6].toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button onClick={nextWeek} className="p-2 bg-black/5 hover:bg-black/10 rounded-lg transition"><FiChevronRight /></button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-black/5 bg-black/5">
            {weekDays.map((d, i) => (
                <div key={i} className={`p-4 text-center border-r border-black/5 last:border-r-0 ${d.toDateString() === new Date().toDateString() ? 'bg-brand/10 text-brand font-bold' : ''}`}>
                    <div className="text-xs uppercase font-semibold text-dark/50">{d.toLocaleDateString([], { weekday: 'short' })}</div>
                    <div className="text-lg">{d.getDate()}</div>
                </div>
            ))}
        </div>
        
        <div className="grid grid-cols-7 min-h-[500px]">
            {weekDays.map((d, i) => {
                // Find events for this day
                const dayEvents = events.filter(e => new Date(e.start).toDateString() === d.toDateString());
                
                return (
                    <div key={i} className="border-r border-black/5 p-2 space-y-2 last:border-r-0 relative">
                        {dayEvents.length === 0 && <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition"><span className="text-xs text-dark/30 font-medium tracking-wide">Empty</span></div>}
                        {dayEvents.map(ev => {
                            let colorClasses = "bg-blue-100 text-blue-800 border-blue-200";
                            if (ev.color === "red") colorClasses = "bg-red-100 text-red-800 border-red-200 line-through opacity-70";
                            if (ev.color === "orange") colorClasses = "bg-orange-100 text-orange-800 border-orange-200";

                            return (
                                <Link key={ev.id} href={`/admin/bookings/${ev.id}`} className={`block p-2 rounded-lg border text-sm shadow-sm cursor-pointer hover:ring-2 hover:ring-brand/40 transition ${colorClasses}`}>
                                    <div className="font-semibold flex items-center gap-1 text-xs mb-1 opacity-80">
                                        <FiClock size={10} /> {ev.startTime || "N/A"} - {ev.endTime || "N/A"}
                                    </div>
                                    <div className="font-medium truncate">{ev.title}</div>
                                    {ev.service && <div className="text-[10px] opacity-70 truncate mt-0.5" title={ev.service}>{ev.service}</div>}
                                </Link>
                            );
                        })}
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}
