import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import Icon from "../assets/Icon";
import * as yup from "yup";
import { useFormik } from "formik";
import { login } from "../Rest/Auth";
import { useState } from "react";
import { setStorage } from "../Providers/Store";
const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function Auth() {
  const [unauthorized, setUnauthorized] = useState(false);
  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setUnauthorized(false);
      const result = await login(values);
      switch (result.status) {
        case 200:
          setStorage(result.data);
          return;
        case 401:
          setUnauthorized(true);
          return;
      }
    },
  });
  return (
    <Row style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Col xs={22} md={12} lg={8}>
        <Row>
          <Col xs={24} style={{ textAlign: "center" }}>
            <Icon style={{ stroke: "#444", height: 160, width: 160 }} />
          </Col>
          <Col xs={24} style={{ textAlign: "center", marginBottom: 24 }}>
            <Typography.Title level={3}>Nexus Admin Panel</Typography.Title>
          </Col>
          <Col xs={24}>
            <Card title="Login">
              <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Row>
                  <Col xs={24}>
                    <Form.Item
                      name="username"
                      label="Username:"
                      validateStatus={formik.errors.username && formik.touched.username ? "error" : ""}
                      help={formik.errors.username && formik.touched.username ? formik.errors.username : ""}
                    >
                      <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="password"
                      label="Password:"
                      validateStatus={formik.errors.password && formik.touched.password ? "error" : ""}
                      help={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                    >
                      <Input.Password
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ minWidth: 80 }}
                      loading={formik.isSubmitting}
                    >
                      Login
                    </Button>
                  </Col>
                  {unauthorized && (
                    <Col xs={24}>
                      <Typography.Text type="danger">username or password is wrong</Typography.Text>
                    </Col>
                  )}
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
