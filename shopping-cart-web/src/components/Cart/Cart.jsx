// web/src/components/CartPopper.jsx
import {
  Paper,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  increment,
  decrement,
  removeItem,
} from "../../features/slices/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { formatSelectedOptions } from "../../utils/cartHelpers";

export const Cart = ({ open, anchorEl, onClose }) => {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
      <ClickAwayListener onClickAway={onClose}>
        <Paper sx={{ width: 360, p: 2 }}>
          <Typography variant="h6">Cart</Typography>
          <Divider sx={{ my: 1 }} />

          {items.length === 0 ? (
            <Typography sx={{ mb: 1 }}>Your cart is empty.</Typography>
          ) : (
            <>
              <List dense>
                {items.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText
                      primary={`${item.name} ${formatSelectedOptions(
                        item.selectedOptions
                      )}`}
                      secondary={`${item.price} SEK each`}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            decrement({
                              id: item.id,
                              selectedOptions: item?.selectedOptions,
                            })
                          )
                        }
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            increment({
                              id: item.id,
                              selectedOptions: item.selectedOptions,
                            })
                          )
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            removeItem({
                              id: item.id,
                              selectedOptions: item.selectedOptions,
                            })
                          )
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ mb: 1 }}>Total: {total} SEK</Typography>
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                fullWidth
                onClick={onClose}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};
