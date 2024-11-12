import "./Login.css";

const Login = () => {
  return (
    <main className="main__login">
      <h1>Login</h1>
      <section>
        <form
          className="login__form"
          method="post"
          action="/archivo"
        >
          <fieldset className="form__fieldset">
            <legend>
              <h3>Credentials</h3>
            </legend>
            <div className="login__fieldset__field">
              <label
                className="form__label"
                htmlFor="email"
              >
                <h4>Email</h4>
              </label>
              <input
                className="form__input"
                type="text"
                name="Email"
                id="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="login__fieldset__field">
              <label
                className="form__label"
                htmlFor="password"
              >
                <h4>Password</h4>
              </label>
              <input
                className="form__input"
                type="text"
                name="Password"
                id="password"
                placeholder="Your password"
                required
              />
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default Login;
