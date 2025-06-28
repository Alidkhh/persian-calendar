type RouteItem = {
   title: string;
   route: string;
};

type Routes = {
   [key: string]: RouteItem;
};

export const routes: Routes = {
   calendar: {
      title: "calendar",
      route: "/calendar",
   },
};
