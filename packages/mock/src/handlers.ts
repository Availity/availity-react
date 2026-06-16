import { http, HttpResponse, graphql, delay } from 'msw';
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
import extendedPayers from './data/extended-payers.json';
import permissions from './data/permissions.json';
import providers from './data/providers.json';
import region from './data/region.json';
import regions from './data/regions.json';
import settings from './data/settings.json';
import spaces from './data/spaces.json';
import user from './data/user.json';
import users from './data/users.json';

// 'real' uses actual delay in browser, resolves instantly in Node (tests)
const defaultDelay = 'real' as const;

const requestHeaders = new Map<string, Headers>();

export const handlers = [
  // User
  http.get(routes.USER, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(user);
  }),
  http.get(routes.USER_A2, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(user);
  }),
  http.post(routes.USERS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(users);
  }),

  // Logging
  http.post(routes.LOG, async () => {
    await delay(defaultDelay);
    return new HttpResponse(null, { status: 201 });
  }),
  http.post(routes.LOG_A2, async () => {
    await delay(defaultDelay);
    return new HttpResponse(null, { status: 201 });
  }),

  // Region
  http.get(routes.REGIONS, async ({ request }) => {
    await delay(defaultDelay);
    const url = new URL(request.url);
    const { currentlySelected } = parse(url.search, { ignoreQueryPrefix: true });
    return HttpResponse.json(currentlySelected === 'true' ? region : regions);
  }),
  http.post(routes.REGIONS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(regions);
  }),

  // AXI Permissions
  http.get(routes.AXI_PERMISSIONS, async ({ request }) => {
    await delay(defaultDelay);
    const url = new URL(request.url);
    const params = parse(url.search, { ignoreQueryPrefix: true });
    const permissionIds = Array.isArray(params.permissionId) ? params.permissionId : [params.permissionId];
    const response = {
      axiUserPermissions:
        !params.region || params.region === 'FL'
          ? axiPermissions.axiUserPermissions.filter(({ id }) => permissionIds.includes(id))
          : [],
    };
    return HttpResponse.json(response);
  }),

  // User Permissions (Aries 2 endpoint)
  http.get(routes.USER_PERMISSIONS, async ({ request }) => {
    await delay(defaultDelay);
    const url = new URL(request.url);
    const params = parse(url.search, { ignoreQueryPrefix: true });
    const permissionIds = Array.isArray(params.permissionId) ? params.permissionId : [params.permissionId];
    const response = {
      axiUserPermissions:
        !params.region || params.region === 'FL'
          ? axiPermissions.axiUserPermissions.filter(({ id }) => permissionIds.includes(id))
          : [],
    };
    return HttpResponse.json(response);
  }),

  // Permissions
  http.get(routes.PERMISSIONS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(permissions);
  }),
  http.post(routes.PERMISSIONS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(permissions);
  }),

  // Settings
  http.get(routes.SETTINGS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(settings);
  }),
  http.put(routes.SETTINGS, async ({ request }) => {
    await delay(defaultDelay);
    const body = await request.json();
    return HttpResponse.json(body);
  }),

  // Feature
  http.get('/features.json', async () => {
    await delay(defaultDelay);
    return HttpResponse.json(features);
  }),

  // Organization
  http.get(routes.ORGANIZATIONS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(organizations);
  }),
  http.post(routes.ORGANIZATIONS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(organizations);
  }),

  // ExtendedPayers
  http.get(routes.EXTENDEDPAYERS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(extendedPayers);
  }),

  // Providers
  http.get(routes.PROVIDERS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(providers);
  }),
  http.post(routes.PROVIDERS, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(providers);
  }),

  // Codes
  http.post(routes.CODES, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(codes);
  }),

  // Navigation
  http.post(routes.NAVIGATION, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(navigationSpaces);
  }),

  // Spaces
  http.post(routes.WEB, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(spaces);
  }),
  graphql.query('patientPagination', async () => {
    await delay(defaultDelay);
    return HttpResponse.json({ data: patients });
  }),
  graphql.query('configurationFindMany', async () => {
    await delay(defaultDelay);
    return HttpResponse.json({ data: spaces });
  }),
  graphql.query('configurationPagination', async () => {
    await delay(defaultDelay);
    return HttpResponse.json({ data: spaces });
  }),
  graphql.query('configurationFindById', async () => {
    await delay(defaultDelay);
    return HttpResponse.json({ data: spaces });
  }),

  // Custom
  http.post(routes.CUSTOM, async () => {
    await delay(defaultDelay);
    return HttpResponse.json(custom);
  }),
  graphql.query('customPagination', async () => {
    await delay(defaultDelay);
    return HttpResponse.json({ data: customGraphql });
  }),

  // Pagination example
  http.post(routes.PAGINATION, async ({ request }) => {
    await delay(defaultDelay);
    const body = await request.text();
    const parsed = parse(body);
    const limit = Number(parsed.limit);
    const offset = Number(parsed.offset);
    const items = pagination.slice(offset, offset + limit);
    const response = { totalCount: pagination.length, count: items.length, offset, limit, items };
    return HttpResponse.json(response);
  }),

  // Attachments Cloud
  http.post(routes.ATTACHMENTS_CLOUD_POST, async ({ request }) => {
    await delay(defaultDelay);
    const id = crypto.randomUUID();
    requestHeaders.set(id, request.headers);
    return new HttpResponse(null, {
      status: 201,
      headers: {
        'cache-control': 'no-store',
        'transfer-encoding': 'chunked',
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        location: id,
      },
    });
  }),

  http.patch(routes.ATTACHMENTS_CLOUD_PATCH, async ({ request, params }) => {
    await delay(defaultDelay);
    let reqOffset = Number(request.headers.get('upload-offset'));
    reqOffset = Number.isNaN(reqOffset) ? 0 : reqOffset;

    let fileSize = Number(requestHeaders.get(params.location as string)?.get('upload-length'));
    fileSize = Number.isNaN(fileSize) ? 0 : fileSize;

    const offset = reqOffset === 0 ? `${fileSize / 2}` : `${fileSize}`;

    return new HttpResponse(null, {
      status: 204,
      headers: {
        'cache-control': 'no-store',
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        'upload-offset': offset,
      },
    });
  }),

  http.head(routes.ATTACHMENTS_CLOUD_HEAD, async ({ params }) => {
    await delay(defaultDelay);
    const headers = requestHeaders.get(params.location as string);
    const fileSize = headers?.get('upload-length') || '0';
    const metadata = headers?.get('upload-metadata') || '';

    return new HttpResponse(null, {
      status: 200,
      headers: {
        'av-scan-bytes': fileSize,
        'av-scan-result': 'accepted',
        'cache-control': 'no-store',
        references: `["approved/${params.bucketId}/${params.location}"]`,
        's3-references': `["s3://path-to-vault/approved/${params.bucketId}/${params.location}"]`,
        'transfer-encoding': 'chunked',
        'tus-resumable': '1.0.0',
        'upload-length': fileSize,
        'upload-metadata': metadata,
        'upload-offset': fileSize,
        'upload-result': 'accepted',
      },
    });
  }),

  // Attachments
  http.post(routes.ATTACHMENTS_POST, async ({ request }) => {
    await delay(defaultDelay);
    const id = crypto.randomUUID();
    requestHeaders.set(id, request.headers);
    return new HttpResponse(null, {
      status: 201,
      headers: {
        'cache-control': 'no-store',
        'transfer-encoding': 'chunked',
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        location: id,
      },
    });
  }),

  http.patch(routes.ATTACHMENTS_PATCH, async ({ request, params }) => {
    await delay(defaultDelay);
    let reqOffset = Number(request.headers.get('upload-offset'));
    reqOffset = Number.isNaN(reqOffset) ? 0 : reqOffset;

    let fileSize = Number(requestHeaders.get(params.location as string)?.get('upload-length'));
    fileSize = Number.isNaN(fileSize) ? 0 : fileSize;

    const offset = reqOffset === 0 ? `${fileSize / 2}` : `${fileSize}`;

    return new HttpResponse(null, {
      status: 204,
      headers: {
        'cache-control': 'no-store',
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        'upload-offset': offset,
      },
    });
  }),

  http.head(routes.ATTACHMENTS_HEAD, async ({ params }) => {
    await delay(defaultDelay);
    const headers = requestHeaders.get(params.location as string);
    const fileSize = headers?.get('upload-length') || '0';
    const metadata = headers?.get('upload-metadata') || '';

    return new HttpResponse(null, {
      status: 200,
      headers: {
        'av-scan-bytes': fileSize,
        'av-scan-result': 'accepted',
        'cache-control': 'no-store',
        references: `["approved/${params.bucketId}/${params.location}"]`,
        's3-references': `["s3://path-to-vault/approved/${params.bucketId}/${params.location}"]`,
        'transfer-encoding': 'chunked',
        'tus-resumable': '1.0.0',
        'upload-length': fileSize,
        'upload-metadata': metadata,
        'upload-offset': fileSize,
        'upload-result': 'accepted',
      },
    });
  }),

  // Stash
  http.get(routes.STASH, async ({ params }) => {
    await delay(defaultDelay);
    return HttpResponse.json({ id: params.sessionId, key: 'value', nested: { foo: 'bar' } });
  }),

  // File Upload Delivery
  http.post(routes.FILE_UPLOAD_DELIVERY, async () => {
    await delay(defaultDelay);
    return HttpResponse.json({ id: 'ABC123', status: 'COMPLETE' });
  }),
];
