type RouteItem = {
   title: string;
   route: string;
};

type Routes = {
   [key: string]: RouteItem;
};

export const routes: Routes = {
   introduction: {
      title: "Introduction",
      route: "/docs/Introduction",
   },
   installation: {
      title: "Installation",
      route: "/docs/Installation",
   },
   calendar: {
      title: "calendar",
      route: "/docs/calendar",
   },
   persianCalendar: {
      title: "Persian Calendar",
      route: "/docs/persianCalendar",
   },
};
