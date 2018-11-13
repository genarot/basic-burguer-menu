import React,{Component} from 'react';
import classes from './Auth.css';
import {auth} from '../../store/actions'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

//Redux
import {connect} from 'react-redux'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },

    }

    // componentDidMount() {
    //     this.props.onAuth('genaro','as')
    // }
    checkValidity( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        } 
        if ( !!rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( !!rules.minLength ) {
            isValid = value.trim().length >=  rules.minLength && isValid
        }
        if ( !!rules.maxLength ) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }
        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }
        return isValid;
    }
    inputChangeHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        console.log(e.target.value);
        
        this.setState({
            controls: updatedControls
        })

    }

    submitHandler = ( evt ) => {
        evt.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value );
    }
    render() {
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {
                        Object.keys(this.state.controls).map( key => {
                            const {elementConfig,touched,value,valid,validation, elementType} = this.state.controls[key];
                            return (
                                <Input 
                                        key={key}
                                        onChange={this.handleChange} 
                                        elementType={elementType} 
                                        elementConfig={elementConfig}
                                        value={value}
                                        invalid={!valid}
                                        touched={touched}
                                        shouldValidate={!!validation}
                                        changed={(event) => this.inputChangeHandler(event, key)}/>

                            )
                        })
                    }
                    <Button btnType="Success" disabled={false}>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = ( dispatch ) => ({
    onAuth: (email, password)=> dispatch(auth( email, password ))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);