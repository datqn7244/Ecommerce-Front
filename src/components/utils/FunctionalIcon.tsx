import { IconButton, Tooltip } from "@material-ui/core";
import { FunctionalIconProps } from "../../types/utils";

const FunctionalIcon: React.VFC<FunctionalIconProps> = ({
  state,
  title1,
  title2,
  label,
  toggle,
  icon1,
  icon2,
  classes,
}) => {
  return (
    <Tooltip title={state ? title1 : title2} className={classes}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label={label}
        onClick={toggle}
      >
        {state ? icon1 : icon2}
      </IconButton>
    </Tooltip>
  );
};

export default FunctionalIcon;
