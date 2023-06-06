import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Language, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

export default function About(){
    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Rajat Rathore</Typography>
                <Text variant="h5">I am a second-year BTech student at Harcourt Butler Technical University, Kanpur. I am an aspiring full-stack web developer and software engineer with a passion for solving complex problems and learning new things. I have a strong foundation in computer science, with experience in a variety of programming languages and technologies<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/RajatRathore123-github" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                     Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="#" color="inherit" target="_blank">
                        <Language/>
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}













