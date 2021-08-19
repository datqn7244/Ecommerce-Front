import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

import { Product } from '../../../types/reduxTypes'
import { HeadCell, Order } from '../../../types/utils'
import { ProductTableClasses } from './ProductTable'

interface ProductTableProps {
  classes: ProductTableClasses
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => void
  order: Order
  orderBy: string
  headCells: HeadCell<Product>[]
}

const ProductTableHead: React.VFC<ProductTableProps> = ({
  classes,
  order,
  orderBy,
  onRequestSort,
  headCells,
}) => {
  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
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
          <TableCell align="center" padding="normal">
            Action
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  )
}

export default ProductTableHead
