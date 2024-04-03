import "./Register.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from "react";

const Register = () => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const user = {
            displayName,
            email,
            password
        };

        if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais!");
            return
        };

        const res = await createUser(user);
        console.log(res)
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        };
    }, [authError]);


    return (
        <div className="formulary">
            <h2>Cadastre-se:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span><br />
                    <input
                        type="text"
                        name="displayName"
                        placeholder="Nome do usuário"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </label>
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
                <label>
                    <span>Confirmação de Senha:</span><br />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirme a sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                </label>
                {!loading && (
                    <div className="btn">
                        <input className="btn" value="Cadastrar" type="submit" />
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
    );
};

export default Register;