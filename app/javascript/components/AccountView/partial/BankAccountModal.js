import React, { useState, useCallback } from 'react';
import { Button, Modal, TextContainer } from '@shopify/polaris';

const BankAccountModal = () => {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Add account</Button>;

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              Use Instagram posts to share your products with millions of people. Let shoppers buy from your store
              without leaving Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default BankAccountModal;
