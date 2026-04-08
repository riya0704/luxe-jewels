"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";

const services = [
  { id: "consultation", name: "Personal Consultation", duration: "60 min", desc: "Expert guidance on selecting the perfect piece" },
  { id: "custom-design", name: "Custom Design Session", duration: "90 min", desc: "Create a unique, personalized jewelry design" },
  { id: "sizing", name: "Ring Sizing", duration: "30 min", desc: "Professional sizing adjustment for perfect fit" },
  { id: "repair", name: "Jewelry Repair", duration: "45 min", desc: "Expert repair and restoration services" },
  { id: "cleaning", name: "Professional Cleaning", duration: "30 min", desc: "Restore your jewelry to its original shine" },
];

const locations = [
  { id: "new-york", name: "New York Flagship", address: "123 Fifth Avenue, New York, NY 10022" },
  { id: "london", name: "London Atelier", address: "45 Bond Street, London, UK W1S 3PE" },
  { id: "paris", name: "Paris Boutique", address: "78 Champs-Élysées, Paris, France 75008" },
];

export default function AppointmentBookingPage() {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [booked, setBooked] = useState(false);

  const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setBooked(true);
  };

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Premium Experience
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="font-serif text-display-md text-ivory mb-4">
            Book Your Appointment
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="font-sans text-lg text-ivory/60">
            Reserve your exclusive consultation with our luxury concierge team
          </motion.p>
        </motion.div>

        {!booked ? (
          <>
            {/* Progress Indicator */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-bold transition-all ${
                        step >= s
                          ? "bg-gold-gradient text-obsidian"
                          : "bg-charcoal-light border border-gold/20 text-ivory/40"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`flex-1 h-px mb-5 transition-all ${
                          step > s ? "bg-gold" : "bg-gold/20"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-center text-xs tracking-[0.1em] uppercase">
                <span className={step === 1 ? "text-gold" : "text-ivory/40"}>Service</span>
                <span className={step === 2 ? "text-gold" : "text-ivory/40"}>Location</span>
                <span className={step === 3 ? "text-gold" : "text-ivory/40"}>Date & Time</span>
                <span className={step === 4 ? "text-gold" : "text-ivory/40"}>Details</span>
              </div>
            </motion.div>

            {/* Step 1: Service Selection */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-serif text-2xl text-ivory mb-8">Select a Service</h2>
                <div className="space-y-4 mb-8">
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => setSelectedService(svc.id)}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                        selectedService === svc.id
                          ? "border-gold bg-gold/10"
                          : "border-gold/10 hover:border-gold/30"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-serif text-lg text-ivory">{svc.name}</h3>
                          <p className="font-sans text-sm text-ivory/60 mt-1">{svc.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gold">
                          <Clock size={16} />
                          <span className="font-sans text-xs">{svc.duration}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Location Selection */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-serif text-2xl text-ivory mb-8">Select a Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        selectedLocation === loc.id
                          ? "border-gold bg-gold/10"
                          : "border-gold/10 hover:border-gold/30"
                      }`}
                    >
                      <MapPin size={24} className="text-gold mb-4" />
                      <h3 className="font-serif text-lg text-ivory mb-2">{loc.name}</h3>
                      <p className="font-sans text-sm text-ivory/60">{loc.address}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Date & Time Selection */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-serif text-2xl text-ivory mb-8">Select Date & Time</h2>
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                        Available Times
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-xl border transition-all font-sans text-sm ${
                              selectedTime === time
                                ? "border-gold bg-gold/10 text-gold"
                                : "border-gold/20 text-ivory/60 hover:border-gold/50"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Personal Details */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-serif text-2xl text-ivory mb-8">Your Details</h2>
                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                        placeholder="Last name"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-between">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`px-8 py-4 rounded-full border font-sans text-xs tracking-[0.2em] uppercase transition-all ${
                  step === 1
                    ? "border-gold/10 text-ivory/20 cursor-not-allowed"
                    : "border-gold/30 text-gold hover:bg-gold/10"
                }`}
              >
                Back
              </button>

              <button
                onClick={step === 4 ? handleSubmit : handleNext}
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && !selectedLocation) ||
                  (step === 3 && (!selectedDate || !selectedTime)) ||
                  (step === 4 && (!formData.email || !formData.phone))
                }
                className={`px-8 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${
                  step === 1 && !selectedService
                    ? "bg-gold/30 text-obsidian/50 cursor-not-allowed"
                    : step === 2 && !selectedLocation
                    ? "bg-gold/30 text-obsidian/50 cursor-not-allowed"
                    : step === 3 && (!selectedDate || !selectedTime)
                    ? "bg-gold/30 text-obsidian/50 cursor-not-allowed"
                    : step === 4 && (!formData.email || !formData.phone)
                    ? "bg-gold/30 text-obsidian/50 cursor-not-allowed"
                    : "bg-gold-gradient text-obsidian font-semibold hover:opacity-90"
                }`}
              >
                {step === 4 ? "Confirm Booking" : "Next"}
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-bright/20 border-2 border-emerald-bright flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} className="text-emerald-bright" />
            </div>

            <div>
              <h2 className="font-serif text-4xl text-ivory mb-4">Appointment Confirmed</h2>
              <p className="font-sans text-lg text-ivory/60 max-w-2xl mx-auto">
                Thank you for booking your consultation. We've sent a confirmation email to {formData.email}.
              </p>
            </div>

            <div className="glass border border-gold/10 rounded-2xl p-8 max-w-2xl mx-auto text-left space-y-4">
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/70">Service</p>
                <p className="font-serif text-lg text-ivory">
                  {services.find((s) => s.id === selectedService)?.name}
                </p>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/70">Location</p>
                <p className="font-serif text-lg text-ivory">
                  {locations.find((l) => l.id === selectedLocation)?.name}
                </p>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/70">Date & Time</p>
                <p className="font-serif text-lg text-ivory">
                  {selectedDate} at {selectedTime}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/"
                className="px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity"
              >
                Back to Home
              </a>
              <a
                href="/shop"
                className="px-8 py-4 rounded-full border border-gold/30 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
