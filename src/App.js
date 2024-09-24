import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Some from './components/some';
import AppRoutes from './AppRoutes';
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

function App() {
  return (
    <KindeProvider
      clientId="b18d40e7618a4648a8d0e9cf2f4f7ffb"
      domain="https://notionclone.kinde.com"
      redirectUri="https://notion-clone-ch7eye3h0-nileshs-projects-60e7ec4b.vercel.app/some"
      logoutUri="https://notion-clone-ch7eye3h0-nileshs-projects-60e7ec4b.vercel.app/"
    >
      <AppRoutes />
    </KindeProvider>
  );
}

export default App;
