import { LoginForm } from './login-form';
import './login.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>RAVIX Academy</h1>
        <p>Ingrese la contraseña para acceder al dashboard</p>
        <LoginForm />
      </div>
    </div>
  );
}
