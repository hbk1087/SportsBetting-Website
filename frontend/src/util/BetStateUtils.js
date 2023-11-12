import { useSelector } from 'react-redux';

export const formalizeBet = (bet) => {
    


}

export const printFinalizedBets = () => {
    const finalizedBetArray = useSelector((state) => state.bets.finalizedBetArray);

    for (bet in finalizedBetArray){
        console.log(bet);
    }

} 