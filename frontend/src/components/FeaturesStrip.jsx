import React from "react";

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    ),
    title: "Fast Delivery",
    desc: "Quick and reliable delivery to your doorstep"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2zm-5 4v2m0 0h.01" /></svg>
    ),
    title: "Secure Payments",
    desc: "100% safe and secure payment options"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "24/7 Support",
    desc: "We are here to help,\nanytime"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7v4a2 2 0 01-2 2H7a2 2 0 01-2-2V7m0 0V5a2 2 0 012-2h10a2 2 0 012 2v2" /></svg>
    ),
    title: "Easy Returns",
    desc: "Hassle-free returns\nwithin 7 days"
  }
];

export default function FeaturesStrip() {
  const cardColors = [
    'bg-blue-50',
    'bg-green-50',
    'bg-yellow-50',
    'bg-pink-50'
  ];
  return (
    <section className="w-full bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8">
        {features.map((f, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center text-center rounded-2xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-xl ${cardColors[i % cardColors.length]}`}
            style={{ minHeight: 180 }}
          >
            <div className="mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 shadow mx-auto" style={{ minHeight: 64 }}>
              {React.cloneElement(f.icon, { className: 'w-10 h-10 text-primary-600', style: { display: 'block' } })}
            </div>
            <h3 className="text-xl font-bold text-primary-700 mb-1 tracking-wide drop-shadow">{f.title}</h3>
            <p className="text-gray-700 text-base font-medium opacity-80 whitespace-pre-line">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
