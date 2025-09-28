import {Card, Table} from "@mantine/core";

const HomePage = () => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Leírás</Table.Th>
                        <Table.Th>Hely</Table.Th>
                        <Table.Th>Állapot</Table.Th>
                        <Table.Th>Műveletek</Table.Th>
                    </Table.Tr>
                </Table.Thead>
            </Table>
        </Card>
    );
};

export default HomePage;