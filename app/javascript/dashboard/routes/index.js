import VueRouter from 'vue-router';

import { frontendURL } from '../helper/URLHelper';
import dashboard from './dashboard/dashboard.routes';
import store from '../store';
import { validateLoggedInRoutes } from '../helper/routeHelpers';
import AnalyticsHelper from '../helper/AnalyticsHelper';
import { buildPermissionsFromRouter } from '../helper/permissionsHelper';

// Import the new landing page component
import NewLandingPage from '../components/pages/NewLandingPage.vue';

// Add routes, including the new landing page as the default root page
const routes = [
  {
    path: '/', // New landing page route
    name: 'new_landing_page',
    component: NewLandingPage,
  },
  ...dashboard.routes, // Other dashboard-related routes
];

export const router = new VueRouter({
  mode: 'history',
  routes,
});

// Build permissions for routes
export const routesWithPermissions = buildPermissionsFromRouter(routes);

// Helper to validate and manage route permissions
export const validateAuthenticateRoutePermission = (to, next, { getters }) => {
  const { isLoggedIn, getCurrentUser: user } = getters;

  // Redirect to login if user is not logged in
  if (!isLoggedIn) {
    window.location = '/app/login';
    return '/app/login';
  }

  // Handle routes without a name
  if (!to.name) {
    return next(frontendURL(`accounts/${user.account_id}/dashboard`));
  }

  // Validate if the user has access to the intended route
  const nextRoute = validateLoggedInRoutes(to, getters.getCurrentUser);
  return nextRoute ? next(frontendURL(nextRoute)) : next();
};

// Initialize the router with analytics and authentication validation
export const initializeRouter = () => {
  const userAuthentication = store.dispatch('setUser');

  router.beforeEach((to, from, next) => {
    // Log page view to analytics
    AnalyticsHelper.page(to.name || '', {
      path: to.path,
      name: to.name,
    });

    // Ensure the user is authenticated and authorized for the route
    userAuthentication.then(() => {
      return validateAuthenticateRoutePermission(to, next, store);
    });
  });
};

export default router;
