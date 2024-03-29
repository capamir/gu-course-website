import { Form } from "../../components";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../../types/Auth";

const VerifyCode = () => {
  const navigate = useNavigate();
  const onSubmit = (data: LoginResponse) => {
    console.log(data);
    navigate("/");
  };
  return <Form formClass={"code"} onSubmit={onSubmit} />;
};

export default VerifyCode;
