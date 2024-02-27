import { Button, Row } from "antd";
import FMForm from "../components/form/FMForm";
import FMInput from "../components/form/FMInput";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

const Register = () => {
  const [register] = useRegisterMutation();
  const handleRegister = async (data: FieldValues) => {
    const toastId = toast.loading("Register... ");
    console.log(data);
    try {
      const userInfo = {
        userName: data.username,
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      toast.success("Register User", { id: toastId, duration: 2000 });
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <FMForm onSubmit={handleRegister}>
        <FMInput type="text" name="username" label="Username" />
        <FMInput type="text" name="email" label="email" />
        <FMInput type="password" name="password" label="password" />
        <Button htmlType="submit">Register</Button>
        <Link to="/login">Already have an account? Login</Link>
      </FMForm>
    </Row>
  );
};

export default Register;
