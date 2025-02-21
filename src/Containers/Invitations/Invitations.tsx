import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Tooltip, Typography } from "antd";
import { useState } from "react";
import CreateInvitationModal from "./CreateInvitationModal";
import { useQuery } from "react-query";
import { searchInvitations } from "../../Rest/Invitations";
import { dateToString, invitationStatusToString } from "../../helpers";
import DeleteInvitationModal from "./DeleteInvitationModal";
import EditInvitationModal from "./EditInvitationModal";

const pageSize = 10;

export default function Invitations() {
  const [isCreating, setIsCreating] = useState(false);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["invitations", page], async () => {
    const response = await searchInvitations({ page, page_size: pageSize });
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
        code: <Typography.Text copyable>{item.code}</Typography.Text>,
        usage_remaining: item.usage_remaining,
        status: invitationStatusToString(item.status),
        owner: item.username,
        expires_at: dateToString(item.expires_at),
        created_at: dateToString(item.created_at),
        updated_at: dateToString(item.updated_at),
        actions: (
          <Space>
            <EditInvitationModal
              record={item}
              trigger={(open) => (
                <Tooltip title="edit">
                  <Button shape="circle" type="text" onClick={open}>
                    <EditOutlined />
                  </Button>
                </Tooltip>
              )}
            />
            <DeleteInvitationModal
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
                  { title: "Code", dataIndex: "code", key: "code" },
                  { title: "Charges", dataIndex: "usage_remaining", key: "usage_remaining" },
                  { title: "Status", dataIndex: "status", key: "status" },
                  { title: "Owner", dataIndex: "owner", key: "owner" },
                  { title: "Expires", dataIndex: "expires_at", key: "expires_at" },
                  { title: "Created", dataIndex: "created_at", key: "created_at" },
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
