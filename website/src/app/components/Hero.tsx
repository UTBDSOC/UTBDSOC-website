{/* Bottom buttons */}
<div
  className={[
    "absolute left-0 right-0",
    // mobile: closer to bottom, safe area, padding sides
    "bottom-4 px-4 pb-[env(safe-area-inset-bottom)]",
    // desktop: original spacing
    "md:bottom-8 md:px-0",
    "flex justify-center"
  ].join(" ")}
>
  <div
    className={[
      // mobile: stack + full width
      "w-full max-w-md flex flex-col gap-3",
      // desktop: row layout like before
      "md:max-w-none md:w-auto md:flex-row md:gap-4"
    ].join(" ")}
  >
    <button
      aria-label="View events"
      className={[
        "relative font-semibold rounded-2xl shadow-lg transition",
        "bg-[#ff7a1a] text-black",
        // mobile: bigger touch area + full width
        "w-full py-4 text-base",
        // desktop: original sizing
        "md:w-auto md:px-7 md:py-3.5 md:text-sm",
        // interaction
        "hover:translate-y-[-1px] hover:shadow-xl",
        "focus:outline-none focus:ring-4 focus:ring-[#ff7a1a]/35",
        "will-change-transform transform-gpu",
        "btn-pulse"
      ].join(" ")}
    >
      Events
    </button>

    <button
      aria-label="View membership"
      className={[
        "relative font-semibold rounded-2xl transition",
        "border border-[#ff7a1a] text-[#ff7a1a] bg-white/0",
        // mobile: bigger touch area + full width
        "w-full py-4 text-base",
        // desktop: original sizing
        "md:w-auto md:px-7 md:py-3.5 md:text-sm",
        // interaction
        "hover:bg-[#ff7a1a] hover:text-black hover:shadow-xl",
        "focus:outline-none focus:ring-4 focus:ring-[#ff7a1a]/35",
        "will-change-transform transform-gpu"
      ].join(" ")}
    >
      Membership
    </button>
  </div>
</div>
