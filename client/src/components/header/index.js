import { Link } from "preact-router/match";
import { Box } from "@chakra-ui/react";

const Header = () => (
  <Box
    padding="10px"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    backgroundColor="#222"
    color="#fff"
  >
    <h1>Preact App</h1>
    <Box>
      <Link href="/">Home</Link>
    </Box>
  </Box>
);

export default Header;
