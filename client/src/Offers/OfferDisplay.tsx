import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { fetchOfferById } from '../Offers/offersSlice';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1000,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }),
);

interface MatchParams {
  id: string
}

const OfferDisplay: React.FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const match = useRouteMatch<MatchParams>('/offers/:id');

  const id = match?.params.id;

  const offer = useSelector(
    (state: RootState) => state.offers.displayedOffer
  );
    //add dispatch and offers to 2nd argument later
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id.toString()));
    }
  }, [dispatch, id]);

  // const { offers } = useSelector(
  //   (state: RootState) => state.offers
  // );
  
  // const offer = offers[0];

  if (!offer) return (
    <div>loading offer...</div>
  );

  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    window.open(`//${offer.recipeLink}`, `_blank`);
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="close">
            <Close />
          </IconButton>
        }
        title={offer.beerName}
        // subheader={offer.created}
      />
      <Divider />
      <CardMedia
        className={classes.media}
        image={'https://images.ctfassets.net/sz2xpiwl6od9/ViVjIh4AALgAXfA2/86ce8853610527d1438c72220bc13533/bb19ca64bcd7dba6922d8a0fac623ff81fed831f_sours-primer.jpg?w=1600&fm=webp'}
        title="placeholder image"
      />
      <Divider />
      <CardContent>
      <Typography color="textSecondary" component="p">
          Description:
      </Typography>
      <Typography color="textPrimary" component="p">
          {offer.description}
      </Typography>
      {offer.amount ?
      <div> 
        <Typography color="textSecondary" component="p">
            Amount offered:
        </Typography>
        <Typography color="textPrimary" component="p">
            {offer.amount}
        </Typography>
      </div>
      : null}
      {offer.packageSize ?
      <div> 
        <Typography color="textSecondary" component="p">
            Package size:
        </Typography>
        <Typography color="textPrimary" component="p">
            {offer.packageSize}
        </Typography>
      </div>
      :
      null
      }
      {offer.recipeLink ?
      <div> 
        <Typography color="textSecondary" component="p">
            Url to recipe/brewing notes:
        </Typography>
        <Link href={offer.recipeLink} onClick={handleLinkClick} component="p">
            {offer.recipeLink}
        </Link>
      </div>
      : null}
      <div> 
        <Typography color="textSecondary" component="p">
            Offer expires in:
        </Typography>
        <Typography  color="textPrimary" component="p"> 
          time created {offer.created}
        </Typography>
      </div>
      </CardContent>
      <CardActions>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        fullWidth
      >
        Message the brewer
      </Button>
      </CardActions>
    </Card>
  );
};

export default OfferDisplay;