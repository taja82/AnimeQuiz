import React from 'react';

class Login extends Component {
    render () {
        return(
            <div className="loginWrap"> 
                <h1>LOGIN</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="id" placeholder="ID"></input><br></br>
                    <input type="password" name="pwd" placeholder="PASSWORD"></input><br></br>
                    <input type="submit" value="LOGIN"/>
                </form>
            </div>
        );
    }
}
