import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
// {title: string, content: string, leftButton: string, rightButton:string}
const ConfirmDialog: React.VFC<{
  open: boolean
  setOpen: (value: React.SetStateAction<boolean>) => void
  action: () => void
  title: string
  content: string
  leftButton?: string
  rightButton?: string
}> = ({
  open,
  setOpen,
  action,
  title,
  content,
  leftButton = 'Cancel',
  rightButton = 'Confirm',
}) => {
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {leftButton}
        </Button>
        <Button onClick={action}>{rightButton}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
