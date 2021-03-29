import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from '@material-ui/core';


function Create(props) {
    const countryname = props.data;
    const [state, setState] = useState({
        data: {}
    });

    

    const form = useRef(null);

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({
            [name]: value
        });
    }

    /*function submit(event) {
        event.preventDefault();
        props.onSubmit(state);
    }*/
    const [country, setCountry] = useState({aa:false});

    useEffect(() => {
        console.log("투루");
        if (props.submitFromOutside) {
            console.log("투루ff");
            submit();
        }
    },[props.submitFromOutside]);

    function submit() {
        //console.log(form.current);
        //const data = new FormData(form.current);
        //console.log(data);
        console.log(form.current.country.value);
        console.log(form.current.country_code.value);
        //console.log(event);
        setCountry({
            country: form.current.country.value,
            country_code: form.current.country_code.value
        })
        console.log(country);
        fetch("/country", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: form.current.country.value,
                country_code: form.current.country_code.value
            })
        }).then(response => response.json()).then(response => {
            let result = response.result;
            if (response.response.resultCode !== 1) {
                alert("데이터를 가져오는 중 에러가 발생했습니다");
            } else {
                alert("업로드가 완료되었습니다");
                props.open(false);
            }
        });
    }
    function load(event) {
        console.log(event.target.value);
    }

    return (
        <form ref={form} noValidate autoComplete="off" onSubmit={submit} name="form">
            <TextField fullWidth id="country" label="국가 이름" name="country" defaultValue={countryname || ''} onChange={handleInputChange}/>
            <TextField fullWidth id="country_code" label="국가 코드" name="country_code" helperText="아이콘 표시와 국가 구분을 위해 정확한 2자리 국가코드를 입력해 주세요" onChange={handleInputChange} />
            {!props.data ? <Button variant="contained" component="span">추가</Button> : ""}
            {/*data값이 없을 경우에만. 즉 다른 곳을 거치지 않고 나오는 경우 추가버튼이 표시됨.*/}
        </form>
    )
}

export default Create;