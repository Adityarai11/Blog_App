import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();

  console.log("BlogCard props:", {
    title,
    description,
    image,
    username,
    time,
    id,
    isUser,
  });

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card
      sx={{
        width: "90%",
        maxWidth: 700,
        margin: "24px auto",
        borderRadius: 4,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="flex-end" px={2} pt={2}>
          <IconButton onClick={handleEdit} aria-label="edit blog">
            <ModeEditIcon color="primary" />
          </IconButton>
          <IconButton onClick={handleDelete} aria-label="delete blog">
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], textTransform: "uppercase" }}>
            {username?.charAt(0).toUpperCase() || "U"}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={700}>
            {username || "Unknown"}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {formatDate(time)}
          </Typography>
        }
      />

      <CardMedia
        component="img"
        height="240"
        image={image}
        alt="Blog visual"
        sx={{
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/700x240?text=No+Image";
        }}
      />

      <CardContent sx={{ px: 3, pb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 700, color: "#333" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
