import { pathToFileURL } from 'node:url';

function required(value, name) {
  const normalized = String(value ?? '').trim();
  if (!normalized) throw new Error(`${name} is required`);
  return normalized;
}

function normalizeOrigin(value, name) {
  const url = new URL(required(value, name));
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${name} must use http or https`);
  }
  return url.origin;
}

function encodeResourcePath(value) {
  const normalized = required(value, 'prdPath')
    .replaceAll('\\', '/')
    .replace(/^\/+|\/+$/g, '')
    .replace(/^src\/resources\//i, '')
    .replace(/\.md$/i, '');

  return normalized.split('/').map(encodeURIComponent).join('/');
}

export function buildShareLinks(options) {
  const runtimeOrigin = normalizeOrigin(options.runtimeOrigin, 'runtimeOrigin');
  const adminOrigin = normalizeOrigin(options.adminOrigin, 'adminOrigin');
  const projectId = required(options.projectId, 'projectId');
  const prototypeId = required(options.prototypeId, 'prototypeId');
  const prototypePath = encodeURIComponent(prototypeId);
  const documentPath = encodeResourcePath(options.prdPath);

  return {
    prototypeUrl: `${runtimeOrigin}/prototypes/${prototypePath}`,
    prdUrl: `${adminOrigin}/docs/${documentPath}?projectId=${encodeURIComponent(projectId)}`,
  };
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith('--') || value === undefined) {
      throw new Error('Arguments must use --key value pairs');
    }
    const camelKey = key
      .slice(2)
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    options[camelKey] = value;
  }
  return options;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(JSON.stringify(buildShareLinks(parseArgs(process.argv.slice(2))), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
