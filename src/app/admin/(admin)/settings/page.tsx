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
    </div>
  );
}
