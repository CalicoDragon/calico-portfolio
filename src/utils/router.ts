import { templateMain } from "../pages/main";

const routes: { path: string; template: any }[] = [
  { path: "/calico-portfolio/", template: templateMain },
];

let currentRoute: string | null = null;

export const initRouter = (): void => {
  const container = document.querySelector("#app");
  if (!container) return;

  navigate(window.location.pathname);

  // browser back/foward history
  window.addEventListener("popstate", () => {
    navigate(window.location.pathname);
  });

  // Navigation [data-link] buttons
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.matches("[data-link]")) {
      event.preventDefault();
      const link = target.getAttribute("href");
      if (link !== currentRoute) history.pushState(null, "", link);
      navigate(link || window.location.pathname);
    }
  });
};

export const navigate = (path: string): void => {
  const route = routes.find((route) => route.path === path);
  const container = document.querySelector("#app");

  if (currentRoute === path || !route || !container) return;

  currentRoute = route.path;
  container.innerHTML = "";
  route.template(container);
};
