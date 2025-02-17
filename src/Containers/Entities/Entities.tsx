import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select, Space, Table } from "antd";
import { useState } from "react";
import CreateEntityModal from "./CreateEntityModal";
import { useQuery } from "react-query";
import { searchEntities } from "../../Rest/Entities";

export default function Entities() {
  const [isCreating, setIsCreating] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["entites", page], async () => {
    const response = await searchEntities({ page, page_size: 10 });
    return response.data;
  });
  return (
    <Row>
      <CreateEntityModal
        open={isCreating}
        onClose={() => {
          setIsCreating(false);
        }}
      />
      <Col xs={24}>
        <Card
          title="Entities"
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
                loading={isLoading}
                pagination={{
                  pageSize: 10,
                  current: page,
                  onChange: (value) => setPage(value),
                  total: data?.total,
                }}
                dataSource={data?.data}
                columns={[
                  { title: "#", dataIndex: "num", width: 64 },
                  { title: "entityname", dataIndex: "entityname" },
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
