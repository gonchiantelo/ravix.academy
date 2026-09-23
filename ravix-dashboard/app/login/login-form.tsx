'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';

const initialState = {
  message: '',
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="login-form">
      <input 
        type="password" 
        name="password" 
        placeholder="Contraseña" 
        required 
        autoFocus
      />
      {state?.message && <p className="error-message">{state.message}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
