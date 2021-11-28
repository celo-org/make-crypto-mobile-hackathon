import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, CardActions, Button } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
//
import SvgIconStyle from '../SvgIconStyle';
import Task from './Task';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

TaskPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};


export default function TaskPostCard({ post, index }) {

  return (
    <Grid item xs={5} >
      <Card sx={{ position: 'relative' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    {post.task}
                </Typography>
                <Typography variant="h5" component="div">
                {post.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    {post.description}
                </Typography>
                <Typography variant="button"
                    style={{
                        backgroundColor: "#36D07F",
                        borderRadius: 10,
                        padding: 5,
                        color: "white"
                    }}
                >
                    Pay: { (post.total_price / post.number_of_labelers) + " CELO"}
                </Typography>
                <Box sx={{ height: 10 }} />
                <Typography variant="body2">Contract Address: <br/>
                  <a target="_blank" href={`https://alfajores-blockscout.celo-testnet.org/address/${post.contract_address}/transactions`}>{post.contract_address}</a>
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent: "flex-end"}}>
                <Task task_id={post.id}/>
            </CardActions>
      </Card>
    </Grid>
  );
}
