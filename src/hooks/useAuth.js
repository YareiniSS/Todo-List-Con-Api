import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  return {
    logout,
    isAuthenticated,
  };
};
