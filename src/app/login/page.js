export default function Login() {
    return (
      <div className="login-container">
        <h1>Iniciar Sesión</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    );
  }
  