import { Typography } from "antd";
import LoadingIcon from "../../assets/LoadingIcon";
import Styles from "./styles.module.css";

interface IProps {
  status?: string;
}

export default function Splash({ status = "connecting" }: IProps) {
  return (
    <div className={Styles.container}>
      <LoadingIcon />
      <Typography.Text>{status}</Typography.Text>
    </div>
  );
}
