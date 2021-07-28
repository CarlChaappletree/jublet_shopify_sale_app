import React, { useCallback, useContext } from 'react';
import { Layout, SettingToggle } from '@shopify/polaris';
import { ReactContextStore } from '../../../context/ReactContext';
const AccountConnection = () => {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;

  const handleAction = useCallback(() => {
    // shopConnectedStore.setShopConnectedState((connected) => !connected);
  }, []);

  const disabledDetail = (
    <>
      Your connection is <strong>disabled</strong>. your products and collections are not published to{' '}
      <strong>Jublet</strong>. To display your products, please click the connect button.
    </>
  );

  const enabledDetail = (
    <>
      Your connection is <strong>enabled</strong>. your products and collections are <strong>published</strong> to{' '}
      <strong>Jublet</strong>.
    </>
  );

  const buttonText = shopStore.connected ? 'Disconnect' : 'Connect';
  const storeConnectionDetail = shopStore.connected ? enabledDetail : disabledDetail;
  return (
    <Layout.AnnotatedSection
      title="Jublet connection"
      description="This enable and disable to syncs with Jublet sales channel."
    >
      <SettingToggle
        action={{
          content: buttonText,
          onAction: handleAction,
        }}
        enabled={shopStore.connected}
      >
        <p variation="strong">{storeConnectionDetail}</p>
      </SettingToggle>
    </Layout.AnnotatedSection>
  );
};

export default AccountConnection;
