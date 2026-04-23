import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { API_BASE } from "../config";
import { Heart, Send, CheckCircle, XCircle } from "lucide-react";

const initialForm = { name: "", attending: "yes", message: "", guests: "1" };

export default function RSVPSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

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

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not connect to server. Please try again later.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="rsvp"
      className="section-padding"
      style={{
        background:
          "linear-gradient(135deg, #fdfaf5 0%, #fff5f7 40%, #faf4e8 70%, #fdfaf5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(253,164,175,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(234,179,8,0.06) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />
      {["🌸", "💐", "🌺", "✦"].map((icon, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: "1.5rem",
            opacity: 0.15,
            left: `${15 + i * 25}%`,
            top: `${10 + (i % 2) * 75}%`,
          }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4 + i, repeat: Infinity }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#ca8a04", marginBottom: "0.5rem" }}
        >
          Will You Join Us?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          RSVP
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="ornament-divider"
        >
          <span>✦</span>
          <span>💌</span>
          <span>✦</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#7a6052", maxWidth: 480, margin: "1rem auto 0", lineHeight: 1.7 }}
        >
          Kindly respond by <strong>December 1, 2026</strong>. Your presence would make our day even more special.
        </motion.p>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="luxury-card"
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "2.5rem 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Success state */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ textAlign: "center", padding: "2rem 0" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={64} color="#ca8a04" style={{ margin: "0 auto 1rem", display: "block" }} />
              </motion.div>
              <h3
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", color: "#3d2b1f", margin: "0 0 0.75rem" }}
              >
                Thank You!
              </h3>
              <p style={{ fontFamily: "'Lato', sans-serif", color: "#6b4c3b", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Your RSVP has been received. We can't wait to celebrate with you! 🎉
              </p>
              <button
                className="btn-gold"
                onClick={() => setStatus("idle")}
              >
                Submit Another Response
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        {status !== "success" && (
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b4c3b", display: "block", marginBottom: "0.5rem" }}
              >
                Full Name *
              </label>
              <input
                className="rsvp-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Attending */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b4c3b", display: "block", marginBottom: "0.5rem" }}
              >
                Will You Attend?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { value: "yes", label: "🎉 Joyfully Accepts", icon: "✅" },
                  { value: "no", label: "😢 Regretfully Declines", icon: "❌" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.875rem 1rem",
                      border: `1.5px solid ${form.attending === opt.value ? "#eab308" : "rgba(234,179,8,0.25)"}`,
                      borderRadius: "0.75rem",
                      cursor: "pointer",
                      background: form.attending === opt.value ? "rgba(234,179,8,0.08)" : "white",
                      transition: "all 0.2s ease",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.82rem",
                      color: "#3d2b1f",
                      fontWeight: form.attending === opt.value ? 700 : 400,
                    }}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={opt.value}
                      checked={form.attending === opt.value}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Number of guests (only if attending) */}
            {form.attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: "1.25rem", overflow: "hidden" }}
              >
                <label
                  style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b4c3b", display: "block", marginBottom: "0.5rem" }}
                >
                  Number of Guests
                </label>
                <select
                  className="rsvp-input"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  style={{ appearance: "none", cursor: "pointer" }}
                >
                  {["1", "2", "3", "4", "5"].map((n) => (
                    <option key={n} value={n}>{n} {n === "1" ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Message */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b4c3b", display: "block", marginBottom: "0.5rem" }}
              >
                Message to the Couple (Optional)
              </label>
              <textarea
                className="rsvp-input"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Share your wishes for the couple..."
                rows={3}
                style={{ resize: "vertical", minHeight: "90px" }}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  marginBottom: "1rem",
                }}
              >
                <XCircle size={16} color="#ef4444" />
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#dc2626" }}>{errorMsg}</span>
              </motion.div>
            )}
            {errorMsg && status === "idle" && (
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#dc2626", marginBottom: "1rem" }}>
                {errorMsg}
              </p>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
              className="btn-gold"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.625rem",
                opacity: status === "loading" ? 0.7 : 1,
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading" ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Heart size={15} fill="white" />
                  Send RSVP
                  <Send size={14} />
                </>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
