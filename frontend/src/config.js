// Wedding configuration — edit names, dates, venues here
export const WEDDING_CONFIG = {
  groom: "Shikhar",
  bride: "Vani",
  weddingDate: new Date("2026-05-14T11:00:00"), // Change to actual date
  tagline: "Together with their families, joyfully request your presence",
  hashtag: "#Shiva",

  events: [
    {
      id: 1,
      title: "Engagement Ceremony",
      date: "December 18, 2026",
      time: "5:00 PM – 9:00 PM",
      venue: "The Grand Pavilion",
      address: "12, Rose Garden Road, Mumbai 400001",
      icon: "💍",
      color: "from-blush-100 to-rose-100",
    },
    {
      id: 2,
      title: "Wedding Ceremony",
      date: "December 20, 2026",
      time: "11:00 AM – 2:00 PM",
      venue: "Royal Mahal, Worli",
      address: "45, Sea Link Drive, Mumbai 400018",
      icon: "💒",
      color: "from-cream-100 to-gold-100",
    },
    {
      id: 3,
      title: "Reception",
      date: "December 20, 2026",
      time: "7:00 PM – 11:00 PM",
      venue: "Taj Ballroom, Colaba",
      address: "Taj Palace, Apollo Bunder, Mumbai 400001",
      icon: "🎉",
      color: "from-purple-50 to-blush-100",
    },
  ],

  story: [
    {
      year: "2018",
      title: "First Meeting",
      text: "Two strangers met at a mutual friend's Diwali party. Arjun spilled his chai on Priya's dupatta — she called it fate; he called it clumsiness.",
      side: "left",
    },
    {
      year: "2019",
      title: "First Date",
      text: "A rainy Sunday afternoon at a tiny bookshop café. They talked for six hours, forgot their coffees went cold, and realized something magical had begun.",
      side: "right",
    },
    {
      year: "2020",
      title: "Long-Distance Love",
      text: "Priya moved to Bangalore for work. Midnight calls, care packages, and surprise visits kept the flame alive across 1,400 kilometres.",
      side: "left",
    },
    {
      year: "2022",
      title: "Reunited",
      text: "Arjun transferred to Bangalore. The moment she opened the door and saw him standing with a bouquet — they both knew this was forever.",
      side: "right",
    },
    {
      year: "2025",
      title: "The Proposal",
      text: "Under a canopy of fairy lights at Priya's favourite rooftop, Arjun got down on one knee. Through happy tears, she said yes before he even finished the question.",
      side: "left",
    },
    {
      year: "2026",
      title: "Happily Ever After",
      text: "Now they invite you — their family and dearest friends — to witness and celebrate the beginning of their forever together.",
      side: "right",
    },
  ],

  venueMapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15085.454898895668!2d72.82276!3d18.93380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce9b2e6b8c3b%3A0x67ab7ae09dc9eb0c!2sWorli%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
};

export const API_BASE = import.meta.env.PROD 
  ? "/_/backend" 
  : "http://localhost:8000";
