import { Button, Col, Modal, Row, Space, Typography } from "antd";
import { useState } from "react";
import { IUser } from "../../specs";
import { useQueryClient } from "react-query";
import { deleteUser } from "../../Rest/Users";

interface IProps {
  record: IUser;
  trigger: (open: () => void) => JSX.Element;
}
export default function DeleteEntityModal({ record, trigger }: IProps) {
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();
  async function submit() {
    if (!record) return;
    try {
      setSubmitting(true);
      await deleteUser(record.id);
      queryClient.refetchQueries("users");
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      {trigger(() => {
        setOpen(true);
      })}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        title="Delete"
        destroyOnClose
      >
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Typography.Text>Are you sure you want to delete this user?</Typography.Text>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button variant="filled" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="filled" color="danger" htmlType="submit" loading={submitting} onClick={submit}>
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
