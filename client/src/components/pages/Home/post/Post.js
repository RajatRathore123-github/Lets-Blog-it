import { useEffect, useState } from "react";
import { API } from "../../../../service/api";
import { Box, Grid } from "@mui/material";
import AllPost from "./AllPost";
import { useSearchParams, Link } from "react-router-dom";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [SearchParams] = useSearchParams();
  const category = SearchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" });
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);
  return (
    <div>
      <Grid container>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Grid key={post._id} item lg={3} sm={4} xs={12}>
              <Link
                to={`details/${post._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <AllPost post={post} />
              </Link>
            </Grid>
          );
        })
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          No Data Available
        </Box>
      )}
      </Grid>
    </div>
  );
}
