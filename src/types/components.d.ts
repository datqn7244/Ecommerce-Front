

export type SideDrawerProps = {
  drawer: boolean;
  toggleDrawer:  (open: boolean) => (event:React.KeyboardEvent | React.MouseEvent)=>void;
  anchor: "bottom" | "left" | "right" | "top" | undefined;
};
