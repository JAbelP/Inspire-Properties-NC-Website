"use client"
import Proptypes from "prop-types";
import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

const SITE_KEY = "6LdQ0hsnAAAAAA0rG0u7xVU0Z94wy-brqwNsHvzI";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [submit, setSubmit] = useState("REGISTER");
  const [result, setResult] = useState({});

  useEffect(() => {
    setSubmit(() => {
      if (completed) return "RESET";
      if (processing) return "PROCESSING";
      return "REGISTER";
    });
  }, [processing, completed]);

  const handleSubmit = (e) => {
    //
    e.preventDefault();

    if (completed) {
      setCompleted(false);
      setName("");
      setEmail("");
      setResult({});
    } else {
      setProcessing(true);

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then(async (token) => {
            /* send data to the server */

            const body = {
              name,
              email,
              recaptchaResponse: token,
            };

            try {
              const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify(body),
              });
              if (response.ok) {
                const json = await response.json();
                setResult(json);
                setCompleted(true);
              } else {
                throw new Error(response.statusText);
              }
            } catch (error) {
              setResult({ message: error.message });
            }

            /* End of the sending data */
          })
          .catch((error) => {
            setResult({ message: error.message });
          });
        setProcessing(false);
      });
    }
  };

  return (
    <div className="bg-black pt-5 pr-1">


      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
      />
        <h1 className="p-1">reCaptcha v3 with Next.js</h1>
        <p className="text-center">
          This shows how to use reCAPTCHA v3 with Next.js without any libraries.
        </p>

        <form className="text-black" onSubmit={handleSubmit} id="test1" >
          <div >
            <label htmlFor="name">Name</label>
            <input
              className="w-full mb-1 p-5"
              type="text"
              id="name"
              required
              value={name}
              disabled={processing || completed}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="w-full mb-1 p-5"
              type="email"
              id="email"
              required
              value={email}
              disabled={processing || completed}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className="w-full mb-1 p-5 text-white bg-gray-500"
              type="submit"
              form="test1"
              disabled={!name || !email || processing}
            >submit</button>
          </div>
        </form>

        <DisplayResult result={result} />

      <footer>
        <a
          href="https://github.com/kokou2kpadenou/recaptcha3-nextjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </footer>
    </div>
  );
}

const DisplayResult = ({ result }) => (
  <>
    {result && Object.keys(result).length > 0 && result.constructor === Object && (
      <div
        className="border-dashed bg-transparent border-4"
        style={{
          backgroundColor: result.success
            ? "rgba(0, 0, 255, 0.1)"
            : "rgba(255, 0, 0, 0.1)",
          borderColor: result.success ? "#00f" : "#f00",
        }}
      >
        <div className="text-center mb-2">{`Registration ${
          result.success ? "successfull" : "failed"
        }`}</div>
        <strong>Output:</strong>
        <br />
        <pre>{JSON.stringify(result, undefined, 2)}</pre>
      </div>
    )}
  </>
);

DisplayResult.propTypes = {
  result: Proptypes.shape({}).isRequired,
};