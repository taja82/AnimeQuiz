/*import React from "react";

function View({ match }) {
  return (
    <>
      <div>{match.params.num}</div>
    </>
  );
}

export default View;*/

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
    console.log(props.match.params.num);
    super(props);
    this.state = {
      num: props.match.params.num,
      result: []
    }
  }

  componentDidMount() {
    fetch("/anime/" + this.state.num, {
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
    console.log(result);
    return (
      <div style={{ marginTop: 20, padding: 30 }}>
        <Card id={result.id}>
          <CardActionArea>
            <CardMedia component="img" alt="animeimage" image={(result.coverimg && result.coverimg[0].src !== "./public/upload/anime/coverimg") ? result.coverimg[0].src : 'https://i.stack.imgur.com/y9DpT.jpg'} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {result.title ? result.title.ko : "모름"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">{result.description ? result.description : "설명이 없습니다."}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => this.props.history.push('./anime/view/' + result._id)}>
              Share
                  </Button>
            <Button size="small" color="primary">
              Learn More
                  </Button>
          </CardActions>
        </Card>
      </div>
    );
  }


}
export default List;
