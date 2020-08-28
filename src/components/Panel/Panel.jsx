import React from "react";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import { useSelector } from "react-redux";
import styles from "./Panel.module.css";

export const Panel = (props) => {
  const subredditName = useSelector((state) => state.posts.subredditName);
  const subredditInfo = useSelector((state) => state.posts.subredditInfo);
  const currentSortButton = useSelector((state) => state.posts.sortBy);

  return (
    <>
      <div className={styles.SubredditBanner}>
        <Typography variant="h2">{subredditInfo.title}</Typography>
        <Typography variant="body1">
          {subredditInfo.display_name_prefixed}
        </Typography>
        <Typography variant="h6">{subredditInfo.public_description}</Typography>
        <img src={subredditInfo.icon_img} alt={subredditInfo.icon_img} />
        <hr />
      </div>

      <div className={styles.SortArea}>
        <span
          style={{
            fontWeight: "700",
            display: "block",
            fontSize: "0.8rem",
            margin: '5px 0'
          }}
        >
          SORT POSTS BY:
        </span>
        <ButtonGroup
          color="secondary"
          aria-label="outlined primary button group"
        >
          {["hot", "top", "new", "controversial"].map((sortButton) => (
            <Button
              key={sortButton}
              variant={
                currentSortButton === sortButton ? "contained" : "outlined"
              }
              onClick={() => props.sort(subredditName, sortButton)}
            >
              {sortButton}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </>
  );
};

export default Panel;
