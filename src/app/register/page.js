export default function Register() {
    return (
      <div className="register-container">
        <h1>Registrarse</h1>
        <form>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    );
  }
  