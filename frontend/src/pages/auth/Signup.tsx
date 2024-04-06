import { Form } from "../../components";
import { useRegisterUser } from "../../hooks/useAuth";
import { LoginResponse } from "../../types/Auth";

const Signup = () => {
  const { mutate, error } = useRegisterUser();
  const onSubmit = (data: LoginResponse) => {
    mutate(data);
  };
  return <Form formClass={"signUp"} onSubmit={onSubmit} mutateError={error} />;
};

export default Signup;
