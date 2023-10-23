import { useSelector, useDispatch } from 'react-redux';
import { placeBet } from './userSlice';

function BetComponent() {
  const balance = useSelector((state) => state.user.balance);
  const dispatch = useDispatch();

  const handlePlaceBet = (bet) => {
    dispatch(placeBet(bet));
  };

  // Render your component
}
