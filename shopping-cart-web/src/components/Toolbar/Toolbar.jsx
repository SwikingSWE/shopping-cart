import { useState, useRef } from "react";
import {
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../features/slices/cart/cartSlice";
import { Cart } from "../Cart";
import { Link } from "react-router-dom";

export const Toolbar = () => {
  const cartCount = useSelector(selectCartCount);
  const [cartOpen, setCartOpen] = useState(false);
  const cartIconRef = useRef(null);

  return (
    <>
      <AppBar position="static">
        <MuiToolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            My Shop
          </Typography>

          <IconButton
            color="inherit"
            ref={cartIconRef}
            onClick={() => setCartOpen((prev) => !prev)}
          >
            <Badge
              badgeContent={cartCount}
              color="error"
              invisible={cartCount === 0}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </MuiToolbar>
      </AppBar>

      <Cart
        open={cartOpen}
        anchorEl={cartIconRef.current}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
};
