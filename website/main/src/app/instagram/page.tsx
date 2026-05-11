import { loadPlan } from "./lib";
import { TileContent } from "./tile-content";
import { DraggableGrid } from "./draggable-grid";

export const metadata = {
  title: "Instagram Plan | Auwa",
  description: "Internal planning view for Instagram content.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/* ─── Avatar (live profile image from social/profiles/) ─── */

function AuwaAvatar({ size }: { size: number }) {
  return (
    <div
      className="rounded-full overflow-hidden bg-sumi"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/api/social-media/profiles/instagram-avatar.png"
        alt="Auwa"
        width={size}
        height={size}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/* ─── Profile header ─── */

function ProfileHeader({ count }: { count: number }) {
  return (
    <div className="border-b border-[#dbdbdb]">
      <div className="hidden md:flex items-center gap-16 px-12 py-10 max-w-[935px] mx-auto">
        <div className="shrink-0">
          <AuwaAvatar size={150} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[20px] font-sans font-normal text-sumi">auwa.life</h2>
            <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-sumi/50 border border-sumi/20 px-2 py-0.5 rounded-sm">Planning</span>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="font-sans text-[14px] text-sumi"><span className="font-medium">{count}</span> posts</div>
            <div className="font-sans text-[14px] text-sumi"><span className="font-medium">4,682</span> followers</div>
            <div className="font-sans text-[14px] text-sumi"><span className="font-medium">152</span> following</div>
          </div>
          <div className="font-sans text-[14px] text-sumi leading-[1.5]">
            <p className="font-medium">Auwa</p>
            <p className="font-jp-serif text-sumi/70 mt-1">こころのある暮らし。心 (kokoro) をすべてに。</p>
            <p className="text-sumi/70">A Japanese lifestyle brand. Awareness, craft, and kokoro in all things.</p>
            <p className="text-[#00376b] mt-1">auwa.life</p>
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pt-3 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="shrink-0">
            <AuwaAvatar size={86} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <h2 className="font-sans text-[20px] font-normal text-sumi">auwa.life</h2>
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-sumi/50 border border-sumi/20 px-1.5 py-0.5 rounded-sm">Planning</span>
            </div>
            <div className="flex gap-6">
              <div className="font-sans text-[14px] text-sumi"><span className="font-semibold">{count}</span> posts</div>
              <div className="font-sans text-[14px] text-sumi"><span className="font-semibold">4,682</span> followers</div>
              <div className="font-sans text-[14px] text-sumi"><span className="font-semibold">152</span> following</div>
            </div>
          </div>
        </div>
        <div className="font-sans text-[14px] text-sumi leading-[1.4] mb-1">
          <p className="font-medium">Auwa</p>
          <p className="font-jp-serif text-sumi/70 mt-0.5">こころのある暮らし。心 (kokoro) をすべてに。</p>
          <p className="text-sumi/70">A Japanese lifestyle brand. Awareness, craft, and kokoro in all things.</p>
          <p className="text-[#00376b] mt-0.5">auwa.life</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab bar ─── */

function TabBar() {
  return (
    <div className="border-b border-[#dbdbdb] max-w-[935px] mx-auto">
      <div className="flex justify-around md:justify-start">
        <button type="button" aria-label="Plan" className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-6 py-3 border-t border-sumi text-sumi -mb-px">
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
          <span className="hidden md:inline text-[12px] font-sans font-medium uppercase tracking-[0.14em]">Plan</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default async function InstagramPlanPage() {
  const { scheduled, backlog, totalFolders } = await loadPlan();
  const liveCount = scheduled.filter((t) => t.exists).length + backlog.length;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[975px] mx-auto">
        <ProfileHeader count={liveCount} />
        <TabBar />

        <div className="pt-4 md:pt-6" />

        <DraggableGrid initialTiles={scheduled} />

        {backlog.length > 0 && (
          <>
            <div className="max-w-[935px] mx-auto px-4 md:px-12 pt-10 pb-3">
              <div className="font-sans text-[12px] uppercase tracking-[0.14em] text-sumi/50 mb-1">
                Backlog · {backlog.length} {backlog.length === 1 ? "folder" : "folders"}
              </div>
              <div className="font-sans text-[12px] text-sumi/50">
                Folders that exist on disk but aren&rsquo;t in <span className="font-mono">_schedule.txt</span>.
              </div>
            </div>
            <div className="max-w-[935px] mx-auto">
              <div className="grid grid-cols-3 gap-[3px] md:gap-1">
                {backlog.map((tile, i) => (
                  <TileContent key={`b-${tile.slug}`} tile={tile} position={i + 1} dimmed />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="max-w-[935px] mx-auto px-4 md:px-12 py-12 font-sans text-[12px] text-sumi/45">
          {totalFolders} {totalFolders === 1 ? "folder" : "folders"} discovered in <span className="font-mono">social/instagram/</span>.
          Drag tiles to reorder, or edit <span className="font-mono">social/instagram/_schedule.txt</span> directly.
        </div>
      </div>
    </main>
  );
}
