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
      title: "Calendars",
      route: "/docs/Calendars",
   },
   datepicker: {
      title: "Date Picker",
      route: "/docs/DatePicker",
   },
   persianCalendar: {
      title: "Persian Calendar",
      route: "/docs/PersianCalendar",
   },
};
