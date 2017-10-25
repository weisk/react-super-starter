import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import FirstPage from './index';

it('renders without crashing', () => {
  shallowWithIntl(<FirstPage />);
})

