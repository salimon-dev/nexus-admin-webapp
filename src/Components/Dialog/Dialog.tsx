import { Modal } from "antd";

interface IProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}
export default function Dialog({ title, open, onClose, children }: IProps) {
  return (
    <Modal open={open} title={title} onCancel={onClose} onClose={onClose}>
      {open ? children : undefined}
    </Modal>
  );
}
