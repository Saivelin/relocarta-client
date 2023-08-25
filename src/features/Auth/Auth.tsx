import { FC } from 'react';
import { useOpenCloseToggle } from '../../hooks/useOpenCloseToggle';
import { LoginForm } from './Login/LoginForm';
import { RecoveryPasswordForm } from './Recovery/RecoveryPasswordForm';
import { RegistrationForm } from './Registration/RegistrationForm';
import { VerificationCodeFrom } from './Recovery/VerificationCodeFrom';
import { ResetPasswordForm } from './Recovery/ResetPasswordForm';

type Props = {
  onClose: () => void;
};

export const Auth: FC<Props> = ({ onClose }: Props) => {
  const [isLogin, openLogin, closeLogin] = useOpenCloseToggle(true);
  const [isRecovery, openRecovery, closeRecovery] = useOpenCloseToggle(false);
  const [isVerification, openVerification, closeVerification] = useOpenCloseToggle(false);
  const [isReset, openReset, closeReset] = useOpenCloseToggle(false);
  const [isRegister, openRegister, closeRegister] = useOpenCloseToggle(false);

  return (
    <div>
      {isLogin && (
        <LoginForm
          onClose={() => {
            closeLogin();
            onClose();
          }}
          toRegistration={() => {
            closeLogin();
            openRegister();
          }}
          toRecovery={() => {
            closeLogin();
            openRecovery();
          }}
        />
      )}
      {isRecovery && (
        <RecoveryPasswordForm
          onClose={() => {
            closeRecovery();
            onClose();
          }}
          toVerification={() => {
            closeRecovery();
            openVerification();
          }}
        />
      )}
      {isVerification && (
        <VerificationCodeFrom
          onClose={() => {
            closeVerification();
            onClose();
          }}
          toReset={() => {
            closeVerification();
            openReset();
          }}
        />
      )}
      {isReset && (
        <ResetPasswordForm
          onClose={() => {
            closeReset();
            onClose();
          }}
          toLogin={() => {
            closeReset();
            openLogin();
          }}
        />
      )}
      {isRegister && (
        <RegistrationForm
          onClose={() => {
            closeRegister();
            onClose();
          }}
          toLogin={() => {
            closeRegister();
            openLogin();
          }}
        />
      )}
    </div>
  );
};
