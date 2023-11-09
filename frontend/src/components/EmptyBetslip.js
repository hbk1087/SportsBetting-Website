import { Grid, Typography, Paper } from '@mui/material';

// empty betslip icon
import noBetsIcon from "../img/nobet.png"


const styles = {
    container: {
        background: 'black',
        minHeight: '30vh',
        marginTop: '20px', 
        padding: '20px', 
        minWidth: '200px',
        width: '100%'
    },
    paper: {
        background: 'black',
        width: '100%',
        color: '#cedae7'
    },
    image: {
        width: '100%',
        height: '100%',
    },
};

const EmptyBetslip = ({noBetsMessage, instructionsMessage}) => {

    return (
        <Grid container style={styles.container} justifyContent="center" alignItems="center">
            <Paper elevation={3} style={styles.paper}>
                <img src={noBetsIcon} alt="Empty Betslip" style={styles.image} />
                <Typography variant="h5" align="center">
                    {noBetsMessage}
                </Typography>
                <Typography variant="h6" align="center">
                    {instructionsMessage}
                </Typography>
            </Paper>
        </Grid>
    );
}

export default EmptyBetslip;