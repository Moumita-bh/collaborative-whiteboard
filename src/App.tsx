import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import Whiteboard from './components/Whiteboard';
import ImageClassifier from './components/ImageClassifier';

const App: React.FC = () => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const kc = new Keycloak({
      url: 'http://localhost:8080/auth',
      realm: 'your-realm',
      clientId: 'your-client-id',
    });

    kc.init({ onLoad: 'login-required' }).then((auth) => {
      setKeycloak(kc);
      setAuthenticated(auth);
    });
  }, []);

  if (!keycloak) {
    return <div>Initializing Keycloak...</div>;
  }

  if (!authenticated) {
    return <div>Authenticating...</div>;
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">🧑‍🤝‍🧑 Collaborative Whiteboard</h1>
      <Whiteboard />
      <ImageClassifier />
    </div>
  );
};

export default App;
