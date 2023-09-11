import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <main>
        <h1>Hello RRR World !</h1>
      </main>
    </AuthProvider>
  );
};

export { App };
