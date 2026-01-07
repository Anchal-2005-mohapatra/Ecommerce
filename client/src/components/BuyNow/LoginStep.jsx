import axiosInstance from "../../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginStep = ({ onNext }) => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const handleLogin = async () => {
    if(!userId){
     toast.error("Please login to  continue");
     await navigate('/login');
      return;
    }
    // await login(); 
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Login</h2>

      <button
        className="bg-orange-500 text-white px-6 py-2 rounded"
        onClick={handleLogin}
      >
        Login to Continue
      </button>
    </div>
  );
};

export default LoginStep;
