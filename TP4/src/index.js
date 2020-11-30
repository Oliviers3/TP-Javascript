import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles.css";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => (props.isValid && "cornflowerblue") || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

function validateEmail(value) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    return false;
  }
  return "Une adresse email est obligatoire";
}

function validateName(name) {
  if (!name) {
    return "Un nom est obligatoire";
  }
}

function NameField({ name, setName }) {
  const message = validateName(name);
  return (
    <>
      <Input
        value={name}
        type="text"
        onChange={(event) => setName(event.target.value)}
        isValid={!message || message.length === 0}
      />{" "}
      {message ? <em>{message}</em> : null}
    </>
  );
}

function EmailField({ email, setEmail }) {
  const message = validateEmail(email);
  return (
    <>
      <Input
        value={email}
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        isValid={!message || message.length === 0}
      />{" "}
      {message ? <em>{message}</em> : null}
    </>
  );
}

function Inscription() {
  const [isSubmit, setSubmit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canSubmit = !validateEmail(email) && !validateName(name);

  function submit() {
    setSubmit(true);
  }

  return (
    <>
      <div>
        <label>
          Nom: <NameField name={name} setName={setName} />
        </label>
      </div>
      <div>
        <label>
          Courriel : <EmailField email={email} setEmail={setEmail} />
        </label>
      </div>

      <div>
        <button disabled={!canSubmit} onClick={() => submit()}>
          Créer un compte
        </button>
      </div>

      <div>
        <em>
          {isSubmit
            ? `Votre nom est ${name} et votre courriel : ${email}`
            : null}
        </em>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Inscription />, rootElement);
