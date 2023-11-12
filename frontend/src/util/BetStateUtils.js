import { useSelector } from 'react-redux';


export const printFinalizedBets = () => {
    const finalizedBetArray = useSelector((state) => state.bets.finalizedBets);

    for (const bet of finalizedBetArray){
        console.log(bet);
    }
} 