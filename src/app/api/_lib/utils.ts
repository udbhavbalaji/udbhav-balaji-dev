import { RegisteredApp, UBDevAPIConfig } from "@/types";

export const getAllRegisteredRoutes = (globalConfig: UBDevAPIConfig) => {
  const routes: string[] = [];
  const mapping = globalConfig.appUrlMapping;

  Object.keys(mapping).forEach((baseUrl) => {
    const appName = mapping[baseUrl] as RegisteredApp;
    const config = globalConfig.configs[appName];

    if (Array.isArray(config.registeredRoutes)) {
      config.registeredRoutes.forEach((route) => {
        routes.push(`${baseUrl}${route}`);
      });
    } else {
      routes.push(`${baseUrl}/${config.registeredRoutes}`);
    }

    // config.registeredRoutes.forEach((route) => {
    //     routes.push(`${baseUrl}${route}`);
    // });
  });

  return routes;
};

export const debug = {
  printHeadersToTerminal: (input: Headers, tag?: string) => {
    const headerObj = Object.fromEntries(input);
    console.log(tag, headerObj);
  },
};
