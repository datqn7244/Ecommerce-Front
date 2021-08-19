import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

import { User } from '../../../types/reduxTypes'
import { HeadCell, Order } from '../../../types/utils'
import { UserTableClasses } from './UserTable'

interface UserTableProps {
  classes: UserTableClasses
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => void
  order: Order
  orderBy: string
  headCells: HeadCell<User>[]
}

const UserTableHead: React.VFC<UserTableProps> = ({
  classes,
  order,
  orderBy,
  onRequestSort,
  headCells,
}) => {
  const createSortHandler =
    (property: keyof User) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            if (headCell.sort) {
              return (
                <TableCell
                  key={headCell.id}
                  align={headCell.align ? headCell.align : headCell.numeric ? 'right':'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              )
            }
            return (
              <TableCell
                key={headCell.id}
				align={headCell.align ? headCell.align : headCell.numeric ? 'right':'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
              >
                {headCell.label}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    </>
  )
}

export default UserTableHead
