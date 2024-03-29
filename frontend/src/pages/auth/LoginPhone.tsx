import { Form } from "../../components";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../../types/Auth";

const LoginPhone = () => {
  const navigate = useNavigate();
  const onSubmit = (data: LoginResponse) => {
    console.log(data);
    navigate("/");
  };
  return <Form formClass={"signInPhone"} onSubmit={onSubmit} />;
};

export default LoginPhone;
