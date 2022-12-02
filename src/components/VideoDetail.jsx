import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { CheckCircle, ThumbUp, Visibility } from "@mui/icons-material";

import Videos from "./Videos";
import { fetchFromApi } from "../utils/fetchFromApi";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return "Loading";

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              playing={true}
              className="react-player"
            />
            <Typography variant="h5" fontWeight="bold" p={1}>
              {videoDetail?.snippet?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="black"
                >
                  <span style={{ marginBottom: 10 }}>Presented By</span>{" "}
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {videoDetail?.snippet?.channelTitle}
                  </span>{" "}
                  <CheckCircle
                    sx={{ fontSize: "16px", color: "black", ml: "5px" }}
                  />
                </Typography>
                <Typography>
                  {parseInt(
                    videoDetail?.snippet?.channelId?.statistics?.subscriberCount
                  ).toLocaleString()}
                  Subscribers
                </Typography>
              </Link>
              <Stack direction="row" gap="5px" alignItems="center">
                <Typography color="black" variant="body1" sx={{ mt: -5 }}>
                  {parseInt(
                    videoDetail?.statistics?.viewCount
                  ).toLocaleString()}{" "}
                  <Visibility
                    sx={{ fontSize: "18px", color: "black", ml: "2px" }}
                  />
                </Typography>
                <Typography color="black" variant="body1" sx={{ mt: -5 }}>
                  {parseInt(
                    videoDetail?.statistics?.likeCount
                  ).toLocaleString()}{" "}
                  <ThumbUp
                    sx={{
                      fontSize: "18px",
                      color: "black",
                      ml: "2px",
                    }}
                  />
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
