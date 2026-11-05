import html from "./about.html?raw";

export const templateAbout = (container: HTMLElement) => {
  container.innerHTML = html;
}
