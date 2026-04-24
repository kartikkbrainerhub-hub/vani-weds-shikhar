// Wedding configuration — edit names, dates, venues here
export const WEDDING_CONFIG = {
  groom: "Shikhar",
  bride: "Vani",
  weddingDate: new Date("2026-05-14T11:00:00"),
  tagline: "Together with their families, joyfully request your presence",
  hashtag: "#ShiVa",

  events: [
    {
      id: 1,
      title: "Mehendi",
      label: "Invite Only",
      date: "May 12, 2026",
      time: "4:00 PM onwards",
      venue: "Sweet Home",
      address: "B-32, Neeldeep Apartment, Sandesh Press Road, Bodakdev, Ahmedabad 380054",
      mapLink: "https://maps.app.goo.gl/rY7jHkiyEcyFnQYR8",
      icon: "🎨",
      color: "from-green-50 to-emerald-100",
    },
    {
      id: 2,
      title: "Ganesh Sthapna",
      label: "Invite Only",
      date: "May 13, 2026",
      time: "8:15 AM onwards",
      venue: "Sweet Home",
      address: "B-32, Neeldeep Apartment, Sandesh Press Road, Bodakdev, Ahmedabad 380054",
      mapLink: "https://maps.app.goo.gl/rY7jHkiyEcyFnQYR8",
      icon: "🕉️",
      color: "from-orange-50 to-yellow-100",
    },
    {
      id: 3,
      title: "Haldi",
      label: "Invite Only",
      date: "May 13, 2026",
      time: "4:30 PM onwards",
      venue: "Thaltej Community Hall",
      address: "Thaltej, Ahmedabad",
      mapLink: "https://maps.app.goo.gl/kcv7UmZD1vZhpF9XA",
      icon: "✨",
      color: "from-yellow-50 to-amber-100",
    },
    {
      id: 4,
      title: "Jan Aagman",
      label: "Invite Only",
      date: "May 14, 2026",
      time: "9:30 AM onwards",
      venue: "Sarkhej (AMC) Community Hall",
      address: "Beside SPIPA RTC, Prahlad Nagar, Ahmedabad",
      mapLink: "https://maps.app.goo.gl/HjLo5W9NQJgr64U2A",
      icon: "🎺",
      color: "from-red-50 to-rose-100",
    },
    {
      id: 5,
      title: "Hastmelap",
      label: "Invite Only",
      date: "May 14, 2026",
      time: "10:57 AM",
      venue: "Sarkhej (AMC) Community Hall",
      address: "Beside SPIPA RTC, Prahlad Nagar, Ahmedabad",
      mapLink: "https://maps.app.goo.gl/HjLo5W9NQJgr64U2A",
      icon: "🤝",
      color: "from-gold-50 to-cream-100",
    },
  ],

  story: [
    {
      year: "2017",
      title: "First Meeting",
      text: "Two friends with opposite personalities found a shared interest. What started as friendship slowly turned into love.",
      side: "left",
    },
    {
      year: "2018",
      title: "First Date",
      text: "On a rainy evening, a surprise birthday date at a rooftop café brought them closer. Endless conversations made them realize they were meant to be.",
      side: "right",
    },
    {
      year: "2018",
      title: "Proposal",
      text: "On a call, Shikhar proposed. She couldn’t answer then—but when they met, her yes said everything.",
      side: "left",
    },
    {
      year: "2026",
      title: "Happily Ever After",
      text: "Now they invite their family and dearest friends to witness and celebrate the beginning of their forever.",
      side: "right",
    },
  ],

  venueMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6979207044453!2d72.506528!3d23.01103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b278e0460ad%3A0x67ab7ae09dc9eb0c!2sSarkhej%20(AMC)%20Community%20Hall!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
};

export const API_BASE = import.meta.env.PROD 
  ? "/_/backend" 
  : "http://localhost:8000";
