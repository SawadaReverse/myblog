import { Box } from "@mui/material";
import { ReactElement } from "react";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => <>{children}</>;
