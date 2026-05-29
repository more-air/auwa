import { redirect } from "next/navigation";

/*
  The Firefly Trove was merged into the Light section (29 May 2026):
  Light now toggles between Capture and Trove. This route survives only
  to redirect any old link or bookmark to its new home.
*/
export default function TroveRedirect() {
  redirect("/light");
}
