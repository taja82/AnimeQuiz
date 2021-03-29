import React, { useState, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';


function Create(props) {
    const countryname = props.data;
    const [state, setState] = useState({
        data: {}
    });

    useEffect(() => {
        if (props.submitFromOutside) {
            submit();
        }
    });

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({
            [name]: value
        });
        console.log(state);
    }

    /*function submit(event) {
        event.preventDefault();
        props.onSubmit(state);
    }*/

    function submit(event) {
        console.log(true);
        fetch("/country", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(set)
        }).then(response => response.json()).then(response => {
            let result = response.result;
            if (response.response.resultCode !== 1) {
                alert("데이터를 가져오는 중 에러가 발생했습니다");
            } else {
                alert("업로드가 완료되었습니다");
            }
        });
    }
    function load(event) {
        console.log(event.target.value);
    }

    return (
        <form noValidate autoComplete="off" onSubmit={submit} name="form">
            <TextField fullWidth id="countryname" label="국가 이름" name="countryname" defaultValue={countryname || ''} onChange={handleInputChange}/>
            <TextField fullWidth id="countrycode" label="국가 코드" name="countrycode" helperText="아이콘 표시와 국가 구분을 위해 정확한 2자리 국가코드를 입력해 주세요" onChange={handleInputChange} />
            {!props.data ? <Button variant="contained" component="span">추가</Button> : ""}
            {/*data값이 없을 경우에만. 즉 다른 곳을 거치지 않고 나오는 경우 추가버튼이 표시됨.*/}
        </form>
    )
}

export default Create;