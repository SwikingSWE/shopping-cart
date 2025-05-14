// web/src/pages/Checkout.jsx
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  increment,
  decrement,
  removeItem,
  clearCart,
} from "../features/slices/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatSelectedOptions } from "../utils/cartHelpers";
import { CheckoutItem } from "../components/CheckoutItem";

export const Checkout = () => {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {items.map((item, index) => (
              <CheckoutItem key={index} item={item} />
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Total: {total} SEK
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary">
              Proceed to Payment
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};
