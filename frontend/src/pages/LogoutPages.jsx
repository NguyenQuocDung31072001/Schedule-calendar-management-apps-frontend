import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/account_slice";

export default function LogoutPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(logout());
    navigate("auth/login");
  }, []);
  return <div>test</div>;
}
