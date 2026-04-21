import Image from "next/image";

export const metadata = {
  title: "Instagram | AUWA",
  description: "Instagram grid preview for planning.",
  robots: { index: false, follow: false },
};

/* ─── Grid data ─── */

const posts = [
  // Row 1
  { src: "/journal/auwa-book/auwa-book-cosmic.jpg", alt: "AUWA character against cosmic background" },
  { src: "/journal/washi/washi-rieko.jpg", alt: "Rieko dipping sugeta frame into mulberry pulp" },
  { src: "/pillars/book.jpg", alt: "AUWA illustrated story universe" },

  // Row 2
  { src: "/pillars/store.jpg", alt: "AUWA store craftsman objects teaser" },
  { src: "/journal/auwa-book/auwa-book-procreate.jpg", alt: "Rieko drawing AUWA character in Procreate" },
  { src: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-gate.jpg", alt: "Red zuijinmon gate with shimenawa in snow" },

  // Row 3
  { src: "/journal/narai-juku/narai-juku-snowfall.jpg", alt: "Figure walking through heavy snowfall in Narai-juku" },
  { src: "/pillars/app.jpg", alt: "Kokoro Mirror app teaser" },
  { src: "/journal/auwa-book/auwa-book-hero.jpg", alt: "AUWA book hero illustration" },

  // Row 4
  { src: "/journal/koya-san/koya-san-monk.jpg", alt: "Monk walking through Okunoin cemetery with umbrella" },
  { src: "/journal/72-seasons/72-seasons-tsukubai.jpg", alt: "Stone water basin with fallen maple leaves" },
  { src: "/journal/shigefusa/shigefusa-blade.jpg", alt: "Kitaeji damascus pattern on Shigefusa blade" },

  // Row 5
  { src: "/journal/narai-juku/narai-juku-facade.jpg", alt: "Latticed wooden facade with indigo noren in snow" },
  { src: "/journal/auwa-book/auwa-book-sketches.jpg", alt: "AUWA character pencil sketches on desk" },
  { src: "/journal/the-onsen-lesson/the-onsen-lesson-ladles.jpg", alt: "Wooden ladles and metal basin at onsen drinking station" },
];

/* ─── Avatar SVG (the "A" glyph) ─── */

function AuwaAvatar({ size }: { size: number }) {
  const svgSize = size * 0.38;
  return (
    <div
      className="rounded-full bg-void flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={svgSize} height={svgSize} viewBox="-4 -5 117 114" className="-translate-y-[2px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80.1079 89.5323L50.1624 18.5449L21.433 89.3803C21.0277 90.4951 20.6223 91.6098 20.217 92.7245C19.913 93.7379 19.761 94.6499 19.761 95.4606C19.761 97.7914 20.825 99.4635 22.9531 100.477C25.0812 101.389 28.7801 101.946 34.0497 102.149V108.077H0V102.149C2.02676 101.845 3.85085 101.338 5.47227 100.629C7.19502 99.9195 8.46174 98.5514 9.27245 96.5247L45.2982 10.0325L40.586 0H57.4588L99.2608 96.5247C100.072 98.5514 101.237 99.9195 102.757 100.629C104.277 101.338 106.152 101.845 108.381 102.149V108.077H67.6433V102.149C72.9129 101.946 76.5611 101.389 78.5878 100.477C80.7159 99.5648 81.78 97.9434 81.78 95.6126C81.78 94.7006 81.628 93.7379 81.3239 92.7245C81.0199 91.7111 80.6146 90.6471 80.1079 89.5323ZM24.3212 72.8115V66.1232H80.7159V72.8115H24.3212Z" fill="white"/>
      </svg>
    </div>
  );
}

/* ─── Profile header ─── */

function ProfileHeader() {
  return (
    <div className="border-b border-[#dbdbdb]">
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-16 px-12 py-10 max-w-[935px] mx-auto">
        <div className="shrink-0">
          <AuwaAvatar size={150} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[20px] font-sans font-normal text-void">auwa.life</h2>
            <svg className="w-[18px] h-[18px] text-[#0095f6]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.4 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 5.6-5.6 1.4 1.4-7 7z"/></svg>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="font-sans text-[14px] text-void"><span className="font-medium">{posts.length}</span> posts</div>
            <div className="font-sans text-[14px] text-void"><span className="font-medium">4,682</span> followers</div>
            <div className="font-sans text-[14px] text-void"><span className="font-medium">152</span> following</div>
          </div>
          <div className="font-sans text-[14px] text-void leading-[1.5]">
            <p className="font-medium">AUWA</p>
            <p className="text-void/70 mt-1">Japanese philosophical awareness for modern life.</p>
            <p className="text-void/70">Craft · Seasons · Stories · Kokoro</p>
            <p className="text-[#00376b] mt-1">auwa.life</p>
          </div>
        </div>
      </div>

      {/* Mobile — matches current IG layout (Kinfolk/Hodinkee style) */}
      <div className="md:hidden px-4 pt-3 pb-3">
        {/* Row 1: Avatar + handle */}
        <div className="flex items-center gap-3 mb-3">
          <div className="shrink-0">
            <AuwaAvatar size={86} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <h2 className="font-sans text-[20px] font-normal text-void">auwa.life</h2>
              <svg className="w-[16px] h-[16px] text-[#0095f6]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.4 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 5.6-5.6 1.4 1.4-7 7z"/></svg>
            </div>
            {/* Stats row */}
            <div className="flex gap-6">
              <div className="font-sans text-[14px] text-void"><span className="font-semibold">{posts.length}</span> posts</div>
              <div className="font-sans text-[14px] text-void"><span className="font-semibold">4,682</span> followers</div>
              <div className="font-sans text-[14px] text-void"><span className="font-semibold">152</span> following</div>
            </div>
          </div>
        </div>
        {/* Bio */}
        <div className="font-sans text-[14px] text-void leading-[1.4] mb-1">
          <p className="font-medium">AUWA</p>
          <p className="text-void/70 mt-0.5">Japanese philosophical awareness for modern life.</p>
          <p className="text-void/70">Craft · Seasons · Stories · Kokoro</p>
          <p className="text-[#00376b] mt-0.5">auwa.life</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Story highlights ─── */

const highlights = [
  { label: "Kokoro", src: "/journal/auwa-book/auwa-book-cosmic.jpg", alt: "Kokoro Mirror" },
  { label: "Craft", src: "/journal/shigefusa/shigefusa-blade.jpg", alt: "Japanese craft" },
  { label: "Seasons", src: "/journal/72-seasons/72-seasons-tsukubai.jpg", alt: "72 micro-seasons" },
  { label: "Stories", src: "/pillars/book.jpg", alt: "AUWA stories" },
  { label: "Japan", src: "/journal/koya-san/koya-san-monk.jpg", alt: "Japan travel" },
  { label: "Process", src: "/journal/auwa-book/auwa-book-sketches.jpg", alt: "Creative process" },
];

function StoryHighlights() {
  return (
    <div className="max-w-[935px] mx-auto px-4 md:px-12 py-4 md:py-8">
      <div className="flex gap-4 md:gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {highlights.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="w-[64px] h-[64px] md:w-[77px] md:h-[77px] rounded-full p-[2px] bg-gradient-to-br from-[#dbdbdb] to-[#dbdbdb]">
              <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                <Image
                  src={h.src}
                  alt={h.alt}
                  width={77}
                  height={77}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="font-sans text-[12px] text-void/80 max-w-[64px] md:max-w-[77px] text-center truncate">{h.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tab bar (icons only on mobile, labels on desktop) ─── */

function TabBar() {
  return (
    <div className="border-b border-[#dbdbdb] max-w-[935px] mx-auto">
      <div className="flex justify-around md:justify-start">
        {/* Grid tab (active) */}
        <button type="button" aria-label="Posts" className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-6 py-3 border-t border-void text-void -mb-px">
          <svg className="w-[22px] h-[22px] md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" rx="0.5"/>
            <rect x="9" y="1" width="6" height="6" rx="0.5"/>
            <rect x="17" y="1" width="6" height="6" rx="0.5"/>
            <rect x="1" y="9" width="6" height="6" rx="0.5"/>
            <rect x="9" y="9" width="6" height="6" rx="0.5"/>
            <rect x="17" y="9" width="6" height="6" rx="0.5"/>
            <rect x="1" y="17" width="6" height="6" rx="0.5"/>
            <rect x="9" y="17" width="6" height="6" rx="0.5"/>
            <rect x="17" y="17" width="6" height="6" rx="0.5"/>
          </svg>
          <span className="hidden md:inline text-[12px] font-sans font-medium uppercase tracking-[0.08em]">Posts</span>
        </button>
        {/* Reels tab */}
        <button type="button" aria-label="Reels" className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-6 py-3 text-void/30 -mb-px cursor-default">
          <svg className="w-[22px] h-[22px] md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          <span className="hidden md:inline text-[12px] font-sans font-medium uppercase tracking-[0.08em]">Reels</span>
        </button>
        {/* Tagged tab */}
        <button type="button" aria-label="Tagged" className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-6 py-3 text-void/30 -mb-px cursor-default">
          <svg className="w-[22px] h-[22px] md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-6-4h8v2h-8v-2z"/>
          </svg>
          <span className="hidden md:inline text-[12px] font-sans font-medium uppercase tracking-[0.08em]">Tagged</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Image grid (4:5 portrait, matching Instagram's current grid) ─── */

function PostGrid() {
  return (
    <div className="max-w-[935px] mx-auto">
      <div className="grid grid-cols-3 gap-[3px] md:gap-1">
        {posts.map((post, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden bg-[#efefef] group">
            <Image
              src={post.src}
              alt={post.alt}
              fill
              sizes="(max-width: 768px) 33vw, 311px"
              className="object-cover transition-opacity duration-200 group-hover:opacity-90"
            />
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-void/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="font-sans text-[11px] text-white font-medium">{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function InstagramPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[975px] mx-auto">
        <ProfileHeader />
        <StoryHighlights />
        <TabBar />
        <PostGrid />
      </div>
    </main>
  );
}
