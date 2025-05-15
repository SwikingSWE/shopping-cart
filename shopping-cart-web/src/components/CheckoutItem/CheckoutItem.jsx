import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  increment,
  decrement,
  removeItem,
} from "../../features/slices/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatSelectedOptions } from "../../utils/helpers";

export const CheckoutItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <ListItem
      divider
      secondaryAction={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() =>
              dispatch(
                decrement({
                  id: item.id,
                  selectedOptions: item.selectedOptions,
                })
              )
            }
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton
            onClick={() =>
              dispatch(
                increment({
                  id: item.id,
                  selectedOptions: item.selectedOptions,
                })
              )
            }
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              dispatch(
                removeItem({
                  id: item.id,
                  selectedOptions: item.selectedOptions,
                })
              )
            }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={`${item.name} ${formatSelectedOptions(item.selectedOptions)}`}
        secondary={`${item.price} SEK each`}
      />
    </ListItem>
  );
};
