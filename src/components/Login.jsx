import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Intentando iniciar sesión con el correo y contraseña
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      // Si ocurre un error, se muestra el mensaje de error
      if (error) {
        console.log("Error de inicio de sesión:", error); // Loguea el error completo
        setError("Error en el inicio de sesión. Verifica tus credenciales.");
      } else {
        // Si todo está bien, navega a la página de acceso
        navigate("/acces-code");
      }
    } catch (err) {
      setLoading(false);
      console.log("Error inesperado:", err); // Loguea cualquier error inesperado
      setError("Hubo un problema al intentar iniciar sesión.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Iniciar sesión</h1>
      <div style={styles.card}>
        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div>
            <label style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Verificando..." : "Iniciar sesión"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.link}>
          ¿No tienes una cuenta?{" "}
          <span
            style={{ color: "#00c2ff", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#004aad",
    minHeight: "100vh",
    padding: "2rem",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "white",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    color: "#004aad",
    width: "100%",
    maxWidth: "400px",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "0.5rem",
    color: "#004aad",
  },
  input: {
    padding: "0.75rem",
    width: "100%",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#00c2ff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
  },
  error: {
    color: "red",
    marginTop: "1rem",
    textAlign: "center",
  },
  link: {
    marginTop: "1rem",
    textAlign: "center",
    color: "black",
  },
};

export default Login;
