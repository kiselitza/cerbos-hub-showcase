import {
  Text,
  Center,
  Container,
  Loader,
  Paper,
  Table,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ListAction } from "../components/ListActions";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { IExpensePermissions } from "../interfaces/IExpensePermissions";
import { getExpenseEdgeQuery } from "../queries/getExpenseEdgeQuery";

interface Props {}

export const ViewExpensesContainer: React.FC<Props> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [perms, setPerms] = React.useState<IExpensePermissions>({
    canApprove: false,
    canDelete: false,
    canView: false,
    canViewApprover: false,
    canEdit: false,
  });

  // Get Expense
  const { isLoading, error, data, refetch } = getExpenseEdgeQuery({
    id: params.id!,
  });

  // Check permissions
  React.useEffect(() => {
    const fetchPerms = async () => {
      if (!data) return;
      setPerms(data.permissions);
    };
    fetchPerms();
  }, [user, data]);

  return (
    <Container size="sm" px="lg">
      <Breadcrumbs mb="lg">
        <Anchor component={Link} to="/">
          Home
        </Anchor>
        <Anchor component={Link} to="/expenses">
          Expenses
        </Anchor>
        <Anchor component={Link} to={`/expenses/${params.id}`}>
          {data?.expense.id}
        </Anchor>
      </Breadcrumbs>
      <Paper shadow="xs" p="md">
        <>
          {isLoading && (
            <Center>
              <Loader />
            </Center>
          )}

          {error && <p>Permission Denied</p>}
          {data && !perms.canView && <p>Permission Denied</p>}

          {data && perms.canView && (
            <Table>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>
                    <Text ta="right" fw={500} c="dimmed">
                      ID
                    </Text>
                  </Table.Td>
                  <Table.Td>{data.expense.id}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text ta="right" fw={500} c="dimmed">
                      Submitted By
                    </Text>
                  </Table.Td>
                  <Table.Td>{data.expense.ownerId}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text ta="right" fw={500} c="dimmed">
                      Submitted At
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    {new Date(data.expense.createdAt).toLocaleString()}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text ta="right" fw={500} c="dimmed">
                      Vendor
                    </Text>
                  </Table.Td>
                  <Table.Td>{data.expense.vendor}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text ta="right" fw={500} c="dimmed">
                      Amount
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    {`$ ${data.expense.amount}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text ta="right" fw={500} c="dimmed">
                      Region
                    </Text>
                  </Table.Td>
                  <Table.Td>{data.expense.region}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text ta="right" fw={500} c="dimmed">
                      Status
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <StatusBadge status={data.expense.status} />
                  </Table.Td>
                </Table.Tr>
                {perms.canViewApprover && (
                  <Table.Tr>
                    <Table.Td>
                      <Text ta="right" fw={500} c="dimmed">
                        Approved By
                      </Text>
                    </Table.Td>
                    <Table.Td>{data.expense.approvedById}</Table.Td>
                  </Table.Tr>
                )}
                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td>
                    <ListAction
                      expense={data.expense}
                      hideDetails
                      permissions={data.permissions}
                      onDelete={() => {
                        navigate(`/expenses`, { replace: true });
                      }}
                      onUpdate={() => {
                        refetch();
                      }}
                    />
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          )}
        </>
      </Paper>
    </Container>
  );
};
