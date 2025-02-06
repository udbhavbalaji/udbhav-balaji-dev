
# Steps to add a new API app

## 1. Define the API endpoints within ```@/app/api/<app-path>```.

## 2. Open ```config.ts```
- Add the app to the ```registeredApps```. This lets TS know that we are registering a new api app. This ensures type safety during app configuration.
- Within the ```config.configs``` object, define the app configuration. This includes:
1. Define the base url for the app. Map this to the app name in ```appUrlMapping```. 
2. Import your middleware function and register it as the middleware function for the app. For now, this needs to take in a ```NextRequest``` and return  ```Headers```.
3. Register the routes that are allowed for this app under ```registeredRoutes```.
4. Register the routes that require input validation under ```routesWithInputValidation```.
5. Register the routes that require authentication protection under ```routesWithAuthProtection```.
6. Register the routes that allow expired tokens under ```routesWithExpiredTokensAllowed```. Our app currently supports JWTs. Specify any routes that you want to exclude from strict JWT validation.
7. Register the input validation schemas for the routes that require input validation under ```inputValidationSchemaMapping```. Input validation is done with Zod

## 3. Open ```middleware.ts```

Within the middleware function, a conditional block can be introduced to handle the requests made to your new app. The conditional block should check if the requested route is registered/permitted for the app (defined previously in ```config.ts```).

### NOTE: Need to test if this works for routes handled by trpc as well. Surface-level inspections show that it should work .
