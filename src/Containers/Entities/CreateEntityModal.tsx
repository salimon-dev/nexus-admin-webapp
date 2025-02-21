import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { createEntity } from "../../Rest/Entities";
import { entityPermission, entityStatus } from "../../specs";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function CreateEntityModal({ open, onClose }: IProps) {
  const queryClient = useQueryClient();
  const formik = useFormik({
    validationSchema: yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
      base_url: yup.string().url().required(),
      credit: yup.number().required(),
      permission: yup.number().required(),
      status: yup.number().required(),
    }),
    initialValues: {
      name: "",
      description: "",
      base_url: "",
      permission: 1,
      credit: 0,
      status: 1,
    },
    onSubmit: async (values) => {
      const response = await createEntity(values);
      if (response.status === 200) {
        queryClient.refetchQueries("entities");
        onClose();
      }
    },
  });
  return (
    <Modal title="Create new entity" open={open} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item
              label="Name"
              name="name"
              validateStatus={formik.errors.name && formik.touched.name ? "error" : ""}
              help={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : "entity name is unique and others in network refer to it"
              }
              initialValue={formik.values.name}
            >
              <Input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Host"
              name="base_url"
              validateStatus={formik.errors.base_url && formik.touched.base_url ? "error" : ""}
              help={formik.errors.base_url && formik.touched.base_url ? formik.errors.base_url : ""}
              initialValue={formik.values.base_url}
            >
              <Input
                value={formik.values.base_url}
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
              label="Description"
              name="description"
              validateStatus={formik.errors.description && formik.touched.description ? "error" : ""}
              help={formik.errors.description && formik.touched.description ? formik.errors.description : ""}
              initialValue={formik.values.description}
            >
              <Input.TextArea
                value={formik.values.description}
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
                options={Object.keys(entityStatus).map((key) => ({
                  value: parseInt(key),
                  label: entityStatus[parseInt(key)],
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Permission"
              name="permission"
              validateStatus={formik.errors.permission && formik.touched.permission ? "error" : ""}
              help={formik.errors.permission && formik.touched.permission ? formik.errors.permission : ""}
              initialValue={formik.values.permission + ""}
            >
              <Select
                onChange={(value) => {
                  formik.setFieldValue("permission", parseInt(value));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.permission + ""}
                options={Object.keys(entityPermission).map((key) => ({
                  value: key,
                  label: entityPermission[parseInt(key)],
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
