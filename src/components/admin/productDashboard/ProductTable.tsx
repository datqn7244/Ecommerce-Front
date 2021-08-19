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
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import ConfirmDialog from '../../utils/ConfirmDialog'
import ProductTableHead from './ProductTableHead'
import ProductForm from './ProductForm'
import { Product } from '../../../types/reduxTypes'
import { HeadCell, TableProps } from '../../../types/utils'

export type ProductTableClasses = ReturnType<typeof useStyles>

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
	image:{
		height: theme.spacing(8),
		width: 'auto'
	}
  })
)

const ProductTable: VFC<{
  products: Product[]
  tableProps: TableProps<Product>
  setTableProps: (value: SetStateAction<TableProps<Product>>) => void
  headCells: HeadCell<Product>[]
  total: number
  handleDeleteProduct: (productId: string) => void
}> = ({
  products,
  tableProps,
  setTableProps,
  headCells,
  total,
  handleDeleteProduct,
}) => {
  const classes = useStyles()
  const { order, orderBy, page, rowsPerPage } = tableProps
  const [openDelete, setOpenDelete] = useState(false)
  const [product, setProduct] = useState({} as Product)
  const [openProduct, setOpenProduct] = useState(false)

  const handleClickOpen = (product: Product) => {
    setOpenDelete(true)
    setProduct(product)
  }
  const handleClickOpenProduct = (product: Product) => {
    setOpenProduct(true)
    setProduct(product)
  }
  const deleteProduct = () => {
    handleDeleteProduct(product._id)
    setOpenDelete(false)
  }

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Product
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
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage)
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <ProductTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {products.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell align="center">
                      {row.images.length ? (
                        <img
                          src={row.images[0].dataURL}
                          alt={row.name}
                          className={classes.image}
                        />
                      ) : null}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                      {row.categories
                        .map((category) => category.name)
                        .join(', ')}
                    </TableCell>
                    <TableCell align="left">
                      {row.variants.join(', ')}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="center">
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickOpenProduct(row)}
                      >
                        Edit <EditIcon />
                      </Button>
                      <Button
                        className={classes.button}
                        variant="text"
                        onClick={() => handleClickOpen(row)}
                      >
                        Delete <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
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
      <ConfirmDialog
        open={openDelete}
        setOpen={setOpenDelete}
        action={deleteProduct}
        title={`Delete product ${product.name}?`}
        content={`You are about to delete product ${product.name}. This action cannot be undone.`}
        rightButton="Delete"
      />
      <ProductForm
        open={openProduct}
        setOpen={setOpenProduct}
        product={product}
      />
    </div>
  )
}

export default ProductTable
