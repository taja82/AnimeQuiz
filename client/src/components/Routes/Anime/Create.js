import React, { Component } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Chip } from '@material-ui/core'
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import endOfQuarter from 'date-fns/endOfQuarter';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {DropzoneArea} from 'material-ui-dropzone'

const kuroshiro = new Kuroshiro();
kuroshiro.init(new KuromojiAnalyzer({ dictPath: "/jp/dict" }));

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
  },
});

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      jpromi: '',
      
    }
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

  submit() {
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

  fileupload = ({ target }) => {
    let selectedFiles = this.bookCoversField.files;
    console.log(selectedFiles);
    console.log(target);
    let images = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      images.push(selectedFiles.item(i));
    }
    this.setState({ images: images }, () => {
      this.bookCoversField.value = null;
    })
    const fileReader = new FileReader();
    if (target.accept.includes('image')) {

    } else {
      alert("이미지 파일만 업로드 할 수 있습니다");
    }

    /*fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
        this.setState((prevState) => ({
            [name]: [...prevState[name], e.target.result]
        }));
    };*/
  }
  renderQuarterPicker = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;
  }

  render() {
    const { classes } = this.props;
    //const { selectedDate } = this.props;
    const tags = [
      "치유물", "러브코메디", "하렘", "일상", "이세계", "액션", "판타지"
    ]

    const { result } = this.state;

    const { selectedDate, handleDateChange } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    this.setState({
                      jpromi: result
                    });
                    console.log(this.state);
                  })
              }
            } />
          <TextField fullWidth name="titleromi" helperText="일어 제목이 영어 독음으로 자동으로 변환된 결과입니다. 잘 못되었거나, 문제가 있으면 수정해 주세요." id="titleromi" label="로마자 제목" value={this.state.jpromi} />
          <TextField fullWidth id="titleshort" name="titleshort" label="한글 축약" helperText="가장 대중적으로 불리는 축약 제목을 적어주시면 됩니다.나중에 퀴즈 시에 한글 이름과 같이 뜨게 되어 빠르게 입력할 수 있도록 제공합니다." />
          <TextField fullWidth multiline id="description" name="description" label="설명" helperText="가장 대중적으로 불리는 축약 제목을 적어주시면 됩니다.나중에 퀴즈 시에 한글 이름과 같이 뜨게 되어 빠르게 입력할 수 있도록 제공합니다." />

          <Autocomplete
            multiple
            id="tags-outlined"
            options={tags}
            getOptionLabel={(option) => option}
            //defaultValue={[top100Films[13]]}
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

          <input
            accept="image/*"
            name="files[]"
            ref={field => (this.bookCoversField = field)}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={this.fileupload}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          {/*<DatePicker
            label="분기선택"
            views={["year", "month"]}
            value={selectedDate}
            onChange={this.handleWeekChange}
            renderDay={this.renderWrappedWeekDay}
            labelFunc={this.formatWeekSelectLabel}
          />*/}
          <DatePicker
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
      />
        </form>

        <DropzoneArea
  acceptedFiles={['image/*']}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) => console.log('Files:', files)}
/>
      </div>
      </MuiPickersUtilsProvider>
    );
  }


}
export default withStyles(styles)(Create);
