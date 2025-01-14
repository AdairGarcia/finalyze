import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <nav className="navbar navbar-light bg-light w-100">
        <div className="container">
          <button
            className="btn btn-primary me-2"
            onClick={handleNavigate("/signin")}
          >
            Login
          </button>
          <button
            className="btn btn-success"
            onClick={handleNavigate("/signup")}
          >
            Register
          </button>
        </div>
      </nav>

      <div
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          background: "linear-gradient(to top, #1e3c72, #2a5298, #ffffff)",
          minHeight: "80vh",
          color: "#ffffff",
          textShadow: "1px 1px 5px rgba(0,0,0,0.5)", 
        }}>
        <h1 className="display-1 fw-bold">Finalyze</h1>
        <p className="lead">Analyze your financial transactions with ease.</p>
        <div class="text-center">
            <img src="Assets\png-clipart-financial-financial-financial-figures-removebg-preview.png" className="rounded" height="75%" alt="Financial Analysis"/>
        </div>
      </div>

      <footer className="container-fluid bg-dark text-light text-center p-3">
        <p>
          <a
            href="https://github.com/AdairGarcia/finalyze.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            GitHub Repository
          </a>
        </p>
      </footer>

    </div>
  );
};
