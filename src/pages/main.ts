import html from "./main.html?raw";

import { templateHero } from "../components/hero.ts";

export const templateMain = (container: HTMLElement) => {
  container.innerHTML = html;

  const hero = document.getElementById("hero");
  if (hero) {
    templateHero(hero);
  }
};
