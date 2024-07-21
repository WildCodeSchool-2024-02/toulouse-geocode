import { useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import "./Form.scss";
import "./Connect.scss";
import "../style/button.scss";
import "../style/input.scss";
import { Toaster } from "react-hot-toast";
import logo from "../../public/logo.svg";
import LoginButton from "../components/LoginButton";

function Connect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state ? location.state.email : "");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const requestBody = { email, password };

  return (
    <div className="contact-form-div">
      <Form method="post" onSubmit={handleSubmit}>
        <img className="logo-css" src={logo} alt="Logo du site WEB" />

        <h1>Se connecter</h1>
        <section className="email">
          <label htmlFor="email">Adresse email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Entrer votre Adresse email"
            className="input-sm-gray-outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>
        <section className="password">
          <label htmlFor="password">Mot de passe </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Entrer votre mot de passe"
            className="input-sm-gray-outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <section>
          <LoginButton requestBody={requestBody} />
        </section>
      </Form>
      <button
        type="button"
        onClick={() => navigate("/register")}
        className="button-md-olive-outlined"
      >
        S'inscrire
      </button>
      <Toaster />
    </div>
  );
}

export default Connect;

// import {
//   Form,
//   redirect,
//   useActionData,
//   useLoaderData,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import "./Form.scss";
// import "./Connect.scss";
// import "../style/button.scss";
// import "../style/input.scss";
// import toast, { Toaster } from "react-hot-toast";
// import logo from "../../public/logo.svg";
// import useAuth from "../utils/useAuth";

// const hostUrl = import.meta.env.VITE_API_URL;

// function Connect() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const requestBody = Object.fromEntries(formData);

//     try {
//       const response = await fetch(`${hostUrl}/api/user/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//         credentials: "include",
//       });

//       const user = await response.json();
//       login(user);

//       if (!response.ok) {
//         toast.error("Oops. Une erreur s'est produite", {
//           duration: 4000,
//           position: "bottom-right",
//         });

//         return null;
//       }
//       toast.success("Connexion réussie", {
//         duration: 4000,
//         position: "bottom-right",
//       });

//       return redirect("/map");
//     } catch (e) {
//       console.error(e.message);
//       return { error: true };
//     }
//   };

//   return (
//     <div className="contact-form-div">
//       <Form method="post" onSubmit={handleLogin}>
//         <img className="logo-css" src={logo} alt="Logo du site WEB" />

//         <h1>Se connecter</h1>
//         <section className="email">
//           <label htmlFor="email">Adresse email</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="Entrer votre Adresse email"
//             className="input-sm-gray-outlined"
//             defaultValue={location.state ? location.state.email : ""}
//             required
//           />
//         </section>
//         <section className="password">
//           <label htmlFor="password">Mot de passe </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             placeholder="Entrer votre mot de passe"
//             className="input-sm-gray-outlined"
//             required
//           />
//         </section>
//         <section>
//           <button type="submit" className="button-lg-olive-fullfilled">
//             Se connecter
//           </button>
//         </section>
//       </Form>
//       <button
//         type="button"
//         onClick={() => navigate("/register")}
//         className="button-md-olive-outlined"
//       >
//         S'inscrire
//       </button>
//       <Toaster />
//     </div>
//   );
// }

// export default Connect;
