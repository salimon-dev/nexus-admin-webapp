import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Space } from "antd";
import { IInvitation, invitationStatus } from "../../specs";
import { useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateInvitation } from "../../Rest/Invitations";
import dayjs from "dayjs";
import { useState } from "react";

interface IProps {
  record: IInvitation;
  trigger: (open: () => void) => JSX.Element;
}
export default function EditInvitationModal({ record, trigger }: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {trigger(() => setOpen(true))}
      <EditDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        record={record}
      />
    </>
  );
}

interface IEditDialogProps {
  record: IInvitation;
  open: boolean;
  onClose: () => void;
}
export function EditDialog({ record, onClose, open }: IEditDialogProps) {
  const queryClient = useQueryClient();
  const formik = useFormik({
    validationSchema: yup.object({
      code: yup.string().optional().max(16),
      usage_remaining: yup.number().min(0).max(100000).required(),
      expires_at: yup.date().required(),
      status: yup.number().required(),
    }),
    initialValues: {
      code: record.code,
      usage_remaining: record.usage_remaining,
      expires_at: new Date(record.expires_at),
      status: record.status,
    },
    onSubmit: async (values) => {
      const expires_at = new Date(values.expires_at).toISOString();
      const response = await updateInvitation(record.id, { ...values, expires_at });
      if (response.status === 200) {
        queryClient.refetchQueries("invitations");
        onClose();
      }
    },
  });

  return (
    <Modal
      title="Edit invitation"
      open={open}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item
              label="Code"
              name="code"
              validateStatus={formik.errors.code && formik.touched.code ? "error" : ""}
              help={
                formik.errors.code && formik.touched.code
                  ? formik.errors.code
                  : "code must be unique string so new users can register with it"
              }
              initialValue={formik.values.code}
            >
              <Input value={formik.values.code} onChange={formik.handleChange} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Usage"
              name="usage_remaining"
              validateStatus={formik.errors.usage_remaining && formik.touched.usage_remaining ? "error" : ""}
              help={
                formik.errors.usage_remaining && formik.touched.usage_remaining
                  ? formik.errors.usage_remaining
                  : ""
              }
              initialValue={formik.values.usage_remaining}
            >
              <Input
                type="number"
                min={1}
                max={32}
                value={formik.values.usage_remaining}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Status"
              name="status"
              validateStatus={formik.errors.status && formik.touched.status ? "error" : ""}
              help={formik.errors.status && formik.touched.status ? formik.errors.status : ""}
              initialValue={formik.values.status}
            >
              <Select
                onChange={(value) => {
                  formik.setFieldValue("status", parseInt(value));
                }}
                onBlur={formik.handleBlur}
                options={Object.keys(invitationStatus).map((key) => ({
                  value: parseInt(key),
                  label: invitationStatus[parseInt(key)],
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Expires at"
              name="expires_at"
              validateStatus={formik.errors.expires_at && formik.touched.expires_at ? "error" : ""}
              help={
                formik.errors.expires_at && formik.touched.expires_at ? formik.errors.expires_at + "" : ""
              }
              initialValue={dayjs(formik.values.expires_at)}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={dayjs(formik.values.expires_at)}
                onChange={(date) => {
                  formik.setFieldValue("expires_at", date.toDate());
                }}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={formik.isSubmitting}>
                Update
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
