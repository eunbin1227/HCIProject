import {unstable_createMuiStrictModeTheme as createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Noto Sans KR', 'sans-serif'
        ].join(','),
    },
});
