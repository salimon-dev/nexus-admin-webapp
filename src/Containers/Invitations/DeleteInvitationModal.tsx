import { Button, Col, Modal, Row, Space, Typography } from "antd";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function DeleteInvitationModal(props: IProps) {
  return (
    <Modal title="Delete" open={props.open} onCancel={props.onClose} footer={null}>
      <Row gutter={[12, 0]}>
        <Col xs={24}>
          <Typography.Text>Are you sure you want to delete this invitation?</Typography.Text>
        </Col>
        <Col xs={24} style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button type="primary" color="danger" htmlType="submit">
              Delete
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
}
