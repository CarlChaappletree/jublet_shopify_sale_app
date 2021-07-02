import React, { useState, useCallback, useContext } from 'react';
import { Button, Modal } from '@shopify/polaris';
import ApplicationForm from './ApplicationForm';
import ApplicationInfo from './ApplicationInfo';
import ApplicationPolicy from './ApplicationPolicy';
import { ReactContextStore } from '../../context/ReactContext';

const ApplicationModal = () => {
  const [active, setActive] = useState(false);
  const ReactContext = useContext(ReactContextStore);
  const { applicationViewStore } = ReactContext;

  const toggleActive = useCallback(() => {
    setActive((active) => !active);
  }, []);

  const NOTIFICATION_STATES = {
    SET_INTRO_VIEW: <ApplicationInfo />,
    SET_FORM_VIEW: <ApplicationForm />,
    SET_POLICY_VIEW: <ApplicationPolicy modalClose={toggleActive} />,
  };

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
      <Modal.Section>{NOTIFICATION_STATES[applicationViewStore.applicationViewState]}</Modal.Section>
    </Modal>
  );
};

export default ApplicationModal;
