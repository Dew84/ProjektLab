import {Card, Text, Button, Group, Image} from '@mantine/core';
import {AdDto} from "../../../generated";



export function CardLayout({ pictureUrls, title, description, price }: AdDto) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={pictureUrls?.at(0)}
                    height={160}
                    alt={title ?? ""}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
            </Group>

            <Text size="sm" c="dimmed">
                {description}

            </Text><Text size="sm" c="dimmed">
                {price}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Megnyitás
            </Button>
        </Card>
    );
}
