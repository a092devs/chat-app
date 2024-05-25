import Chat from '@/components/chat';
import Login from '@/components/login';
import {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

function App() {
    const [user, setUser] = useState(null);
    const [secret, setSecret] = useState(null);
    const isAuth = Boolean(user) && Boolean(secret);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuth ? (
                                <Navigate to="/chat" />
                            ) : (
                                <Login
                                    setUser={setUser}
                                    setSecret={setSecret}
                                />
                            )
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            isAuth ? (
                                <Chat user={user} secret={secret} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
