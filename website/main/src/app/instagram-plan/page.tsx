import { loadPlan } from "./lib";
import { TileContent } from "./tile-content";
import { DraggableGrid } from "./draggable-grid";

export const metadata = {
  title: "Instagram Plan | AUWA",
  description: "Internal planning view for Instagram content.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/* ─── Avatar ─── */

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

function ProfileHeader({ count }: { count: number }) {
  return (
    <div className="border-b border-[#dbdbdb]">
      <div className="hidden md:flex items-center gap-16 px-12 py-10 max-w-[935px] mx-auto">
        <div className="shrink-0">
          <AuwaAvatar size={150} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[20px] font-sans font-normal text-void">auwa.life</h2>
            <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-void/50 border border-void/20 px-2 py-0.5 rounded-sm">Planning</span>
          </div>
          <div className="flex gap-10 mb-5">
            <div className="font-sans text-[14px] text-void"><span className="font-medium">{count}</span> posts</div>
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

      <div className="md:hidden px-4 pt-3 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="shrink-0">
            <AuwaAvatar size={86} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <h2 className="font-sans text-[20px] font-normal text-void">auwa.life</h2>
              <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-void/50 border border-void/20 px-1.5 py-0.5 rounded-sm">Planning</span>
            </div>
            <div className="flex gap-6">
              <div className="font-sans text-[14px] text-void"><span className="font-semibold">{count}</span> posts</div>
              <div className="font-sans text-[14px] text-void"><span className="font-semibold">4,682</span> followers</div>
              <div className="font-sans text-[14px] text-void"><span className="font-semibold">152</span> following</div>
            </div>
          </div>
        </div>
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

/* ─── Tab bar ─── */

function TabBar() {
  return (
    <div className="border-b border-[#dbdbdb] max-w-[935px] mx-auto">
      <div className="flex justify-around md:justify-start">
        <button type="button" aria-label="Plan" className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-6 py-3 border-t border-void text-void -mb-px">
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
          <span className="hidden md:inline text-[12px] font-sans font-medium uppercase tracking-[0.08em]">Plan</span>
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
              <div className="font-sans text-[12px] uppercase tracking-[0.1em] text-void/50 mb-1">
                Backlog · {backlog.length} {backlog.length === 1 ? "folder" : "folders"}
              </div>
              <div className="font-sans text-[12px] text-void/50">
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

        <div className="max-w-[935px] mx-auto px-4 md:px-12 py-12 font-sans text-[12px] text-void/40">
          {totalFolders} {totalFolders === 1 ? "folder" : "folders"} discovered in <span className="font-mono">social/instagram/</span>.
          Drag tiles to reorder, or edit <span className="font-mono">social/instagram/_schedule.txt</span> directly.
        </div>
      </div>
    </main>
  );
}
