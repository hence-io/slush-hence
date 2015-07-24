'use strict';

import <%= compNameCamel %> from './<%= compName %>';

<%= compNameCamel %>.appendElementTo({
  query : {
    id: 1
  }
});
<%= compNameCamel %>.appendElementTo({
  query : {
    id: 2
  }
});

export * from './<%= compName %>';
