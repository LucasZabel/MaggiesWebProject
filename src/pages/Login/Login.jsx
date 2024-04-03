import "./Login.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const user = {
            email,
            password
        }

        const res = await login(user)
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        };
    }, [authError]);

    return (
        <div className="formulary">
            <h2>Login</h2>
            <p>Faça o login para utilizar o sistema</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span><br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email do usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </label>
                <label>
                    <span>Senha:</span><br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                {!loading && (
                    <div className="btn">
                        <input className="btn" value="Login" type="submit" />
                    </div>
                )}
                {loading && (
                    <div className="btn">
                        <input className="btn" value="Aguarde..." disabled />
                    </div>
                )}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Login;