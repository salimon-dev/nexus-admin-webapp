import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select, Space, Table } from "antd";
import { useState } from "react";
import CreateInvitationModal from "./CreateInvitationModal";

export default function Invitations() {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <Row>
      <CreateInvitationModal
        open={isCreating}
        onClose={() => {
          setIsCreating(false);
        }}
      />
      <Col xs={24}>
        <Card
          title="Invitations"
          extra={
            <Space>
              <Button
                shape="circle"
                onClick={() => {
                  setIsCreating(true);
                }}
              >
                <PlusOutlined />
              </Button>
            </Space>
          }
        >
          <Row>
            <Col xs={24}>
              <Form layout="vertical">
                <Row gutter={[12, 12]}>
                  <Col xs={24} md={12} lg={6}>
                    <Form.Item name="status" label="status">
                      <Select
                        defaultValue="0"
                        options={[
                          { label: "all", value: "0" },
                          { label: "active", value: "1" },
                          { label: "inactive", value: "2" },
                          { label: "pending", value: "3" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={6}>
                    <Form.Item name="role" label="role">
                      <Select
                        defaultValue="0"
                        options={[
                          { label: "all", value: "0" },
                          { label: "keymaker", value: "1" },
                          { label: "admin", value: "2" },
                          { label: "developer", value: "3" },
                          { label: "member", value: "4" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs={24}>
              <Table
                columns={[
                  { title: "#", dataIndex: "num", width: 64 },
                  { title: "invitationname", dataIndex: "invitationname" },
                  { title: "role", dataIndex: "role" },
                  { title: "status", dataIndex: "status" },
                  { title: "credit", dataIndex: "credit" },
                  { title: "usage", dataIndex: "usage" },
                  { title: "fame", dataIndex: "fame" },
                  { title: "registered at", dataIndex: "registered_at" },
                  { title: "", dataIndex: "actions" },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
