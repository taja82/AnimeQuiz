import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CountryCreate from './Routes/Country/Create';
import { Button } from '@material-ui/core'

function AddDialog(props) {
  const [state, setState] = useState({
    submitFromOutside: false
  });

  const create = useRef();

  function submitCustomForm() {
    setState({
      submitFromOutside: true,
    })
  }

  function AddSubmit(data) {
    setState(data);
    console.log(data);
  }

  function Add(event) {
    /*console.log(true);
    fetch("/country", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    }).then(response => response.json()).then(response => {
      let result = response.result;
      if (response.response.resultCode !== 1) {
        alert("데이터를 가져오는 중 에러가 발생했습니다");
      } else {
        alert("업로드가 완료되었습니다");
      }
    });*/
    //create.getWrappedInstance().submit();
    console.log(create);
  }


  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{props.titlemessage}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.contentmessage}
        </DialogContentText>
        <CountryCreate data={props.data} submitFromOutside={state.submitFromOutside} onSubmit={AddSubmit} open={(close) => { props.open(close) }}></CountryCreate>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          취소
            </Button>
        <Button color="primary" onClick={submitCustomForm}>
          추가
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDialog;