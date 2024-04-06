import { Form } from "../../components";
import { useLoginUser } from "../../hooks/useAuth";
import { LoginResponse } from "../../types/Auth";

const Login = () => {
  const { mutate, error } = useLoginUser();
  const onSubmit = (data: LoginResponse) => {
    mutate(data);
  };
  return <Form formClass={"signIn"} onSubmit={onSubmit} mutateError={error} />;
};

export default Login;
