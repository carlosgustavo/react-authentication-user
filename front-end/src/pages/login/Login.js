import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { history } from "../../history";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
const Login = () => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const handleSubmit = (values) => {
    //console.log(values);
    axios.post("http://localhost:8080/v1/api/auth", values).then((resp) => {
      const { data } = resp;
      if (data) {
        localStorage.setItem("app-token", data);
        history.push("/");
      }
    });
  };

  const validations = yup.object().shape({
    email: yup
      .string()
      .email(" Email Invalido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("Este campo é obrigatório"),
  });
  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    async function loadProducts() {
      setLoadingProducts(true);
      await delay(2000);
      setLoadingProducts(false);
    }
    loadProducts();
  }, []);
  const loadCSS = css`
    margin: 150px 0 0 180px;
  `;
  /*  if (loadingProducts === true) {
    return <ClipLoader size={80} color="#0b3783" css={loadCSS} />;
  } */

  return loadingProducts ? (
    <ClipLoader size={80} color="#0b3783" css={loadCSS} />
  ) : (
    <div className="man">
      <h1>Login</h1>
      <p>Preencha os campos</p>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Login">
          <div className="Login-Group">
            <Field name="email" className="Login-Field" placeholder="Email" />
            <ErrorMessage
              component="span"
              name="email"
              className="Login-Error"
            />
          </div>
          <div className="Login-Group">
            <Field
              name="password"
              className="Login-Field"
              placeholder="Senha"
            />
            <ErrorMessage
              component="span"
              name="password"
              className="Login-Error"
            />
          </div>
          <div className="two-button">
            <button className="Login-Btn" type="submit">
              Entrar
            </button>
            <Link to="/register">
              <button className="Register-Btn" type="submit">
                Criar Conta
              </button>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
