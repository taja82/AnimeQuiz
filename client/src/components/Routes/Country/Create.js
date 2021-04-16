import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from '@material-ui/core';
import Flags from 'country-flag-icons/react/3x2';
import hasFlag from 'country-flag-icons';



function Create(props) {

    const countryname = props.data;
    const [state, setState] = useState({
        data: {}
    });

    function Flagtest(props) {
        const country = props.country;
        if (country) {
          const Flag = Flags[country.toUpperCase()];
          if(Flag) {
            return <Flag title="asdf" style={{ width: 50 }} />
          } else {
              return null
          }
          
        } else {
          return <div></div>
        }
      }

    const form = useRef(null);

    function handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(name == "country_code") {
            console.log(value.length >= 2);
            value = value.replace(/[^A-za-z]/gi, '');
        }
        setState({
            [name]: value
        });
    }

    /*function submit(event) {
        event.preventDefault();
        props.onSubmit(state);
    }*/
    const [country, setCountry] = useState();

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
        console.log(props);
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
                alert("에러가 발생했습니다");
            } else {
                alert("추가가 완료되었습니다");
                props.open(false);
            }
        });
    }

    let country_code = state.country_code || '';

    return (
        <form ref={form} noValidate autoComplete="off" onSubmit={submit} name="form">
            <TextField fullWidth id="country" label="국가 이름" name="country" defaultValue={countryname || ''} onChange={handleInputChange}/>
            <TextField fullWidth id="country_code" label="국가 코드" name="country_code" helperText="아이콘 표시와 국가 구분을 위해 정확한 2자리 국가코드를 입력해 주세요" value={country_code} onChange={handleInputChange} />
            <Flagtest country={country_code} />
            {!props.data ? <Button variant="contained" component="span">추가</Button> : ""}
            {/*data값이 없을 경우에만. 즉 다른 곳을 거치지 않고 나오는 경우 추가버튼이 표시됨.*/}
        </form>
    )
}

export default Create;