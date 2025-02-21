import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { IUser, userRole, userStatus } from "../../specs";
import { useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { updateUser } from "../../Rest/Users";

interface IProps {
  record: IUser;
  trigger: (open: () => void) => JSX.Element;
}
export default function EditEntityModal({ record, trigger }: IProps) {
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
  record: IUser;
  open: boolean;
  onClose: () => void;
}
export function EditDialog({ record, onClose, open }: IEditDialogProps) {
  const queryClient = useQueryClient();
  const formik = useFormik({
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().optional(),
      role: yup.number().required(),
      status: yup.number().required(),
      credit: yup.number().required(),
      balance: yup.number().required(),
    }),
    initialValues: {
      username: record.username,
      password: "",
      role: record.role,
      status: record.status,
      credit: record.credit,
      balance: record.balance,
    },
    onSubmit: async (values) => {
      const response = await updateUser(record.id, {
        ...values,
        password: values.password ? values.password : undefined,
      });
      if (response.status === 200) {
        queryClient.refetchQueries("users");
        onClose();
      }
    },
  });

  return (
    <Modal title="Edit user" open={open} onClose={onClose} onCancel={onClose} footer={null} destroyOnClose>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item
              label="Username"
              name="username"
              validateStatus={formik.errors.username && formik.touched.username ? "error" : ""}
              help={formik.errors.username && formik.touched.username ? formik.errors.username : ""}
              initialValue={formik.values.username}
            >
              <Input
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Password"
              name="password"
              validateStatus={formik.errors.password && formik.touched.password ? "error" : ""}
              help={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
              initialValue={formik.values.password}
            >
              <Input.Password
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Credit"
              name="credit"
              validateStatus={formik.errors.credit && formik.touched.credit ? "error" : ""}
              help={formik.errors.credit && formik.touched.credit ? formik.errors.credit : ""}
              initialValue={formik.values.credit}
            >
              <Input type="number" value={formik.values.credit} onChange={formik.handleChange} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Balance"
              name="balance"
              validateStatus={formik.errors.balance && formik.touched.balance ? "error" : ""}
              help={formik.errors.balance && formik.touched.balance ? formik.errors.balance : ""}
              initialValue={formik.values.balance}
            >
              <Input type="number" value={formik.values.balance} onChange={formik.handleChange} />
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
                options={Object.keys(userStatus).map((key) => ({
                  value: parseInt(key),
                  label: userStatus[parseInt(key)],
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Role"
              name="role"
              validateStatus={formik.errors.role && formik.touched.role ? "error" : ""}
              help={formik.errors.role && formik.touched.role ? formik.errors.role : ""}
              initialValue={formik.values.role}
            >
              <Select
                onChange={(value) => {
                  formik.setFieldValue("role", parseInt(value));
                }}
                onBlur={formik.handleBlur}
                options={Object.keys(userRole).map((key) => ({
                  value: parseInt(key),
                  label: userRole[parseInt(key)],
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="filled" htmlType="submit">
                Update
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
