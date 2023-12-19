import { Lite as Cerbos } from "@cerbos/lite";
import fetch from "./fetchWithHeader";

const embeddedPdp = `${import.meta.env.VITE_CERBOS_HUB_WASM_BUNDLE_URL}`;

export let cerbos = new Cerbos(fetch(embeddedPdp));

// Reload the WASM every 10 seconds for demo purposes
setInterval(() => {
  cerbos = new Cerbos(fetch(embeddedPdp));
}, 1000 * 30);
