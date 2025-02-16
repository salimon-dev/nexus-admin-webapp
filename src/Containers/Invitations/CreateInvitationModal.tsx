import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function CreateInvitationModal(props: IProps) {
  return (
    <Modal title="Create new invitation" open={props.open} onCancel={props.onClose} footer={null}>
      <Form layout="vertical">
        <Row gutter={[12, 0]}>
          <Col xs={24}>
            <Form.Item label="Invitationname:" name="invitationname" required>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Password:" name="password" required>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Role:" name="role" required>
              <Select
                defaultValue="4"
                options={[
                  { value: "2", label: "admin" },
                  { value: "3", label: "developer" },
                  { value: "4", label: "member" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Credit:" name="credit" required>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Usage:" name="usage" required>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Fame:" name="fame" required>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={props.onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
