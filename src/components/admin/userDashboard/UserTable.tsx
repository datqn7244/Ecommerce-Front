import { ChangeEvent, SetStateAction, useState, VFC, MouseEvent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import BlockIcon from '@material-ui/icons/Block'
import TagFacesIcon from '@material-ui/icons/TagFaces';

import UserTableHead from './UserTableHead'
import { User } from '../../../types/reduxTypes'
import { HeadCell, TableProps } from '../../../types/utils'
import BanForm from './BanForm'

export type UserTableClasses = ReturnType<typeof useStyles>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
      margin: 'auto',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    button: {
      marginRight: theme.spacing(1),
    },
  })
)

const UserTable: VFC<{
  users: User[]
  tableProps: TableProps<User>
  setTableProps: (value: SetStateAction<TableProps<User>>) => void
  headCells: HeadCell<User>[]
  total: number
  getUsers: (query: string) => void
  handleUnban: (userId: string) => Promise<void>
}> = ({ users, tableProps, setTableProps, headCells, total, getUsers, handleUnban }) => {
  const classes = useStyles()
  const { order, orderBy, page, rowsPerPage } = tableProps
  const [user, setUser] = useState({} as User)
  const [openBan, setOpenBan] = useState(false)
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage)

  const handleClickOpenBan = (user: User) => {
    setUser(user)
    setOpenBan(true)
  }

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setTableProps({
      ...tableProps,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setTableProps({ ...tableProps, page: newPage })
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setTableProps({
      ...tableProps,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    })
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <UserTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {users.map((row, index) => (
                <TableRow hover tabIndex={-1} key={`${user}-${row._id}`}>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                    {row.ban
                      ? new Date(row.ban.expired).toLocaleString('fi')
                      : ''}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={() => handleUnban(row._id)}
					  disabled={!Boolean(row.ban)}
                    >
                      Unban <TagFacesIcon />
                    </Button>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={() => handleClickOpenBan(row)}
                    >
                      Ban <BlockIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 69 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <BanForm
        open={openBan}
        setOpen={setOpenBan}
        user={user}
        getUsers={getUsers}
      />
    </div>
  )
}

export default UserTable
