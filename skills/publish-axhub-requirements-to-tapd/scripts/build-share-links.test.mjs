import assert from 'node:assert/strict';
import test from 'node:test';

import { buildShareLinks } from './build-share-links.mjs';

test('builds Axhub prototype and document preview share URLs', () => {
  const links = buildShareLinks({
    runtimeOrigin: 'https://runtime.example.com/',
    adminOrigin: 'https://admin.example.com/',
    projectId: 'example-project',
    prototypeId: 'example-dashboard',
    prdPath: '示例模块/示例需求-PRD.md',
  });

  assert.equal(
    links.prototypeUrl,
    'https://runtime.example.com/prototypes/example-dashboard',
  );
  assert.equal(
    links.prdUrl,
    'https://admin.example.com/docs/%E7%A4%BA%E4%BE%8B%E6%A8%A1%E5%9D%97/%E7%A4%BA%E4%BE%8B%E9%9C%80%E6%B1%82-PRD?projectId=example-project',
  );
});
