import React, { useState, useEffect } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { history } from "../../history";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import "../login/Login.css";

const Register = () => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const handleSubmit = (values) => {
    axios.post("http://localhost:8080/v1/api/user", values).then((resp) => {
      const { data } = resp;
      if (data) {
        history.push("/login");
      }
    });
  };

  const validations = yup.object().shape({
    firstName: yup.string().required("Este campo é obrigatório"),
    lastName: yup.string().required("Este campo é obrigatório"),
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
      <h1>Registro</h1>
      <p>Preencha os campos para criar um novo usuário</p>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Login">
          <div className="Login-Group">
            <Field
              name="firstName"
              className="Login-Field"
              placeholder="Nome"
            />
            <ErrorMessage
              component="span"
              name="firstName"
              className="Login-Error"
            />
          </div>
          <div className="Login-Group">
            <Field
              name="lastName"
              className="Login-Field"
              placeholder="Sobrenome"
            />
            <ErrorMessage
              component="span"
              name="lastName"
              className="Login-Error"
            />
          </div>
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
          <button className="cadastra" type="submit">
            Cadastra
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
