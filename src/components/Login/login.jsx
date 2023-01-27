import React, {useState} from 'react'
import {Grid,Form,Segment,Header,Button,Message} from 'semantic-ui-react'
import {auth,signInWithEmailAndPassword,onAuthStateChanged} from '../../firebase';
import "./auth.css"

function Login() {
  let user = {
    email: '',
    password: ''
}
  const [userState,setuserState]=useState(user);

  let errors = [];
  const [errorState,seterrorState]=useState(errors);

  const [isLoading,setIsLoading]=useState(false);

  const handleInput = (event) => {
    let target=event.target;
    setuserState((currentState) => {
        let currentuser={ ...currentState };
        currentuser[target.name]=target.value;
        return currentuser;
    })
}
const checkForm = () => {
  if(isFormEmpty()) {
      seterrorState((error)=>error.concat({ message: "Please fill in all fields" }));
      return false;
  }
  return true;
}
const formaterrors = () => {
  return errorState.map((error,index) => <p key={index}>{error.message}</p>)
}

const isFormEmpty = () => {
  return !userState.password.length ||
      !userState.email.length;
}
const onSubmit = (event) => {
  seterrorState(() => []);
  if (checkForm()) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth,userState.email,userState.password)
          .then(user => {
              setIsLoading(false);
              console.log(user);
          })
          .catch(serverError => {
              setIsLoading(false);
              if(serverError.code==='auth/user-not-found'){
                seterrorState((error) => error.concat({message:"User not found, please Sign Up!"}));
              }
              else if(serverError.code==='auth/wrong-password')
              {
                seterrorState((error) => error.concat({message:"Wrong Password, please check and try again."}));
              }
              else
              {
                seterrorState((error) => error.concat(serverError));
              }
              
          })

  }
  onAuthStateChanged(auth,(user) => {
    if(user) {
      window.location="/admin"; //After successful login, user will be redirected to home.html
    }
  });
}

  return <Grid verticalAlign="middle" textAlign="center" className="grid-form" >
        <Grid.Column style={{ maxWidth: '500px' }}>
          <Header inverted icon as="h1">
            Chits
          </Header>
          <br/>
            <Header inverted as="h2" style={{ padding: '10px'}}>
            Admin Login
        </Header>
            <Form onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input
                        name="email"
                        value={userState.email}
                        icon="mail"
                        iconPosition="left"
                        onChange={handleInput}
                        type="email"
                        placeholder="Email"
                    />
                    <Form.Input
                        name="password"
                        value={userState.password}
                        icon="lock"
                        iconPosition="left"
                        onChange={handleInput}
                        type="password"
                        placeholder="Password"
                    />
                </Segment>
                <Button disabled={isLoading} loading={isLoading} inverted>Login</Button>
            </Form>
            {errorState.length> 0 && <Message error>
                <h3>{formaterrors()}</h3>
            </Message>
            }
        </Grid.Column>
    </Grid>
}

export default Login
