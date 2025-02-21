import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { searchEntities } from "../../Rest/Entities";
import { dateToString, entityPermissionToString, entityStatusToString } from "../../helpers";
import DeleteEntityModal from "./DeleteEntityModal";
import EditEntityModal from "./EditEntityModal";
import CreateEntityModal from "./CreateEntityModal";

const pageSize = 10;

export default function Entities() {
  const [isCreating, setIsCreating] = useState(false);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["entities", page], async () => {
    const response = await searchEntities({ page, page_size: pageSize });
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
        name: item.name,
        credit: item.credit,
        status: entityStatusToString(item.status),
        permission: entityPermissionToString(item.permission),
        created_at: dateToString(item.created_at),
        updated_at: dateToString(item.updated_at),
        actions: (
          <Space>
            <EditEntityModal
              record={item}
              trigger={(open) => (
                <Tooltip title="edit">
                  <Button shape="circle" type="text" onClick={open}>
                    <EditOutlined />
                  </Button>
                </Tooltip>
              )}
            />
            <DeleteEntityModal
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
          title="Entities"
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
                  { title: "Name", dataIndex: "name", key: "name" },
                  { title: "Credit", dataIndex: "credit", key: "credit" },
                  { title: "Status", dataIndex: "status", key: "status" },
                  { title: "Permission", dataIndex: "permission", key: "permission" },
                  { title: "Host", dataIndex: "base_url", key: "base_url" },
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
