import React from 'react';
import { Link, FooterHelp } from '@shopify/polaris';

export default function Account() {
  return (
    <FooterHelp>
      Learn more about{' '}
      <Link external url="https://jublet.com/">
        selling on Jublet Marketplace
      </Link>{' '}
      {`at the Jublet's Help Center.`}
    </FooterHelp>
  );
}
