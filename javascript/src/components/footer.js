import { Box, Container, Link, Typography } from "@material-ui/core";

const links = [
  {
    label: "About Us",
    href: "https://devias.io/about-us",
  },
  {
    label: "Terms",
    href: "https://devias.io/legal/tos",
  },
];

export const Footer = () => (
  <Box sx={{ backgroundColor: "background.default" }}>
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        py: 3,
        "& a": {
          mt: {
            md: 0,
            xs: 1,
          },
          "&:not(:last-child)": {
            mr: {
              md: 5,
              xs: 0,
            },
          },
        },
      }}
    >
      <Typography color="textSecondary" variant="caption">
        © 2021 Rahasya Vedic Astrology
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {links.map((link) => (
        <Link
          color="textSecondary"
          href={link.href}
          key={link.label}
          target="_blank"
          underline="none"
          variant="body2"
        >
          {link.label}
        </Link>
      ))}
    </Container>
  </Box>
);
