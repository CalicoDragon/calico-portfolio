import html from "./portfolio.html?raw";

export const templatePortfolio = (container: HTMLElement) => {
  container.innerHTML = html;
};
