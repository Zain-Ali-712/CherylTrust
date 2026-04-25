"use client";
import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";

type OpeningHour = {
  _id: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  slotDuration: number;
  bufferTime: number;
  isActive: boolean;
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SettingsPage() {
  const [schedule, setSchedule] = useState<OpeningHour[]>([]);
  const [originalSchedule, setOriginalSchedule] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

  const hasChanges = JSON.stringify(schedule) !== originalSchedule;

  useEffect(() => {
    fetch("/api/schedule")
      .then(res => res.json())
      .then(data => {
        setSchedule(data);
        setOriginalSchedule(JSON.stringify(data));
      });
  }, []);

  const handleChange = (index: number, field: keyof OpeningHour, value: any) => {
    const updated = [...schedule];
    updated[index] = { ...updated[index], [field]: value };
    setSchedule(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
        const res = await fetch("/api/schedule", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(schedule)
        });
        
        if (res.ok) {
            const updated = await res.json();
            setSchedule(updated);
            setOriginalSchedule(JSON.stringify(updated));
            setMessage({ type: "success", text: "Opening hours updated successfully." });
        } else {
            setMessage({ type: "error", text: "Failed to update opening hours." });
        }
    } catch (e) {
        setMessage({ type: "error", text: "An error occurred." });
    }
    setIsSaving(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-serif text-dark mb-6">Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8 max-w-3xl mb-8">
        <h2 className="text-xl font-bold font-serif mb-4 flex justify-between items-center text-accent">
            <span>Dynamic Security Codes</span>
        </h2>
        <p className="text-dark/70 text-sm mb-6">
            Update the 4-digit padlock code for the front gate. This code is automatically included in all new booking confirmation emails.
        </p>
        
        <div className="flex items-end gap-4 max-w-md">
            <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-dark/30 mb-2">Gate Padlock Code</label>
                <input 
                    type="text" 
                    id="gate-code-input"
                    placeholder="e.g. 9077"
                    maxLength={4}
                    className="w-full border border-black/10 rounded-lg p-2.5 text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
            </div>
            <button 
                onClick={async () => {
                    const input = document.getElementById('gate-code-input') as HTMLInputElement;
                    if (!input.value) return;
                    const res = await fetch("/api/config", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ key: "padlock_code", value: input.value, description: "Gate entry padlock code" })
                    });
                    if (res.ok) alert("Security code updated successfully.");
                }}
                className="bg-accent text-dark px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-accent/80 transition"
            >
                Update Code
            </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8 max-w-3xl">
        <h2 className="text-xl font-bold font-serif mb-4 flex justify-between items-center">
            <span>Opening Hours</span>
            <button 
                onClick={handleSave} 
                className={`px-5 py-2.5 text-sm rounded-lg flex items-center gap-2 transition font-bold
                    ${hasChanges 
                        ? 'bg-brand text-white hover:bg-brand/90 shadow-md animate-pulse' 
                        : 'bg-black/10 text-dark/40 cursor-not-allowed'}`}
                disabled={isSaving || !hasChanges}
            >
                <FiSave /> {isSaving ? "Saving..." : hasChanges ? "Save Changes" : "All Saved"}
            </button>
        </h2>
        
        <p className="text-dark/70 text-sm mb-6">
            Define your weekly availability. Bookings can only be scheduled on active days during these hours. You can dynamically adjust the duration of a single session and the buffer time between them.
        </p>

        {message && (
            <div className={`p-4 mb-6 rounded-lg text-sm border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {message.text}
            </div>
        )}

        <div className="space-y-4">
            {schedule.map((day, index) => (
                <div key={day._id} className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${day.isActive ? 'border-brand/30 bg-brand/5' : 'border-black/5 bg-black/5'}`}>
                    <div className="flex items-center gap-3 w-40">
                        <input 
                            type="checkbox" 
                            checked={day.isActive} 
                            onChange={(e) => handleChange(index, 'isActive', e.target.checked)}
                            className="w-5 h-5 accent-brand rounded border-gray-300"
                        />
                        <span className={`font-semibold ${day.isActive ? 'text-brand' : 'text-dark/50'}`}>
                            {DAYS[day.dayOfWeek]}
                        </span>
                    </div>

                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 transition-opacity ${day.isActive ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-dark/70 mb-1">Open</label>
                            <input 
                                type="time" 
                                value={day.openTime} 
                                onChange={(e) => handleChange(index, 'openTime', e.target.value)}
                                className="border border-black/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-dark/70 mb-1">Close</label>
                            <input 
                                type="time" 
                                value={day.closeTime} 
                                onChange={(e) => handleChange(index, 'closeTime', e.target.value)}
                                className="border border-black/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-dark/70 mb-1">Slot (mins)</label>
                            <input 
                                type="number"
                                min={1}
                                value={day.slotDuration !== undefined ? day.slotDuration : 50} 
                                onChange={(e) => handleChange(index, 'slotDuration', parseInt(e.target.value))}
                                className="border border-black/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-dark/70 mb-1">Buffer (mins)</label>
                            <input 
                                type="number"
                                min={0}
                                value={day.bufferTime !== undefined ? day.bufferTime : 10} 
                                onChange={(e) => handleChange(index, 'bufferTime', parseInt(e.target.value))}
                                className="border border-black/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm w-full"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8 max-w-3xl mt-8">
        <h2 className="text-xl font-bold font-serif mb-4 flex justify-between items-center text-red-600">
            <span>Park Closures & Blackout Dates</span>
        </h2>
        <p className="text-dark/70 text-sm mb-6">
            Manually block out specific days (e.g. for maintenance, flooding, or holidays). These dates will be unavailable for booking on the client calendar.
        </p>

        <div className="flex gap-3 mb-8 bg-red-50 p-6 rounded-2xl border border-red-100">
            <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-red-800/50 mb-2">Select Date</label>
                <input 
                    type="date" 
                    id="blackout-date-input"
                    className="w-full border border-red-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
            </div>
            <div className="flex-[2]">
                <label className="block text-xs font-bold uppercase tracking-widest text-red-800/50 mb-2">Reason (Optional)</label>
                <input 
                    type="text" 
                    id="blackout-reason-input"
                    placeholder="e.g. Area Flooded, Maintenance"
                    className="w-full border border-red-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
            </div>
            <div className="flex items-end">
                <button 
                  onClick={async () => {
                    const dateInput = document.getElementById('blackout-date-input') as HTMLInputElement;
                    const reasonInput = document.getElementById('blackout-reason-input') as HTMLInputElement;
                    if (!dateInput.value) return;
                    
                    const res = await fetch("/api/blackout-dates", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ date: dateInput.value, reason: reasonInput.value })
                    });
                    if (res.ok) {
                        window.location.reload();
                    } else {
                        const data = await res.json();
                        alert(data.error || "Failed to block date");
                    }
                  }}
                  className="bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-red-700 transition"
                >
                    Block Date
                </button>
            </div>
        </div>

        <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-dark/30 mb-4">Currently Blocked Dates</h3>
            <BlackoutList />
        </div>
      </div>
    </div>
  );
}

function BlackoutList() {
    const [dates, setDates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blackout-dates")
            .then(res => res.json())
            .then(data => {
                setDates(data);
                setLoading(false);
            });
    }, []);

    const unblock = async (id: string) => {
        if (!confirm("Are you sure you want to unblock this date?")) return;
        const res = await fetch(`/api/blackout-dates?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            setDates(dates.filter(d => d._id !== id));
        }
    };

    if (loading) return <div className="text-center py-4 text-xs text-dark/40">Loading...</div>;
    if (dates.length === 0) return <div className="text-center py-8 border-2 border-dashed border-black/5 rounded-xl text-dark/30 text-sm">No dates are currently blocked.</div>;

    return (
        <div className="grid grid-cols-1 gap-2">
            {dates.map(d => (
                <div key={d._id} className="flex justify-between items-center p-4 bg-white border border-black/5 rounded-xl hover:border-red-200 transition group">
                    <div>
                        <div className="font-bold text-dark">{new Date(d.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        {d.reason && <div className="text-xs text-red-500 font-medium">{d.reason}</div>}
                    </div>
                    <button 
                        onClick={() => unblock(d._id)}
                        className="text-xs font-bold uppercase tracking-widest text-red-500/50 hover:text-red-500 px-3 py-1.5 border border-transparent hover:border-red-100 rounded-lg transition"
                    >
                        Unblock
                    </button>
                </div>
            ))}
        </div>
    );
}
