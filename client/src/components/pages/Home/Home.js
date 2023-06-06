import {Grid} from "@mui/material";
import Banner from "../Banner/Banner";
import Categories from "../Home/Categories";
import Post from "./post/Post";
export default function Home() {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid item xs={12} sm={10} lg={10}>
            <Post/>
        </Grid>
      </Grid>
    </>
  );
}
