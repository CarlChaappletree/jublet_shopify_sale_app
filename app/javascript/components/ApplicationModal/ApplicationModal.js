import React, { useState, useCallback } from 'react';
import { Button, Modal } from '@shopify/polaris';
import ApplicationForm from './ApplicationForm';

const ApplicationModal = () => {
  const [active, setActive] = useState(false);

  // modal
  const toggleActive = useCallback(() => {
    setActive((active) => !active);
  }, []);

  return (
    <Modal
      title="Connect account"
      limitHeight={true}
      large
      activator={
        <Button primary onClick={toggleActive}>
          Connect account
        </Button>
      }
      open={active}
      onClose={toggleActive}
    >
      <Modal.Section>
        <ApplicationForm />
      </Modal.Section>
    </Modal>
  );
};

export default ApplicationModal;
