import { Box } from "@material-ui/core";
import * as React from "react";

export type WrapperSize = "small" | "normal";
interface WrapperProps {
  size: WrapperSize;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, size }) => {
  return (
    <>
      <div>
        <Box
          style={{
            margin: "25px auto",
            maxWidth: size === "normal" ? 800 : 400,
            width: "100%",
          }}
          className="wrapper"
        >
          {children}
        </Box>
      </div>
    </>
  );
};
