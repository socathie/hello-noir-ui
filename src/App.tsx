import WalletConnector from "./WalletConnector";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { verifyProof } from "./contract";
import useInput from "./useInput";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    
    const x = useInput(0);
    const y = useInput(0);

    const verify = async () => {
        verifyProof({x: x.value, y: y.value})
    }
    
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <WalletConnector />
            <TextField
                id="x"
                label="x"
                type="number"
                variant="filled"
                value={x.value}
                onChange={x.onChange}
            />
            <TextField
                id="y"
                label="y"
                type="number"
                variant="filled"
                value={y.value}
                onChange={y.onChange}
            /><br />
            <Button
                onClick={verify}
                variant="contained">
                Prove+Verify
            </Button>
            <br />
        </ThemeProvider>
    )
}
