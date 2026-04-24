import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../config";
import { Heart, CheckCircle, XCircle } from "lucide-react";

const initialForm = { name: "", attending: "yes", message: "", guests: "1" };

export default function RSVPSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); 
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          attending: form.attending === "yes",
          message: form.message.trim(),
          guests: parseInt(form.guests, 10) || 1,
        }),
      });

      if (!res.ok) throw new Error("Submission failed.");

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="rsvp" className="section-padding bg-[#fdfaf5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-['Dancing_Script'] text-2xl text-[#D4AF37] block mb-2">
            R.S.V.P
          </span>
          <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-[#3d2b1f]">
            Join Us
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-6 opacity-40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto p-8 md:p-12 bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-[#D4AF37]/10"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                <h3 className="font-['Playfair_Display'] text-3xl font-bold text-[#3d2b1f] mb-4">Shukriya!</h3>
                <p className="font-['Cormorant_Garamond'] text-xl text-[#7a6052]">We have received your response.</p>
                <button onClick={() => setStatus("idle")} className="mt-8 text-[#D4AF37] font-bold underline">Submit another</button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-['Playfair_Display'] text-lg font-bold text-[#3d2b1f] mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full px-6 py-4 rounded-xl bg-white/50 border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all font-['Lato']"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['Playfair_Display'] text-lg font-bold text-[#3d2b1f] mb-2">Will you attend?</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, attending: val }))}
                        className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${
                          form.attending === val 
                            ? "bg-[#3d2b1f] text-white shadow-lg" 
                            : "bg-white text-[#3d2b1f] border border-[#D4AF37]/20"
                        }`}
                      >
                        {val === "yes" ? "Yes, I'll be there" : "No, I can't make it"}
                      </button>
                    ))}
                  </div>
                </div>

                {form.attending === "yes" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label className="block font-['Playfair_Display'] text-lg font-bold text-[#3d2b1f] mb-2">Number of Guests</label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-xl bg-white/50 border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all font-['Lato']"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>
                      ))}
                    </select>
                  </motion.div>
                )}

                <div>
                  <label className="block font-['Playfair_Display'] text-lg font-bold text-[#3d2b1f] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Any message for the couple?"
                    rows={4}
                    className="w-full px-6 py-4 rounded-xl bg-white/50 border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all font-['Lato']"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm text-center font-bold flex items-center justify-center gap-2">
                    <XCircle size={16} /> {errorMsg}
                  </p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "loading"}
                  className="w-full py-5 rounded-full bg-gradient-to-r from-[#ca8a04] via-[#eab308] to-[#ca8a04] text-white font-['Playfair_Display'] text-xl font-bold shadow-xl shadow-yellow-900/30 transition-all flex items-center justify-center gap-3 border-none"
                >
                  {status === "loading" ? "Confirming..." : (
                    <>
                      Confirm <Heart size={20} fill="white" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
