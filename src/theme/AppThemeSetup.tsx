import { ConfigProvider } from "antd";
import defaultTheme from "./themes/defaultTheme";
import { ThemeProvider } from "@emotion/react";

type AppThemeSetupProps = {
  children: React.ReactNode;
};
import "@emotion/react";
import { ConfigConsumer } from "antd/es/config-provider";
import { AliasToken } from "antd/es/theme/internal";

type ThemeTokenType = Partial<AliasToken>;
declare module "@emotion/react" {
  interface Theme extends ThemeTokenType {}
}

export default function AppThemeSetup(props: AppThemeSetupProps) {
  const { children } = props;

  return (
    <ConfigProvider theme={defaultTheme}>
      <ConfigConsumer>
        {({ theme }) => {
          return (
            <ThemeProvider theme={theme?.token as Partial<AliasToken>}>
              {children}
            </ThemeProvider>
          );
        }}
      </ConfigConsumer>
    </ConfigProvider>
  );
}
