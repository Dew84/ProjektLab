import { IconSearch } from '@tabler/icons-react';
import {Autocomplete, Burger, Group, Image} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderLayout.module.css';

const links = [
    { link: '/login', label: 'Bejelentkezés' },
    { link: '/', label: 'Regisztráció' },
    { link: '/', label: 'Részletes keresés' },
    { link: '/', label: 'Kapcsolat' },
];

export function HeaderLayout() {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    <Image src="/logo.png" alt="logo" width={60} height={60} />
                </Group>

                <Group>
                    <Autocomplete
                        className={classes.search}
                        placeholder="Keresés"
                        leftSection={<IconSearch size={16} stroke={1.5} />}
                        visibleFrom="sm"
                    />
                    <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
                        {items}
                    </Group>
                </Group>
            </div>
        </header>
    );
}