import React, {useState} from 'react';
import {View} from 'react-native';
import {MessageOverlay} from '../../components/MessageOverlay';
import {Button, Column, Row, Text} from '../../components/ui';
import {Modal} from '../../components/ui/Modal';
import {Theme} from '../../components/ui/styleUtils';
import {SvgImage} from '../../components/ui/svg';
import {useBackupScreen} from './BackupController';

//TODO: Make this component adaptable to all screen size
export const BackupConfirmation: React.FC<BackupConfirmationProps> = props => {
  const [dataBackup, setDataBackup] = useState(false);

  const controller = useBackupScreen(props);

  return (
    <React.Fragment>
      {/* //TODO: Remove modal and make it screen as per mockup */}
      <Modal isVisible={props.isVisible} showClose={false}>
        <Column style={{flex: 1, justifyContent: 'space-around'}}>
          <View style={{alignItems: 'center', paddingTop: 30}}>
            {SvgImage.DataBackupIcon(80, 100)}
          </View>

          <Column>
            <Text
              size="large"
              style={{
                fontWeight: 'bold',
                paddingHorizontal: 20,
                textAlign: 'center',
              }}>
              You’re just a few steps away from backing up your data
            </Text>
            <Text
              size="regular"
              color={Theme.Colors.GrayText}
              style={{
                paddingHorizontal: 20,
                textAlign: 'center',
                paddingVertical: 15,
              }}>
              To initiate the data backup, please tap on the “Proceed” button to
              link your Google Drive with Inji.
            </Text>
          </Column>

          <Row style={{paddingHorizontal: 120, paddingBottom: 50}}>
            <View>{SvgImage.GoogleDriveIcon(45, 45)}</View>
            <Text
              style={{
                fontWeight: 'medium',
                paddingHorizontal: 10,
                textAlign: 'center',
                paddingTop: 15,
                fontFamily: 'inter',
              }}>
              Google Drive
            </Text>
          </Row>

          <Column>
            <Button
              type="gradient"
              title={'Proceed'}
              onPress={props.onConfirmation}
              margin={[0, 0, 0, 0]}
            />
            <Button type="clear" title={'Go Back'} onPress={() => {}} />
          </Column>
        </Column>
      </Modal>

      <MessageOverlay
        isVisible={controller.isBackingUpSuccess}
        onButtonPress={() => {
          controller.OK(), setDataBackup(false);
        }}
        buttonText="OK"
        title={'Backup Successful'}
      />
      <MessageOverlay
        isVisible={controller.isBackingUpFailure}
        onButtonPress={() => {
          controller.OK(), setDataBackup(false);
        }}
        buttonText="OK"
        title={'Backup Failed'}
      />
    </React.Fragment>
  );
};

interface BackupConfirmationProps {
  isVisible: boolean;
  onDismiss: () => void;
}
