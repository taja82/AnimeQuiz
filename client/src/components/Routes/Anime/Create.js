import React, { useState, useEffect } from "react";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core'
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import FileUpload from "../../upload/FileUpload";
import AddDialog from "../../AddDialog";

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';



//import * as Flags from "material-ui-flags";
import Flags from 'country-flag-icons/react/3x2';

const filter = createFilterOptions();

//kuroshiro 라이브러리 사전 로딩. 일어를 영어 로마자로 만들기 위해 사용됨.
const kuroshiro = new Kuroshiro();
kuroshiro.init(new KuromojiAnalyzer({ dictPath: "/jp/dict" }));

//스타일 지정
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


//이 컴포넌트의 틀과 항목 부분을 분리하여 관리할 예정. 예를 들어 다른 항목 추가에서 애니 추가과정에서 원하는 항목이 없을 경우
//바로 추가할 수 있게 만들려고 하는데 이럴 때 아래에 해당하는 내용을 그대로 들고와야되기 때문에임,
function Create(props) {
  const [state, setState] = useState({
    images: [],
    jpromi: '',
    result: '',
    countries: [],
    titlemessage: "",
    contentmessage: ""
  });

  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);


  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    year: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };

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
        setState({
          countries: result
        });
        console.log(countries)
      }
    });
  }, [])
  console.log(state);
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
      console.log(countries);
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
    if (country) {
      const Flag = Flags[country.toUpperCase()];
      return <Flag title="asdf" style={{ width: 50 }} />
    } else {
      return <div></div>
    }
  }
  //{ code: '', label: "새로 추가하기" },

  let countries = state.countries;
  let modalopen = state.modalopen;

  return (
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
          value={value}
          id="country-select-demo"
          noOptionsText="항목 없음"
          options={countries}
          classes={{
            option: classes.option,
          }}
          getOptionLabel={(option) => {
            if (typeof option == 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.country
          }}
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
                  {option.country}
                </div>
              )
            }
          }}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setTimeout(() => {
                toggleOpen(true);
                
                setDialogValue({
                  data: newValue,
                });
              });
            } else if (newValue && newValue.inputValue) {
              setState({titlemessage:"국가 추가", contentmessage: "국가를 추가하기 위해서 아래 정보를 입력해 주세요"})
              toggleOpen(true);
              setDialogValue({
                data: newValue.inputValue,
              });
            } else {
              setDialogValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            console.log(filtered);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                country: `"${params.inputValue}" 추가`,
              })
            }
            return filtered;
          }}
          renderInput={(params) => (
            <div>
              {console.log(true)}
              <TextField
                {...params}
                label="제작국가"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  
                }}
              />
            </div>
          )}
          selectOnFocus
          handleHomeEndKeys
          freeSolo
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
        <FileUpload multiple={true} accept={['image/*', 'video/*']} autoupload={false} multipleupload={true} maxsize={1024 * 1024 * 5}></FileUpload>
        <input type="submit" value="업로드" />

        <AddDialog open={open} data={dialogValue.data} handleClose={handleClose} titlemessage={state.titlemessage} contentmessage={state.contentmessage}></AddDialog>
      </form>
    </div>
  )

}

export default Create;
