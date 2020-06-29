/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import scopes from '../ReactLiveScope';
import styles from './styles.module.css';
import loadable from '@loadable/component';
import Wrapper from '../ReactLiveScope/Wrapper';
// import MockData from '../MockData';

export default {
  code: props => {
    const { children } = props;
    const scope = { ...React, ...scopes };
    if (typeof children === 'string') {
      if (!children.includes('\n')) {
        return <code {...props} />;
      }
      return <CodeBlock {...props} scope={scope} />;
    }
    return children;
  },
  a: props => {
    if (/\.[^./]+$/.test(props.href)) {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...props} />;
    }
    return <Link {...props} />;
  },
  pre: props => <div className={styles.mdxCodeBlock} {...props} />,
  h1: Wrapper,
  h2: Heading('h2'),
  h3: Heading('h3'),
  h4: Heading('h4'),
  h5: Heading('h5'),
  h6: Heading('h6'),
};
