import { useAtomValue } from "jotai";
import { profileAtom } from "../Providers/Store";
import { Col, Form, Input, Modal, Row } from "antd";

// TODO: there is a use case for this dialog. I have to figure it out
interface IProps {
  show: boolean;
  onClose: () => void;
}
export default function ProfileDialog({ show, onClose }: IProps) {
  const profile = useAtomValue(profileAtom);
  if (!profile) return;
  return (
    <Modal open={show} onCancel={onClose} onClose={onClose} title="Profile" footer={null}>
      <Form layout="vertical">
        <Row>
          <Col xs={24}>
            <Form.Item name="username" label="Username:" initialValue={profile.username}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="password" label="Password:">
              <Input.Password disabled />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="password" label="Password:">
              <Input.Password disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
