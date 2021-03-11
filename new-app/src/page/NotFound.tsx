import * as React from 'react';
import { Container, Toolbar, Typography } from '@material-ui/core';

import missing from '../asset/missing.jpg'

export const NotFound = () => {
  return (
    <Container>
      <Typography align="center" variant="h5">404: Page Fot Found</Typography>
    </Container>
  )
}