import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { CardActionArea, Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
  }

  componentDidMount() {
    fetch("/anime", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(response => {
      if (response.response.resultCode !== 1) {
        alert("데이터를 가져오는 중 에러가 발생했습니다");
      } else {
        console.log(response.result)
        this.setState({
          result: response.result
        })
      }
    });
  }

  render() {
    const { result } = this.state;
    return (
      <div style={{ marginTop: 20, padding: 30 }}>
        <Button variant="contained" color="primary" onClick={() => this.props.history.push('./anime/create')}>추가하기</Button>
        <Grid container spacing={5} justify="center">
          {result.map((post, index) => (
            <Grid item xs key={index}>
              <Card key={index} id={post.id} onClick={() => this.props.history.push('./anime/view/' + post._id)}>
                <CardActionArea>
                  <CardMedia component="img" alt="animeimage" image={(post.coverimg && post.coverimg[0].src !== "./public/upload/anime/coverimg") ? post.coverimg[0].src : 'https://i.stack.imgur.com/y9DpT.jpg'} title={post.title.ko} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title ? post.title.ko : "모름"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{post.description ? post.description : "설명이 없습니다."}</Typography>
                  </CardContent>
                </CardActionArea>
                {/*<CardActions>
                  <Button size="small" variant="contained" color="primary">
                    더 보기
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>*/}
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }


}
export default List;
