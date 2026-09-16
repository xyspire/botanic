'use client';

export default function ClientLogos() {
  const logoItems = [
    {
      id: 'lipu',
      render: () => (
        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <svg className="h-7 w-auto" viewBox="0 0 100 32" fill="#8f8f8b">
            <rect x="0" y="2" width="14" height="28" rx="3" transform="skewX(-15)" />
            <rect x="18" y="2" width="14" height="28" rx="3" transform="skewX(-15)" />
            <rect x="36" y="2" width="14" height="28" rx="3" transform="skewX(-15)" />
            <rect x="54" y="10" width="14" height="20" rx="3" transform="skewX(-15)" />
            <circle cx="72" cy="5" r="3.5" />
          </svg>
          <span className="font-electrolize text-xl font-bold tracking-tighter text-[#8f8f8b]">
            IPSUM
          </span>
        </div>
      ),
    },
    {
      id: 'logo-square',
      render: () => (
        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-6 h-6 border-2 border-[#8f8f8b] flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#8f8f8b]" />
          </div>
          <span className="font-electrolize text-2xl font-black tracking-widest text-[#8f8f8b]">
            OGO
          </span>
        </div>
      ),
    },
    {
      id: 'infinity-loop',
      render: () => (
        <div className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <svg className="w-14 h-8" viewBox="0 0 60 30" fill="none" stroke="#8f8f8b" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 C 8 6, 6 24, 18 24 C 26 24, 34 6, 42 6 C 54 6, 54 24, 42 24 C 34 24, 26 6, 18 6 Z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'ipsum-clean',
      render: () => (
        <div className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <span className="font-josefin text-3xl font-black tracking-wider text-[#8f8f8b]">
            IPSUM<sup className="text-xs ml-0.5">®</sup>
          </span>
        </div>
      ),
    },
    {
      id: 'loqo-rounded',
      render: () => (
        <div className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <svg className="h-7 w-auto" viewBox="0 0 110 32" fill="#8f8f8b">
            <path d="M6 4 H24 V10 H14 V26 H6 Z" />
            <rect x="28" y="4" width="22" height="22" rx="7" fill="none" stroke="#8f8f8b" strokeWidth="5" />
            <rect x="56" y="4" width="22" height="22" rx="7" fill="none" stroke="#8f8f8b" strokeWidth="5" />
            <path d="M84 4 H102 V26 H84 Z M90 10 V20 H96 V10 Z" />
          </svg>
        </div>
      ),
    },
  ];

  // Repeat logos 4 times for seamless infinite loop on any screen width
  const fullList = [...logoItems, ...logoItems, ...logoItems, ...logoItems];

  return (
    <div
      id="client-logos-marquee"
      className="w-full bg-[#f4f3ea] border-t border-b border-[#dedccf] overflow-hidden relative z-20 select-none py-0"
    >
      <div className="flex animate-marquee-infinite">
        {fullList.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center justify-center min-w-[200px] sm:min-w-[240px] md:min-w-[260px] h-20 sm:h-24 px-8 border-r border-[#dedccf] shrink-0"
          >
            {item.render()}
          </div>
        ))}
      </div>
    </div>
  );
}
