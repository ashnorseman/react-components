/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

const srcContext = require.context('../src', true, /\.jsx?$/);
srcContext.keys().filter((key) => {
  return !(/(app|modules)\.jsx$/.test(key));
}).forEach(srcContext);

const testsContext = require.context('./', true, /\.jsx?$/);
testsContext.keys().forEach(testsContext);