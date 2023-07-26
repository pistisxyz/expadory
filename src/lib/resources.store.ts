import { writable } from "svelte/store";

export const metalStore = {
  rawStone: writable(0),
  malachite: writable(0)
}