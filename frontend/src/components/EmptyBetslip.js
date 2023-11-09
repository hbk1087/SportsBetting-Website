import { Grid, Typography, Paper } from '@mui/material';

// empty betslip icon
import noBetsIcon from "../img/nobet.png"


const styles = {
    container: {
        background: 'black',
        minHeight: '100vh',
        marginTop: '20px', // Add margin-top
        padding: '20px', // Add padding
    },
    paper: {
        padding: '20px',
    },
    image: {
        width: '100%',
        height: '100%',
    },
};

const EmptyBetslip = ({message}) => {

    return (
        <Grid container style={styles.container} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={styles.paper}>
                    <img src={noBetsIcon} alt="Empty Betslip" style={styles.image} />
                    <Typography variant="h6" align="center">
                        {message}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default EmptyBetslip;