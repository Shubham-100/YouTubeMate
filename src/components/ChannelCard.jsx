import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, marginTop }) => (
  <Box
    sx={{ boxShadow: "none", borderRadius: "10px", border: "2px solid black" }}
  >
    <Link to={`/channel/${channelDetail?.id.channelId}`}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          color: "white",
          mt: marginTop,
        }}
      >
        <CardMedia
          image={
            channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
          }
          alt={channelDetail?.snippet?.title}
          sx={{
            borderRadius: "50%",
            height: "180px",
            width: "180px",
            mb: 2,
            border: "1px solid black",
          }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          color="black"
          alignItems="center"
        >
          {channelDetail?.snippet?.title}
          <CheckCircle sx={{ fontSize: "16px", color: "gray", ml: "5px" }} />
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography>
            {parseInt(
              channelDetail?.statistics?.subscriberCount
            ).toLocaleString()}
            Subscribers
          </Typography>
        )}
      </CardContent>
    </Link>
  </Box>
);
export default ChannelCard;
