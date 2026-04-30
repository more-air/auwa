/*
  Archive: desktop inline nav that shipped on auwa.life until April 2026.

  The live header now uses the hamburger + full-screen overlay on every
  viewport. If we ever want to bring the inline desktop links back, this
  snippet is the exact JSX that sat inside `<nav>` in `components/header.tsx`
  to the right of the Auwa wordmark, guarded by `hidden md:flex`.

  To restore:
  1. Re-add `{ label: "Journal", href: "/journal" }, …` to `navItems` in
     header.tsx (already present).
  2. Paste the block below between the `<Link href="/">` logo and the
     hamburger `<button>`.
  3. Add `md:hidden` back to the hamburger button so the two don't both
     render on desktop.
  4. Swap the menu overlay's responsive classes back to `md:hidden`
     so it doesn't engage on desktop.
*/

// Inside the header:
// <ul className="hidden md:flex items-center gap-8 lg:gap-10">
//   {navItems.map((item) => {
//     const active = pathname === item.href;
//     return (
//       <li key={item.href}>
//         <Link
//           href={item.href}
//           aria-current={active ? "page" : undefined}
//           className={`group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase transition-colors duration-300 ${
//             isTransparent
//               ? "text-white"
//               : active
//                 ? "text-sumi"
//                 : "text-sumi hover:text-sumi/55"
//           }`}
//         >
//           <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
//             {item.label}
//           </span>
//           <span
//             aria-hidden="true"
//             className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
//           >
//             {item.label}
//           </span>
//         </Link>
//       </li>
//     );
//   })}
// </ul>

export {};
