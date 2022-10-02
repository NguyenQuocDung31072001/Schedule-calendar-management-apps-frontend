
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'

//material icon
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { ImageStyle } from './common';

const MenuOptionAccount = (handleCloseMenuAccount) => [{
    path: "setting",
    name: "Profile",
    onClick: handleCloseMenuAccount
}, {
    path: "logout",
    name: "Logout",
    onClick: handleCloseMenuAccount
}]
export default function NavBarRight() {
    const [anchorMenuAccount, setAnchorMenuAccount] = React.useState(null);
    const openMenuAccount = Boolean(anchorMenuAccount)
    const handleOpenMenuAccount = (event) => {
        setAnchorMenuAccount(event.currentTarget)
    }
    const handleCloseMenuAccount = () => {
        setAnchorMenuAccount(null)
    }
    return (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right", alignItems: "center", height: 40 }}>
            <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                <NotificationsNoneOutlinedIcon />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", height: "100%", cursor: "pointer" }}>
                <Box sx={{ marginX: 1, height: "100%" }}>
                    <ImageStyle
                        src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                        alt="" />
                </Box>
                <Box sx={{ marginRight: 5 }}>
                    <Typography id="account-menu" sx={{ display: "flex", alignItems: "center" }} onClick={(event) => handleOpenMenuAccount(event)}>
                        dung nguyen
                        <KeyboardArrowDownOutlinedIcon />
                    </Typography>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorMenuAccount}
                        open={openMenuAccount}
                        onClose={handleCloseMenuAccount}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {MenuOptionAccount(handleCloseMenuAccount).map((item) => (
                            <MenuItem key={item.name} onClick={item.onClick}>{item.name}</MenuItem>
                        ))}
                    </Menu>
                </Box>

            </Box>
        </Box>
    )
}
