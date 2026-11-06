import html from "./about.html?raw";

export const templateAbout = (container: HTMLElement) => {
  container.innerHTML = html;

  const buttons = container.querySelectorAll<HTMLButtonElement>(".about-btn");
  const panels = container.querySelectorAll<HTMLDivElement>(".about-panel");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("selected"));
      panels.forEach((p) => p.classList.remove("visible"));

      const target = button.dataset.target;
      if (!target) return;
      
      button.classList.add("selected");
      container.querySelector<HTMLDivElement>(`#${target}`)?.classList.add("visible");
      container.querySelector<HTMLDivElement>(".separator")?.classList.add("visible");
      container.querySelector<HTMLDivElement>(".right-container")?.classList.add("visible");
    });
  });
};
