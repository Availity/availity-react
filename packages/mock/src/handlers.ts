/* eslint-disable import/prefer-default-export */
import { rest, graphql, compose, context } from 'msw';
import { parse } from 'qs';

import * as routes from './routes';
import axiPermissions from './data/axi-user-permissions.json';
import codes from './data/codes.json';
import custom from './data/custom.json';
import customGraphql from './data/custom-graphql.json';
import features from './data/features.json';
import navigationSpaces from './data/navigation-spaces.json';
import organizations from './data/organizations.json';
import pagination from './data/pagination.json';
import patients from './data/patients.json';
import permissions from './data/permissions.json';
import providers from './data/providers.json';
import region from './data/region.json';
import regions from './data/regions.json';
import settings from './data/settings.json';
import maxFavorites from '../../favorites/tests/maxFavorites.json';
import spaces from './data/spaces.json';
import user from './data/user.json';
import users from './data/users.json';

function delay(duration: number) {
  // Ensure there is no response delay in tests.
  if (typeof global.process !== 'undefined') {
    return compose(context.delay(0));
  }

  return compose(context.delay(duration));
}

const defaultDelay = 500; // .5 sec

export const handlers = [
  // User
  rest.get(routes.USER, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(user))),
  rest.post(routes.USERS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(users))),

  // Logging
  rest.post(routes.LOG, (req, res, ctx) => res(delay(defaultDelay), ctx.status(201))),
  rest.post(routes.LOG_A2, (req, res, ctx) => res(delay(defaultDelay), ctx.status(201))),

  // Region
  rest.get(routes.REGIONS, (req, res, ctx) => {
    // Check if the request wants one region or a list
    const { currentlySelected } = parse(req.url.search, { ignoreQueryPrefix: true });

    return res(delay(defaultDelay), ctx.status(200), ctx.json(currentlySelected === 'true' ? region : regions));
  }),
  rest.post(routes.REGIONS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(regions))),

  // AXI Permissions
  rest.get(routes.AXI_PERMISSIONS, (req, res, ctx) => {
    const params = parse(req.url.search, { ignoreQueryPrefix: true });
    const permissionIds = Array.isArray(params.permissionId) ? params.permissionId : [params.permissionId];
    // Only include permissions that were requested
    const response = {
      axiUserPermissions:
        !params.region || params.region === 'FL'
          ? axiPermissions.axiUserPermissions.filter(({ id }) => permissionIds.includes(id))
          : [],
    };

    // return permissions based on the request
    return res(delay(defaultDelay), ctx.status(200), ctx.json(response));
  }),

  // Permissions
  rest.get(routes.PERMISSIONS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(permissions))),
  rest.post(routes.PERMISSIONS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(permissions))),

  // Settings
  // rest.get(routes.SETTINGS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(settings))),
  rest.get(routes.SETTINGS, (req, res, ctx) =>
    res(delay(defaultDelay), ctx.status(200), ctx.json({ settings: [{ favorites: maxFavorites }] }))
  ),
  rest.put(routes.SETTINGS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(req.body))),

  // Feature
  rest.get('/features.json', (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(features))),

  // Organization
  rest.get(routes.ORGANIZATIONS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(organizations))),
  rest.post(routes.ORGANIZATIONS, (req, res, ctx) =>
    res(delay(defaultDelay), ctx.status(200), ctx.json(organizations))
  ),

  // Providers
  rest.get(routes.PROVIDERS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(providers))),
  rest.post(routes.PROVIDERS, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(providers))),

  // Codes
  rest.post(routes.CODES, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(codes))),

  // Navigation
  rest.post(routes.NAVIGATION, (req, res, ctx) =>
    res(delay(defaultDelay), ctx.status(200), ctx.json(navigationSpaces))
  ),

  // Spaces
  graphql.query('patientPagination', (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.data(patients))),
  graphql.query('configurationFindMany', (req, res, ctx) =>
    res(delay(defaultDelay), ctx.status(200), ctx.data(spaces))
  ),
  graphql.query('configurationFindById', (req, res, ctx) =>
    res(delay(defaultDelay), ctx.status(200), ctx.data(spaces))
  ),

  // Custom
  rest.post(routes.CUSTOM, (req, res, ctx) => res(delay(defaultDelay), ctx.status(200), ctx.json(custom))),
  graphql.query('customPagination', (req, res, ctx) =>
    res(delay(defaultDelay), ctx.status(200), ctx.data(customGraphql))
  ),

  // Pagination example
  rest.post(routes.PAGINATION, (req, res, ctx) => {
    const parsed = parse(req.body as string);

    const limit = Number(parsed.limit);
    const offset = Number(parsed.offset);

    const items = pagination.slice(offset, offset + limit);
    const response = { totalCount: pagination.length, count: items.length, offset, limit, items };

    return res(delay(defaultDelay), ctx.status(200), ctx.json(response));
  }),
];
