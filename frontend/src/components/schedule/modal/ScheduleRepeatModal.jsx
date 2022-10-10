import { Box, Button, Chip, FormControlLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React from 'react'
import { EnumTypeTime, TypeTimeOptions, TypeWeekdaysOption } from '../../../interface/enum';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export default function ScheduleRepeatModal() {
  const [open, setOpen] = React.useState(false);
  const [typeTime, setTypeTime] = React.useState(EnumTypeTime.day)
  const [weekdays, setWeekdays] = React.useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} sx={{ margin: "12px" }}>Repeat</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
            Lặp lại tùy chỉnh
          </Typography>

          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "start", alignItems: "center", marginBottom: "10px" }}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: "bold" }}>Lăp lại mỗi</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField size="small" sx={{ width: "60px", marginX: "10px" }} />
                  <Select
                    value={typeTime}
                    onChange={(e) => setTypeTime(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    size="small"
                  >
                    {TypeTimeOptions.map((time) => {

                      return <MenuItem key={time.value} value={time.value}>{time.label}</MenuItem>
                    })}
                  </Select>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", alignItem: "center", marginBottom: "10px" }}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: "bold", marginRight: "10px" }}>Lăp lại vào</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Select
                    value={weekdays}
                    onChange={(e) => setWeekdays(e.target.value)}
                    displayEmpty
                    multiple
                    inputProps={{ 'aria-label': 'Without label' }}
                    size="small"
                    sx={{ minWidth: "100px" }}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {TypeWeekdaysOption.map((day) => {

                      return <MenuItem key={day.value} value={day.value}>{day.label}</MenuItem>
                    })}
                  </Select>

                </Grid>
              </Grid>
            </Box>
            <Box >
              <Typography sx={{ fontWeight: "bold", marginRight: "10px" }}>Kết thúc</Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="nerver" control={<Radio />} label="Không bao giờ" />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Grid container>
                    <Grid item xs={6}>
                      <FormControlLabel value="male" control={<Radio />} label="Vào ngày" />
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          views={["year", "month", "day"]}
                          renderInput={(params) => <TextField {...params} />}
                          value={new Date()}
                          onChange={(e) => {
                            console.log(e);
                            //  setStartDate(e);
                          }}
                        />

                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
              </RadioGroup>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", alignItem: "center", marginTop: "10px" }}>
              <Button variant=''>
                Hủy
              </Button>
              <Button >
                Xong
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
