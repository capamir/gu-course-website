import { Form } from "../../components";
import { useVerifyrUser } from "../../hooks/useAuth";
import { useAuthStore } from "../../store";
import { VerifyDataType } from "../../types/Auth";

const VerifyCode = () => {
  const phone = useAuthStore((s) => s.phone_number);
  const { mutate } = useVerifyrUser();
  const onSubmit = (data: VerifyDataType) => {
    mutate({ ...data, phone });
  };
  return <Form formClass={"code"} onSubmit={onSubmit} />;
};

export default VerifyCode;
