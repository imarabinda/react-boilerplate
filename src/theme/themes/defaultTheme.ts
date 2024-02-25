import { ThemeConfig } from "antd";

//test

const _palette = {
  //basic
  colorWhite: "#FFFFFF",
  colorBlack: "#000",
  colorBgMask: "#F2F4F7",
  colorGrayLightest: "#FAFBFC",

  colorPrimary: "#1760e8",
  colorInfo: "#1760e8",
  colorSuccess: "#0b6e40",
  colorError: "#a11c12",
  colorLink: "#124dba",
  colorTextBase: "#101828",

  // primary colors
  colorPrimaryBg: "#3366FF",
  colorPrimaryBgHover: "#4D7DFF",
  colorPrimaryBorder: "#3366FF",
  colorPrimaryBorderHover: "#4D7DFF",
  colorPrimaryHover: "#4D7DFF",
  colorPrimaryActive: "#254EDB",
  colorPrimaryTextHover: "#FFFFFF",
  colorPrimaryText: "#101828",
  colorPrimaryTextActive: "#FFFFFF",

  //warning colors
  colorWarningBg: "#FFBB33",
  colorWarningBgHover: "#FFCC66",
  colorWarningBorder: "#FFBB33",
  colorWarningBorderHover: "#FFCC66",
  colorWarningHover: "#FFCC66",
  colorWarning: "#FF8800",
  colorWarningActive: "#E67300",
  colorWarningTextHover: "#FFFFFF",
  colorWarningText: "#FFFFFF",
  colorWarningTextActive: "#FFFFFF",

  //Info colors
  colorInfoBg: "#33CCFF",
  colorInfoBgHover: "#66DDFF",
  colorInfoBorder: "#33CCFF",
  colorInfoBorderHover: "#66DDFF",
  colorInfoHover: "#66DDFF",

  colorInfoActive: "#007799",
  colorInfoTextHover: "#FFFFFF",
  colorInfoText: "#FFFFFF",
  colorInfoTextActive: "#FFFFFF",

  //success colors
  colorSuccessBg: "#00CC66",
  colorSuccessBgHover: "#00E673",
  colorSuccessBorder: "#00CC66",
  colorSuccessBorderHover: "#00E673",
  colorSuccessHover: "#00E673",

  colorSuccessActive: "#006633",
  colorSuccessTextHover: "#FFFFFF",
  colorSuccessText: "#FFFFFF",
  colorSuccessTextActive: "#FFFFFF",

  //error colors
  colorErrorBg: "#FF3344",
  colorErrorBgHover: "#FF6677",
  colorErrorBorder: "#FF3344",
  colorErrorBorderHover: "#FF6677",
  colorErrorHover: "#FF6677",

  colorErrorActive: "#990000",
  colorErrorTextHover: "#FFFFFF",
  colorErrorText: "#FFFFFF",
  colorErrorTextActive: "#FFFFFF",
};

type DefaultPalette = typeof _palette;

declare module "antd/es/theme/internal" {
  interface AliasToken extends DefaultPalette {}
}

const defaultTheme: ThemeConfig = {
  token: {
    ..._palette,
    // Add your sizes here
    fontSizeIcon: 0,
    fontWeightStrong: 0,
    controlOutlineWidth: 0,
    borderRadius: 16,
  },
  components: {
    Button: {
      borderRadius: 16,
      fontFamily: "Inter",
      colorText: _palette.colorPrimaryText,
    },
  },
};

export default defaultTheme;
