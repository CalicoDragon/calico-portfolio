import html from "./main.html?raw";

import { templateHero } from "../components/hero.ts";
import { templateAbout } from "../components/about.ts";
import { templatePortfolio } from "../components/portfolio.ts";

export const templateMain = (container: HTMLElement) => {
  container.innerHTML = html;

  const hero = document.getElementById("hero");
  if (hero) {
    templateHero(hero);
  }
  const about = document.getElementById("about");
  if (about) {
    templateAbout(about);
  }
  const portfolio = document.getElementById("portfolio");
  if (portfolio) {
    templatePortfolio(portfolio);
  }
};
