import assert from 'node:assert/strict';
import test from 'node:test';

import { buildShareLinks } from './build-share-links.mjs';

test('builds Axhub prototype and document preview share URLs', () => {
  const links = buildShareLinks({
    runtimeOrigin: 'http://121.40.110.77:51720/',
    adminOrigin: 'http://121.40.110.77:53817/',
    projectId: 'shangguan-shop-domain-kongjian',
    prototypeId: 'merchant-workbench-dashboard',
    prdPath: '五维交叉分析矩阵看板/五维交叉矩阵佣金策略监控看板-PRD.md',
  });

  assert.equal(
    links.prototypeUrl,
    'http://121.40.110.77:51720/prototypes/merchant-workbench-dashboard',
  );
  assert.equal(
    links.prdUrl,
    'http://121.40.110.77:53817/docs/%E4%BA%94%E7%BB%B4%E4%BA%A4%E5%8F%89%E5%88%86%E6%9E%90%E7%9F%A9%E9%98%B5%E7%9C%8B%E6%9D%BF/%E4%BA%94%E7%BB%B4%E4%BA%A4%E5%8F%89%E7%9F%A9%E9%98%B5%E4%BD%A3%E9%87%91%E7%AD%96%E7%95%A5%E7%9B%91%E6%8E%A7%E7%9C%8B%E6%9D%BF-PRD?projectId=shangguan-shop-domain-kongjian',
  );
});
