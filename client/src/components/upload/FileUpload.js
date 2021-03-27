import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardMedia, CardContent, Grid } from '@material-ui/core';
import mimematch from 'mime-match';

function FileUpload(props) {

    const [state, setState] = useState({
        selectedFiles: undefined,//현재 올린 파일들
        uploadFiles: []//전체 올린 파일들. 여러번 올릴 경우 합쳐짐.
    });
    let uploadFiles = state.uploadFiles;
    function image_check(files) {
        setState({
            selectedFiles: files
        });
        for (var i = 0; i < files.length; i++) {
            const file = files[i];

            //const image_type = ['image/gif', 'image/jpeg', 'image/png'];


            const image_type = props.accept;
            //console.log(file.type);

            if (file.size >= props.maxsize) {
                alert("가능한 업로드 크기를 넘어갔습니다.");
                continue;
            }
            console.log(props.accept.filter(mimematch(file.type)));
            //if (image_type.includes(file.type)) {
            if (props.accept.filter(mimematch(file.type)).length) {
                const arr = uploadFiles;
                //console.log(state.upload);
                const size = arr.push(file);//push하고 size크기가 return되어 들어감
                setState({
                    uploadFiles: arr
                })
                preview(file, size - 1);
            } else {
                alert("이미지 파일만 업로드 할 수 있습니다.");
                continue;
            }
        }
        //console.log(files);
    }

    function preview(file, idx) {
        const reader = new FileReader();
        reader.onload = function (f, idx) {
            return function (e) {
                uploadFiles[idx].result = e.target.result
                setState({
                    uploadFiles: uploadFiles
                });
            }
        }(file, idx);
        reader.readAsDataURL(file);
    }

    function selectFile(event) {
        image_check(event.target.files);
        //if(event.target.files[0])

    }

    function upload() {
        let currentFile = state.selectedFiles[0];
        //업로드
    }
    let selectedFiles = state.selectedFiles;




    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        cover: {
            width: 151,
        },
    }));

    const classes = useStyles();
    return (
        <>
            <label htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={selectFile.bind(this)}
                    multiple={props.multiple == true ? true : false} />
                <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span" >
                    파일 선택
                </Button>
            </label>
            <div className="file-name">
                {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
            </div>
            <Grid container padding={3}>
                {uploadFiles && uploadFiles.map((file, index) => (
                    <Card key={index} className={classes.root}>
                        <CardMedia
                            className={classes.cover}
                            component='img'
                            src={file.result}
                            title="이미지업로드"
                        />
                        <CardContent className={classes.details}>
                            asdfasdf
                    </CardContent>
                    </Card>
                ))}
            </Grid>


            {
                //autoupload prop이 true일 경우 업로드 버튼을 없애고 onChange에다가 upload이벤트
            }
            {console.log(uploadFiles.length)}
            <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!(uploadFiles || uploadFiles.length)}
                onClick={upload.bind(this)}>
                업로드
            </Button>
        </>
    )
}

export default FileUpload;