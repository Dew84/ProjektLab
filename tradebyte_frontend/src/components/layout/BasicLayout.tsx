import {AppShell} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Outlet} from "react-router-dom";
import {HeaderLayout} from "./HeaderLayout.tsx";

const BasicLayout = () => {
    const [opened] = useDisclosure();

    return <>
        <AppShell
            header={{height: 80}}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: {mobile: !opened},
            }}
            padding="md"
            style={{background: '#f9f9f9'}}
        >

            <AppShell.Header
                style={{boxShadow: '0px 5px 10px 0px rgba(82, 63, 105, 0.05)', border: '1px solid #f1f1f1'}}>
                <HeaderLayout></HeaderLayout>
            </AppShell.Header>

            <AppShell.Main style={{background: 'url("/bg.png") no-repeat center center fixed'}}>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    </>
}

export default BasicLayout;