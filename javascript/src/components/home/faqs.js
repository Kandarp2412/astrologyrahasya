import PropTypes from 'prop-types';
import { Box, Card, CardContent, Container, Link, Typography } from '@material-ui/core';

const FaqCard = (props) => {
  const { question, children } = props;

  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: 'neutral.100' }}
    >
      <CardContent>
        <Typography
          align="left"
          color="textPrimary"
          sx={{ mb: 2 }}
          variant="h6"
        >
          {question}
        </Typography>
        <Typography
          align="left"
          color="textSecondary"
          variant="body2"
        >
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
};

FaqCard.propTypes = {
  children: PropTypes.node,
  question: PropTypes.string.isRequired
};

export const Faqs = () => (
  <Box
    sx={{
      pb: 9,
      pt: 15
    }}
  >
    <Container maxWidth="lg">
      <Typography
        align="center"
        color="textPrimary"
        sx={{ mb: 8 }}
        variant="h2"
      >
        Frequently asked questions
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: {
            md: 'column',
            xs: 'row'
          },
          gap: 3
        }}
      >
        <Box
          sx={{
            display: 'grid',
            height: 'fit-content',
            gridAutoFlow: 'row',
            gap: 3
          }}
        >
          <FaqCard question="Do you have a free demo to review the code before purchasing?">
            No yet, but you can check out our open source
            <Link
              color="primary"
              href="https://github.com/devias-io/material-kit-react"
              rel="nofollow noreferrer noopener"
              target="_blank"
              underline="none"
              variant="inherit"
            >
              {' '}
              dashboard template
              {' '}
            </Link>
            which should give you an idea of the code quality and folder structure.
            <br />
            <br />
            Keep in mind that some aspects may differ from the Carpatin - Retail &amp; Back Office
            Dashboard.
          </FaqCard>
          <FaqCard question="How many projects can I build with Carpatin - Retail &amp; Back Office?">
            The license is per project (domain), but if you intend
            to develop an unknown number of projects feel free to
            {' '}
            <Link
              color="primary"
              href="https://devias.io/contact"
              target="_blank"
              underline="none"
              variant="inherit"
            >
              contact us
            </Link>
            {' '}
            and we&apos;ll find a solution.
          </FaqCard>
        </Box>
        <Box
          sx={{
            display: 'grid',
            height: 'fit-content',
            gridAutoFlow: 'row',
            gap: 3
          }}
        >
          <FaqCard question="Can I use this template in commercial projects like a SaaS?">
            Absolutely! If you intend to charge users for using your product
            Extended license is created specifically for this context.
          </FaqCard>
          <FaqCard question="What browsers does Carpatin - Retail &amp; Back Office support?">
            The components in Material-UI are designed to work in the latest, stable
            releases of all major browsers, including Chrome, Firefox, Safari, and Edge.
            <br />
            <br />
            We don&apos;t support Internet Explorer 11.
          </FaqCard>
        </Box>
        <Box
          sx={{
            display: 'grid',
            height: 'fit-content',
            gridAutoFlow: 'row',
            gap: 3
          }}
        >
          <FaqCard question="For what kind of projects is the Standard license intended?">
            The Standard license is designed for internal applications
            in which staff will access the application.
            <br />
            <br />
            An example could be the back-office dashboard of a public-facing e-commerce website in
            which staff would sign in and manage inventory, customers, etc.
          </FaqCard>
          <FaqCard question="Does Carpatin - Retail &amp; Back Office include Figma, Sketch, or Adobe XD files?">
            The Standard Plus license includes an expertly designed complete Figma kit
            that takes advantage of modern Figma features like Variants and Auto Layout.
            <br />
            <br />
            Should you need a sample of the Figma file, you can
            <Link
              color="primary"
              href="https://www.figma.com/file/tQ5YYeRoaB7CMPHuC7eG5X/Carpatin-Retail-and-Back-Office-Dashboard_v1.0?node-id=7435%3A43141"
              rel="nofollow noreferrer noopener"
              target="_blank"
              underline="none"
              variant="inherit"
            >
              {' '}
              download a free preview
              {' '}
            </Link>
            from the Figma community.
            <br />
            <br />
            We don&apos;t include assets for other design tools such as Sketch or Adobe XD.
          </FaqCard>
        </Box>
      </Box>
    </Container>
  </Box>
);
