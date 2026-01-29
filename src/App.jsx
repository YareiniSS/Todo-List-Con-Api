import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="*"
          element={
            <div
              className="min-h-screen flex items-center justify-center"
              style={{ backgroundColor: "#DEEFE7" }}
            >
              <div className="text-center">
                <h1
                  className="text-4xl font-bold mb-4"
                  style={{ color: "#002333" }}
                >
                  404
                </h1>
                <p className="text-xl" style={{ color: "#159A9C" }}>
                  Página no encontrada
                </p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
