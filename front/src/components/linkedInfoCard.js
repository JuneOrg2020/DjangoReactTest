import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class LinkedInfoCard extends PureComponent {
  render() {
    const {
      data, onClick,
    } = this.props;

    return (
      <Card onClick={() => onClick(data.id)}>
        <CardContent>
          <Typography variant="body2" component="p">
            {data.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default LinkedInfoCard;
