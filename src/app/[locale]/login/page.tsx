import { LoginForm } from 'presentation/login/containers/LoginForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Login'
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
