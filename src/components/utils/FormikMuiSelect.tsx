import {
  Select,
  SelectProps,
  InputLabel,
  MenuItem,
  makeStyles,
  Theme,
  FormControl,
} from '@material-ui/core'

const useStyle = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))
interface FormikMuiSelectProps extends SelectProps {
  options: Option[] | string[]
}

export type Option = { value: string | number; label: string } | string
const FormikMuiSelect: React.VFC<FormikMuiSelectProps> = ({
  onChange,
  name,
  value,
  options,
  variant,
  label,
  color,
}) => {
  const classes = useStyle()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`${name}-label`} color={color}>
        {label}
      </InputLabel>
      <Select
        onChange={onChange}
        name={name}
        value={value}
        variant={variant}
        labelId={`${name}-label`}
      >
        {options.map((option: Option, index: number) => {
          if (option === '') {
            return (
              <MenuItem key={`${name}-${index}`} value={option}>
                None
              </MenuItem>
            )
          }
          if (typeof option === 'string') {
            return (
              <MenuItem key={`${name}-${index}`} value={option}>
                {option}
              </MenuItem>
            )
          } else {
            return (
              <MenuItem key={`${name}-${index}`} value={option.value}>
                {option.label}
              </MenuItem>
            )
          }
        })}
      </Select>
    </FormControl>
  )
}

export default FormikMuiSelect
