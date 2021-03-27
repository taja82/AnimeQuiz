import React, { Component, useState, forwardRef, useRef, useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Chip } from '@material-ui/core'
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core/styles";
import FileUpload from "../../upload/FileUpload";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

//import * as Flags from "material-ui-flags";
import Flags from 'country-flag-icons/react/3x2';
const theme = unstable_createMuiStrictModeTheme();


const kuroshiro = new Kuroshiro();
kuroshiro.init(new KuromojiAnalyzer({ dictPath: "/jp/dict" }));

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function Create(props) {
  useEffect(() => {
    fetch("/country", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(response => {
      let result = response.result;
      if (response.response.resultCode !== 1) {
        alert("데이터를 가져오는 중 에러가 발생했습니다");
      } else {
        
        result.unshift({
          country: "추가하기",
          country_code: ""
        });
        setState({
          countries: result
        });
        console.log(countries)
      }
    });
  },[])

  //const ref = useRef(null);
  const inputRef = useRef(null);

  const onClick = () => {
    console.log('INPUT VALUE: ', inputRef.current?.value);
  }

  const onClickFocus = () => {
    console.log('Focus input');
    inputRef.current?.focus();
  }

  const [state, setState] = useState({
    images: [],
    jpromi: '',
    result: '',
    modalopen: false,
    countries: []
  });

  function handleChange(files) {
    setState({
      images: files
    });
    console.log(state.images);
  }

  function submit() {
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
        setState({
          result: response.result
        });
      }
      console.log(state.countries);
    });
  }



  /*componentDidMount() {
    fetch("/anime/tags", {
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
  }*/

  const classes = useStyles()
  //const { selectedDate } = this.props;
  const tags = [
    "치유물", "러브코메디", "하렘", "일상", "이세계", "액션", "판타지"
  ];

  function Flagtest(props) {
    const country = props.country;
    const Flag = Flags[country.toUpperCase()];
    return <Flag title="asdf" style={{ width: 50 }} />
  }
//{ code: '', label: "새로 추가하기" },


let countries = state.countries;


  let modalopen = state.modalopen;

  const handleOpen = () => {
    setState({ modalopen: true });
  };

  const handleClose = () => {
    setState({ modalopen: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: 20, padding: 30 }}>
        <form noValidate autoComplete="off" className={classes.root}>
          <TextField fullWidth id="titleko" label="한글 제목" name="titleko" />
          <TextField fullWidth id="titlejp" label="일어 제목"
            name="titlejp"
            helperText="제목이 영어인 경우 영어 그대로 입력해 주세요."
            onChange={
              (event) => {
                kuroshiro.convert(event.target.value, { to: "romaji", mode: "spaced", romajiSystem: "passport" })
                  .then(result => {
                    console.log(result);
                    setState({
                      jpromi: result
                    });
                    console.log(state);
                  })
              }
            } />
          <TextField fullWidth name="titleromi" helperText="일어 제목이 영어 독음으로 자동으로 변환된 결과입니다. 잘 못되었거나, 문제가 있으면 수정해 주세요." id="titleromi" label="로마자 제목" value={state.jpromi || ''} />
          <TextField fullWidth id="titleshort" name="titleshort" label="한글 축약" helperText="가장 대중적으로 불리는 축약 제목을 적어주시면 됩니다.나중에 퀴즈 시에 한글 이름과 같이 뜨게 되어 빠르게 입력할 수 있도록 제공합니다." />
          <TextField fullWidth multiline id="description" name="description" label="설명" />
          시리즈
          <TextField fullWidth multiline id="seriesnum" name="seriesnum" label="시리즈 순서" />
          제작사
          감독

          <Autocomplete
            autoSelect={true}
            disableCloseOnSelect
            fullWidth
            multiple
            id="tags-outlined"
            options={tags}
            noOptionsText="항목 없음"
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="태그"
                placeholder="태그 선택"
              />
            )}
          />
          <Autocomplete
            fullWidth
            id="country-select-demo"
            noOptionsText="항목 없음"
            options={countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => {console.log(option);return option.country}}
            renderOption={(option) => {
              if (option.country_code) {
                return (
                  <React.Fragment>
                    <Flagtest country={option.country_code} />
                    {option.country}
                  </React.Fragment>
                )
              } else {
                return (
                  <div>
                    {option.country_code}
                  </div>
                )
              }
            }}
            onChange={(event, value) => {
              if (!value.country_code) {
                //handleOpen();
                setState({ modalopen: true });
              }
            }}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  label="제작국가"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              </div>


            )}
          />
          <input
            accept="image/*"
            name="files[]"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <div>
            <input ref={inputRef} />
            <button type="button" onClick={onClick}>Log value</button>
            <button type="button" onClick={onClickFocus}>Focus on input</button>
          </div>
          <FileUpload multiple={true} accept={['image/*', 'video/*']} autoupload={false} multipleupload={true} maxsize={1024 * 1024 * 5}></FileUpload>
          <input type="submit" value="업로드" />

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={modalopen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modalopen}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
              </div>
            </Fade>
          </Modal>

        </form>

      </div>
    </ThemeProvider>

  )

}

export default Create;
