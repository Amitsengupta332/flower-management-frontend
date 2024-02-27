import { Button, Row } from "antd";
import FMForm from "../components/form/FMForm";
import FMInput from "../components/form/FMInput";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/");
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <FMForm onSubmit={handleLogin}>
          <FMInput type="text" name="email" label="email" />
          <FMInput type="password" name="password" label="password" />
          <Button htmlType="submit">Login</Button>
          <Link to="/register">create new account</Link>
        </FMForm>
      </Row>
    </div>
  );
};

export default Login;
