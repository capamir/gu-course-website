import { Form } from "../../components";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../../types/Auth";
import { useLoginUser } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, error } = useLoginUser();
  const onSubmit = (data: LoginResponse) => {
    mutate(data);
    navigate("/");
  };
  return <Form formClass={"signIn"} onSubmit={onSubmit} mutateError={error} />;
};

export default Login;
