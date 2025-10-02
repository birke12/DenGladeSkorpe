// hooks/useAuth.js
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

// Helper til at tjekke om token er udløbet
function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false; // ingen expiry i token = treat as valid
    return decoded.exp * 1000 < Date.now(); // exp er i sekunder
  } catch {
    return true; // ugyldigt token
  }
}

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Kun token gemmes i localStorage
  const [auth, setAuth] = useLocalStorage("auth", {});

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setError(""); // nulstil fejl

    try {
      const response = await fetch("http://localhost:3042/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (!response.ok || !result.data?.token) {
        throw new Error(result.message || "Login fejlede, token mangler.");
      }

      // gem token
      setAuth({ token: result.data.token });

      // decode token til at finde rolle
      const decodedUser = jwtDecode(result.data.token);

      // redirect efter rolle
      if (decodedUser.role === "admin") {
        navigate("/backoffice");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.message || "Noget gik galt. Prøv igen.");
    }
  };

  const signOut = () => {
    setAuth({});
    navigate("/login");
  };

  // Afledte værdier
  const token = auth.token || "";
  const signedIn = token && !isTokenExpired(token);
  const user = signedIn ? jwtDecode(token) : null;
  const role = user?.role || null;

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    signIn,
    signOut,
    token,
    signedIn,
    user,
    role,
  };
};

export default useAuth;
