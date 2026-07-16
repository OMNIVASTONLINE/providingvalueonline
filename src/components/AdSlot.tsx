type AdSlotVariant = "in-feed" | "in-article" | "sidebar" | "leaderboard";

const VARIANT_LABEL: Record<AdSlotVariant, string> = {
  "in-feed": "Advertisement",
  "in-article": "Advertisement",
  sidebar: "Advertisement",
  leaderboard: "Advertisement",
};

const VARIANT_HEIGHT: Record<AdSlotVariant, string> = {
  "in-feed": "min-h-[250px]",
  "in-article": "min-h-[280px]",
  sidebar: "min-h-[600px]",
  leaderboard: "min-h-[90px]",
};

/**
 * Reserved ad placeholder. Swap the placeholder <div> below for the
 * real <ins class="adsbygoogle" ...> unit once the AdSense account
 * for providingvalue.online is approved. Keeping a fixed min-height
 * prevents Cumulative Layout Shift (CLS) when the real ad loads.
 *
 * ---------------------------------------------------------------
 * 1) Add this ONCE in app/layout.tsx <head>, after AdSense approval:
 *
 * <script
 *   async
 *   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
 *   crossOrigin="anonymous"
 * />
 *
 * 2) Replace the placeholder markup in THIS file with:
 *
 * <ins
 *   className="adsbygoogle"
 *   style={{ display: "block" }}
 *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"
 *   data-ad-format="auto"
 *   data-full-width-responsive="true"
 * />
 *
 * 3) Push the ad from a tiny client component:
 *
 * "use client";
 * useEffect(() => {
 *   try {
 *     (window.adsbygoogle = window.adsbygoogle || []).push({});
 *   } catch (e) {}
 * }, []);
 * ---------------------------------------------------------------
 */
export default function AdSlot({
  variant = "in-feed",
  className = "",
}: {
  variant?: AdSlotVariant;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 bg-slate-50 ${VARIANT_HEIGHT[variant]} ${className}`}
      role="complementary"
      aria-label="Advertisement placeholder"
    >
      {/* AdSense script/unit slot — see component comments above */}
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {VARIANT_LABEL[variant]}
      </span>
      <span className="text-xs text-slate-400">Ad space reserved ({variant})</span>
    </div>
  );
}
