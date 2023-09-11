import { AuthProvider } from "./AuthContext";
import { Login } from "./pages/Login";

const App = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};

export { App };
