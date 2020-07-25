import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  FormControl,
  Input,
  Link,
  Menu,
  MenuItem,
  Paper,
  InputLabel,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import ReplyIcon from "@material-ui/icons/Reply";
import ShareIcon from "@material-ui/icons/Share";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  postContainer: {
    margin: 15,
  },
  paper: {
    display: "flex",
    padding: 10,
    square: true,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  display: {
    display: "flex",
    padding: 0,
    borderRadius: 12,
    margin: 5,
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  userGrid: {
    margin: 5,
  },
  button: {
    padding: 0,
    width: 30,
    height: 30,
    fontSize: "0.6rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  buttongroup: {
    margin: 0,
    padding: 0,
  },
  moreGid: {
    maxWidth: 50,
  },
  media: {
    // media style
  },
  routerLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const menuOptions = ["edit", "delete", "report"];

class Post extends Component {
  state = {
    moreOptions: false,
    anchorEl: null,
  };

  chooseIcon = (media) => {
    switch (media) {
      case "playlist":
        return <PlaylistAddIcon />;
      case "album":
        return <AlbumIcon />;
      default:
        return <MusicNoteIcon />;
    }
  };

  goToMedia = () => {
    // TODO GOTO media
  };

  like = () => {
    this.props.toggleLike();
  };

  repost = (post) => {
    // create new post
    console.log(post);
  };

  share = (type) => {
    // TODO share spotify media
    console.log(type);
  };

  addPostMedia = (type) => {
    // TODO: add song, album, or playlist
    console.log(type);
  };

  openMoreOptions = (e) => {
    this.setState({
      moreOptions: true,
      anchorEl: e.currentTarget,
    });
  };

  closeOptions = () => {
    this.setState({
      moreOptions: false,
      anchorEl: null,
    });
  };

  render() {
    const { classes, postdata, userId } = this.props;
    return (
      <div className={classes.postContainer}>
        <Paper className={classes.paper}>
          <Grid
            item
            container
            xs={2}
            spacing={1}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.userGrid}
          >
            <Grid item>
              <Avatar
                className={classes.display}
                src={postdata.profilePic}
                alt="profile-pic"
              />
              {/* TODO add user profile picture */}
            </Grid>
            {/* TODO: change to <RouterLink> once route setup */}
            <Link className={classes.routerLink}>
              <Grid item>{postdata.username}</Grid>
            </Link>
          </Grid>
          <Grid container spacing={1}>
            <Grid
              item
              container
              xs={9}
              spacing={2}
              direction="column"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item>{this.chooseIcon(postdata.type)}</Grid>
              <Grid item>{postdata.content}</Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => this.goToMedia()}
                >
                  {postdata.media}
                </Link>
              </Grid>
              {/* TODO add media art component? */}
            </Grid>
            <Grid
              item
              container
              xs
              className={classes.moreGrid}
              justify="flex-end"
              alignItems="flex-start"
            >
              <Grid item>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(e) => this.openMoreOptions(e)}
                  className={classes.button}
                >
                  <MoreVertIcon />
                </IconButton>
              </Grid>
              <Menu
                id="options-menu"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                open={this.state.moreOptions}
                onClose={this.closeOptions}
                PaperProps={{
                  style: {
                    maxHeight: 300,
                    width: "20ch",
                  },
                }}
              >
                {menuOptions.map((option) => (
                  <MenuItem key={option} onClick={() => this.closeOptions()}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <Grid
              item
              container
              className={classes.buttongroup}
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="like"
                  aria-controls="like-post"
                  onClick={() => this.like()}
                  color={
                    postdata.usersLiked.includes(userId) ? "primary" : "default"
                  }
                >
                  {postdata.usersLiked.length}
                  <EmojiEmotionsIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="repost"
                  aria-controls="repost-post"
                  onClick={() => this.repost(postdata)}
                >
                  <ReplyIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="share"
                  aria-controls="share-post"
                  onClick={() => this.share(postdata)}
                >
                  <ShareIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="small"
                  aria-label="add"
                  aria-controls="add-media"
                  onClick={() => this.addPostMedia(postdata)}
                >
                  <LibraryAddIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Divider />
        <Grid>
          <Accordion
            defaultExpanded={false}
            style={{
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading} color={"primary"}>
                  Comments
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <ul className={classes.column}>
                <li>Comment 1</li>
              </ul>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-basic">
                  Leave a comment below
                </InputLabel>
                <Input
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </FormControl>
              <div className={classes.column} />
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button size="small">Cancel</Button>
              <Button size="small" color="primary">
                Post
              </Button>
            </AccordionActions>
          </Accordion>
        </Grid>
      </div>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  postdata: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(Post);