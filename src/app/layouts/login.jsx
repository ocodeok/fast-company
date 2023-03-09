import React, { useEffect, useState } from "react";

import TextField from "../components/textField";

import validator from "../utils/validator";

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

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    const isValid = Object.keys(error).length;

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);

        return !Object.keys(errors).length;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Логин</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email:"
                            type="text"
                            name="email"
                            value={data.email}
                            error={error.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password:"
                            type="password"
                            name="password"
                            value={data.password}
                            error={error.password}
                            onChange={handleChange}
                        />
                        <button
                            className="tn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={isValid}
                        >
                            Send data
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
