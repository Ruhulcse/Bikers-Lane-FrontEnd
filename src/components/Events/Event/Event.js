import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { attendEvent, deleteEvent } from '../../../actions/events';

const Event = ({ event, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [attending, setAttending] = useState(event?.attending);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const isAttendingEvent = event.attending.find((attending) => attending === userId);

  const handleAttend = async () => {
    dispatch(attendEvent(event._id));

    if (isAttendingEvent) {
      setLikes(event.attending.filter((id) => id !== userId));
    } else {
      setLikes([...event.attending, userId]);
    }
  };

  const Attending = () => {
    if (attending.length > 0) {
      return likes.find((attending) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{attending.length > 2 ? `You and ${attending.length - 1} others` : `${attending.length} like${attending.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{attending.length} {attending.length === 1 ? 'attend' : 'attending'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openEvent = () => {
    history.push(`/events/${event._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6} alt="">
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openEvent}
      >
        <CardMedia className={classes.media} image={event.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={event.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{event.name}</Typography>
          <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === event?.creator || user?.result?._id === event?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(event._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{event.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{event.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{event.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={attendEvent}>
          <Likes />
        </Button>
        {(user?.result?.googleId === event?.creator || user?.result?._id === event?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteEvent(event._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Event;
