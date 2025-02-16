import { Button, Card, Col, Form, Input, Row } from "antd";

export default function Auth() {
  return (
    <Row style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Col xs={22} md={12} lg={8}>
        <Card title="Login">
          <Form layout="vertical">
            <Row>
              <Col xs={24}>
                <Form.Item name="username" label="Username:">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="password" label="Password:">
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24} style={{ textAlign: "right" }}>
                <Button type="primary" style={{ minWidth: 80 }}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
