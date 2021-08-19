import {
  Select,
  SelectProps,
  InputLabel,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  Theme,
  makeStyles,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useState } from 'react'
import CategoryForm from '../product/CategoryForm'

interface FormikMuiMultipleSelectProps extends SelectProps {
  options: Option[]
}

type Option = { value: string | number; label: string }

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 400,
    },
  },
}

const useStyle = makeStyles((theme: Theme) => ({
  div: {
    display: 'flex',
  },
  input: {
    width: '90%',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}))
const FormikMuiMultipleSelect: React.VFC<FormikMuiMultipleSelectProps> = ({
  onChange,
  name,
  value,
  options,
  variant,
  label,
  className,
}) => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false)
  const classes = useStyle()
  const formOptions = options.map((option) => option.value)

  const handleOpen = ()=>{
	  setOpenCategoryDialog(true)
  }
  return (
    <div className={className}>
      <InputLabel id="formik-mui-categories-select-label">{label}</InputLabel>
      <div className={classes.div}>
        <Select
          labelId="formik-mui-categories-select-label"
          id="formik-mui-categories-select"
          name={name}
          className={classes.input}
          multiple
          value={value}
          onChange={onChange}
          input={<Input />}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            const selectedList = (selected as string[])
              .map((select) => {
                const option = options.find((option) => option.value === select)
                if (option) {
                  return (option as Option).label
                }
                return undefined
              })
              .join(', ')
            if (selectedList.length) {
              return selectedList
            }
            return []
          }}
        >
          {formOptions.map((option, index: number) => {
            return (
              <MenuItem key={`${name}-${index}`} value={option}>
                <Checkbox
                  checked={(value as string[]).indexOf(option as string) > -1}
                />
                <ListItemText
                  primary={options.find((opt) => opt.value === option)?.label}
                />
              </MenuItem>
            )
          })}
        </Select>
        <Tooltip title="Add new category" className={classes.button}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Add new category"
            onClick={handleOpen}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </div>
      <CategoryForm open={openCategoryDialog} setOpen={setOpenCategoryDialog} />
    </div>
  )
}

export default FormikMuiMultipleSelect
