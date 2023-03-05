import React, { useEffect, useState } from "react";

import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        console.log("data is send");
    };

    const validate = () => {
        const errors = {};

        for (const fieldName in data) {
            if (data[fieldName].trim() === "") {
                errors[
                    fieldName
                ] = `Поле ${fieldName} обязательно для заполнения`;
            }
        }

        setErrors(errors);

        return !Object.keys(errors).length;
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Email:"
                        type="text"
                        name="email"
                        value={data.login}
                        error={error.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Password:"
                        type="password"
                        name="password"
                        value={data.password}
                        error={error.password}
                        onChange={handleChange}
                    />
                </div>

                <button>Send data</button>
            </form>
        </>
    );
};

export default Login;
