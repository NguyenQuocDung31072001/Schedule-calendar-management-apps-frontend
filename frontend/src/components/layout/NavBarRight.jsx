
import { Box, Menu, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'

//material icon
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { ImageStyle } from './common';
import { useNavigate } from 'react-router-dom';
import { language } from '../../interface/enum';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const MenuOptionAccount = (handleCloseMenuAccount, navigate, t) => [{
  path: "setting",
  name: t(`navbar.menu.profile`),
  onClick: handleCloseMenuAccount
}, {
  path: "logout",
  name: t(`navbar.menu.logout`),
  onClick: () => {
    handleCloseMenuAccount()
    navigate("login")
  }
}]
export default function NavBarRight() {
  const navigate = useNavigate()
  const [t] = useTranslation('common');
  const [anchorMenuAccount, setAnchorMenuAccount] = React.useState(null);
  const [chooseLanguage, setChooseLanguage] = React.useState(language.en)
  const openMenuAccount = Boolean(anchorMenuAccount)
  const handleOpenMenuAccount = (event) => {
    setAnchorMenuAccount(event.currentTarget)
  }
  const handleCloseMenuAccount = () => {
    setAnchorMenuAccount(null)
  }
  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right", alignItems: "center", height: 40 }}>
      <Box>
        <Select
          value={chooseLanguage}
          label="Language"
          onChange={(e) => {
            setChooseLanguage(e.target.value)
            if (e.target.value === language.en) {
              i18next.changeLanguage('en')
            }
            else if (e.target.value === language.vi) {
              i18next.changeLanguage('vi')
            }
          }}
        >
          <MenuItem value={language.en}>{language.en}</MenuItem>
          <MenuItem value={language.vi}>{language.vi}</MenuItem>
        </Select>
      </Box>
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
            {MenuOptionAccount(handleCloseMenuAccount, navigate, t).map((item) => (
              <MenuItem key={item.name} onClick={item.onClick}>{item.name}</MenuItem>
            ))}
          </Menu>
        </Box>

      </Box>
    </Box>
  )
}
