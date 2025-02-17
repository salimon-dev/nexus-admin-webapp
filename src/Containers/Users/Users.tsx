import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select, Space, Table } from "antd";
import { useState } from "react";
import CreateUserModal from "./CreateUserModal";
import { useQuery } from "react-query";
import { searchUsers } from "../../Rest/Users";
import { dateToString, userRoleToString, userStatusToString } from "../../helpers";

const pageSize = 10;
export default function Users() {
  const [isCreating, setIsCreating] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["users", page], async () => {
    const response = await searchUsers({ page, page_size: 10 });
    console.log(response.data);
    return response.data;
  });
  console.log(data);

  function dataSource() {
    if (isLoading) return [];
    if (!data) return [];
    return data.data.map((item, i) => {
      const num = i + 1 + (page - 1) * pageSize;
      return {
        num,
        username: item.username,
        role: userRoleToString(item.role),
        status: userStatusToString(item.status),
        credit: item.credit,
        balance: item.balance,
        registered_at: dateToString(item.registered_at),
        actions: (
          <Space>
            <Button shape="circle" type="text" icon={<EditOutlined />} />
            <Button shape="circle" type="text" icon={<DeleteOutlined />} />
          </Space>
        ),
      };
    });
  }
  return (
    <Row>
      <CreateUserModal
        open={isCreating}
        onClose={() => {
          setIsCreating(false);
        }}
      />
      <Col xs={24}>
        <Card
          title="Users"
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
                dataSource={dataSource()}
                pagination={{
                  current: page,
                  pageSize: 10,
                  onChange: (value) => setPage(value),
                  total: data?.total,
                }}
                columns={[
                  { title: "#", dataIndex: "num", width: 64 },
                  { title: "username", dataIndex: "username", key: "username" },
                  { title: "role", dataIndex: "role", key: "role" },
                  { title: "status", dataIndex: "status", key: "status" },
                  { title: "credit", dataIndex: "credit", key: "credit" },
                  { title: "balance", dataIndex: "balance", key: "balance" },
                  { title: "registered at", dataIndex: "registered_at", key: "registered_at" },
                  { title: "", dataIndex: "actions", key: "actions" },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
