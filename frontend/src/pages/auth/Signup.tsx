import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../../types/Auth";
import { Form } from "../../components";

const Signup = () => {
  const navigate = useNavigate();
  const onSubmit = (data: LoginResponse) => {
    console.log(data);
    navigate("/");
  };
  return <Form formClass={"signUp"} onSubmit={onSubmit} />;
};

export default Signup;
