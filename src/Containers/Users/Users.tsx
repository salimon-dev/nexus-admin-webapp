import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { dateToString, userRoleToString, userStatusToString } from "../../helpers";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import CreateEntityModal from "./CreateUserModal";
import { searchUsers } from "../../Rest/Users";

const pageSize = 10;

export default function Users() {
  const [isCreating, setIsCreating] = useState(false);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["users", page], async () => {
    const response = await searchUsers({ page, page_size: pageSize });
    return response.data;
  });

  function dataSource() {
    if (isLoading) return [];
    if (!data) return [];
    return data.data.map((item, index) => {
      const num = index + 1 + (page - 1) * pageSize;
      return {
        key: item.id,
        num,
        username: item.username,
        credit: item.credit,
        balance: item.balance,
        status: userStatusToString(item.status),
        role: userRoleToString(item.role),
        registered_at: dateToString(item.registered_at),
        updated_at: dateToString(item.updated_at),
        actions: (
          <Space>
            <EditUserModal
              record={item}
              trigger={(open) => (
                <Tooltip title="edit">
                  <Button shape="circle" type="text" onClick={open}>
                    <EditOutlined />
                  </Button>
                </Tooltip>
              )}
            />
            <DeleteUserModal
              record={item}
              trigger={(open) => (
                <Tooltip title="delete">
                  <Button shape="circle" type="text" onClick={open}>
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              )}
            />
          </Space>
        ),
      };
    });
  }
  function total() {
    if (isLoading) return 0;
    if (!data) return 0;
    return data.total;
  }
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
          title="Users"
          extra={
            <Space>
              <Button
                variant="filled"
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
              <Table
                pagination={{
                  current: page,
                  pageSize,
                  total: total(),
                  onChange: (value) => setPage(value),
                }}
                dataSource={dataSource()}
                columns={[
                  { title: "#", dataIndex: "num", width: 64, key: "num" },
                  { title: "Username", dataIndex: "username", key: "username" },
                  { title: "Role", dataIndex: "role", key: "role" },
                  { title: "Status", dataIndex: "status", key: "status" },
                  { title: "Credit", dataIndex: "credit", key: "credit" },
                  { title: "Balance", dataIndex: "balance", key: "balance" },
                  { title: "Registered", dataIndex: "registered_at", key: "registered_at" },
                  { title: "Updated", dataIndex: "updated_at", key: "updated_at" },
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
