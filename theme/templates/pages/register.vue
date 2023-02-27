<template>
    <fdk-accounts class="wrapper" v-slot="accountData">
        <AuthRoot />
        <loading v-show="IntervalID"/>
        <div v-show="!IntervalID">
            <div v-if="!showVerifyBoth" class="register-container">
            <div class="register-heading font-header">
                <p>Create new account</p>
            </div>
            <div class="registerForm">
                <div class="firstName">
                    <label for="first" class="input-title font-body">Enter First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        required=""
                        v-model="formData.first_name.value"
                        @input="validateFname"
                        @keyup.enter="registerButtonClick(accountData)"
                        placeholder="First name"
                    />
                </div>
                <div class="lastName">
                    <label for="first" class="input-title font-body">Enter Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        required=""
                        v-model="formData.last_name.value"
                        @input="validateLname"
                        @keyup.enter="registerButtonClick(accountData)"
                        placeholder="Last Name"
                    />
                </div>
                <div class="gender-radio-container">
                    <label class="radio-container font-body"
                    >Male<input
                            type="radio"
                            name="gender"
                            value="male"
                            checked
                            v-model="formData.gender.value"/><span
                            class="checkmark"
                        ></span
                    ></label>
                    <label class="radio-container font-body"
                        >Female<input
                            type="radio"
                            name="gender"
                            value="female"
                            v-model="formData.gender.value"/><span
                            class="checkmark"
                        ></span></label
                    ><label class="radio-container font-body"
                        >Other<input
                            type="radio"
                            name="gender"
                            value="unisex"
                            v-model="formData.gender.value"/><span
                            class="checkmark"
                        ></span
                    ></label>
                </div>
                <div class="Mobile">
                    <mobile-input @change="onChange" ref="mobileInput" @enter_click_event="registerButtonClick(accountData)" />
                </div>
                <div class="emailID" :class="{ 'resgister-email': true, 'error-input': formData.email.showError }">
                    <label for="first" class="input-title font-body">Email id</label>
                    <input
                        type="text"
                        name="email"
                        required=""
                        v-model="formData.email.value"
                        @input="validateEmail"
                        @keyup.enter="registerButtonClick(accountData)"
                        placeholder="abcd@gmail.com"
                    />
                    <br />
                    <p class="error-text">
                        {{ formData.email.errorMessage }}
                    </p>
                </div>
                <div class="password" :class="{ 'resgister-password-input': true, 'error-input': formData.password.showError }">
                    <label class="input-title font-body" for="username">Password</label>
                    <input
                        :type="isPasswordShow ? 'text' : 'password'"
                        name="password"
                        required=""
                        v-model="formData.password.value"
                        @input="validatePassword"
                        @keyup.enter="registerButtonClick(accountData)"
                        placeholder="Enter Password"
                    />
                    <br />
                    <p class="error-text">
                        {{ formData.password.errorMessage }}
                    </p>
                </div>
                <div class="confirmPassword" :class="{ 'register-confirm-password-input': true, 
                        'error-input': formData.confirmPassword.showError }">
                    <label class="input-title font-body" for="username">Confirm password</label>
                    <input
                        :type="isPasswordShow ? 'text' : 'password'"
                        name="confirmPassword"
                        required=""
                        v-model="formData.confirmPassword.value"
                        @input="validateConfirmPassword"
                        @keyup.enter="registerButtonClick(accountData)"
                        placeholder="Confirm Password"
                    />
                    <br />
                    <div style = "text-align-last: auto;">
                        <p class="error-text">
                            {{ formData.confirmPassword.errorMessage }}
                        </p>
                    </div>
                </div>
                <div class="login-alert alert-error" v-if="isInValidForm">
                    <span class="alert-message">{{ inValidFormErrorMsg }}</span>
                </div>
                <div class="RegButton">
                    <button class="register-btn secondary-btn" @click="registerButtonClick(accountData)" type="submit">
                        REGISTER
                    </button>
                </div>
                <div class="SectionSecond">
                    <div class="register font-body">
                        <fdk-link :link= "`/auth/login`">
                            <p>HAVE ACCOUNT ? - LOGIN</p>
                        </fdk-link>
                    </div>
                    <div>
                        <fdk-accounts v-slot="accountsData">
                            <div class="facebook-login" v-if="isFacebookButton">
                                <button @click="accountsData.facebook.login" class="facebook-login-btn" v-if="!isFacebookLoading">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/facebook-262-721949.png?f=avif" alt="facebook"  width="18px" height="18px"/>
                                    <span>Sign in with Facebook</span>
                                </button>
                            </div>
                            <!-- <div class="google-login" v-if="isGoogleButton">
                                <div class="gClass">
                                    <div ref="googlebuttonref" data-width="360" data-height="48" data-logo_alignment="center"></div>                       
                                </div>
                            </div> -->
                        </fdk-accounts>
                    </div>
                    <div>
                        <term-privacy />
                    </div>
                </div>
            </div>
            </div>
            <div v-else class="register-container">
                <verify-both :isShowVerifyEmail="isShowVerifyEmail" :isShowVerifyMobile="isShowVerifyMobile" :verifyBothData="verifyBothData" @IntervalID="dataOTP"/>
                <div class="SectionSecond2">
                    <div>
                        <fdk-accounts v-slot="accountsData">
                            <div class="facebook-login" v-if="isFacebookButton">
                                <button @click="accountsData.facebook.login" class="facebook-login-btn" v-if="!isFacebookLoading">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/facebook-262-721949.png?f=avif" alt="facebook"  width="18px" height="18px"/>
                                    <span>Sign in with Facebook</span>
                                </button>
                            </div>
                            <!-- <div class="google-login" v-if="isGoogleButton">
                                <div class="gClass">
                                    <div ref="googlebuttonref" data-width="360" data-height="48" data-logo_alignment="center"></div>                       
                                </div>
                            </div> -->
                        </fdk-accounts>
                    </div>
                    <div>
                        <term-privacy />
                    </div>
                </div>
            </div>
        </div>
    </fdk-accounts>
</template>

<style lang="less" scoped>
.wrapper {
    width: 1440px;
    padding-top: 80px;
    .register-container {
        margin-left: auto;
        margin-right: auto;
        width: 456px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.25);
        .register-heading {
            color: @TextHeading;
            font-weight: 400;
            font-size: 28px;
            line-height: 32px;
            padding-top: 48px;
            text-align-last: center;
            @media @tablet {
                font-size: 24px;
                line-height: 28px;
            }
            @media @mobile {
                font-size: 24px;
                line-height: 28px;
                text-align-last: auto;
                padding-left: 48px;
            }
        }
        .registerForm {
            padding-top: 32px;
            text-align-last: center;
            .firstName, .lastName, .emailID, .password, .confirmPassword {
                position: relative; 
            }
            input {
                border: 1px solid grey;
                border-radius: 2px;
                position: relative;
                width: 345px;
                margin: 10px;
                line-height: 6ex;
                padding-left: 15px;
                height: 48px;
                text-align-last: left;
            }
            label {
                position: absolute;
                top: 0.5ex;
                z-index: 1;
                left: 5em;
                background-color: white;
                padding: 4 8px;
            }
            .input-title {
                font-size: 12px;
                font-weight: 400;
                color: @TextBody;
                line-height: 16px;
                @media @tablet {
                    font-size: 12px;
                }
            }
            .gender-radio-container {
                gap: 12px;
                display: flex;
                margin-left: -29px;
                padding-bottom: 8px;
                .radio-container {
                    font-size: 15px;
                    padding-left: 29px;
                    line-height: 17px;
                    position: relative;
                    input {
                        position: absolute;
                        opacity: 0;
                        cursor: pointer;
                        width: 0px;
                    }
                    .checkmark {
                        height: 15px;
                        width: 15px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border: 1px solid #919191;
                        border-radius: 50%;
                    }
                    .checkmark:after {
                        content: '';
                        position: absolute;
                        display: none;
                        top: 3px;
                        left: 3px;
                        width: 9px;
                        height: 9px;
                        border-radius: 50%;
                        background: #919191;
                    }
                    input:checked ~ .checkmark:after {
                        display: block;
                    }
                }
            }
            .error-text {
                display: none;
            }
            .error-input {
                input {
                    border: 1px solid #fb406b;
                }   
                .error-text {
                    padding-left: 48px;
                    color: #fb406b;
                    display: inline-block;
                    font-size: 14px;
                    padding-right: 48px;
                    padding-bottom: 7px;
                    text-align-last: auto;
                    @media @tablet {
                        font-size: 11px;
                    }
                }
                label {
                    color: #fb406b;
                }
                .login-input-wrapper {
                    color: #fb406b;
                }
            }
            .login-alert {
                &.alert-error {
                    padding-left: 48px;
                    font-size: 14px;
                    color: red;
                    text-align-last: left;
                }
            }
            .RegButton {
                width: 364px;
                height: 48px;
                padding-left: 46px;
                .register-btn {
                    color: @ButtonSecondary;
                    width: 100%;
                    margin-top: 8px;
                    margin-bottom: 5px;
                    height: 44px;
                }
            }
            .SectionSecond {
                text-align-last: center;
                .register {
                    padding-top: 24px;
                    color: @ButtonLink;
                    font-size: 14px;
                    padding-left: 130px;
                    height: 20px;
                    width: 197px;
                    font-weight: 500;
                    line-height: 20px;
                    text-decoration-line: underline;
                    @media @mobile {
                        padding-left: 37px;
                    }
                }
                .facebook-login-btn {
                    display: flex;
                    column-gap: 14px;
                    align-items: center;
                    border: 2px solid black;
                    height: 48px;
                    width: 362px;
                    background-color: white;
                    img {
                        padding-left: 100px;
                    }   
                }
                .google-login {
                    height: 48px;
                    width: 360px;
                    margin-top: 12px;
                    padding-left: 48px;

                    .gClass {
                        border: 2px solid black;
                        width: 360px;
                    }
                }
                .facebook-login {
                    height: 48px;
                    width: 360px;
                    margin-top: 32px;
                    padding-left: 48px;
                }
            }
        }
        .SectionSecond2 {
            text-align-last: center;
            .facebook-login-btn {
                display: flex;
                column-gap: 14px;
                align-items: center;
                border: 2px solid black;
                height: 48px;
                width: 362px;
                background-color: white;
                img {
                    padding-left: 100px;
                }   
            }
            .google-login {
                height: 48px;
                width: 360px;
                margin-top: 12px;
                padding-left: 48px;

                .gClass {
                    border: 2px solid black;
                    width: 360px;
                }
            }
            .facebook-login {
                height: 48px;
                width: 360px;
                margin-top: 32px;
                padding-left: 48px;
            }
        }
    }
    @media @tablet {
        width: 744px;
        padding-top: 42px;
    }
    @media @mobile {
        width: 320px;
        padding-top: 32px;
    }
}
</style>

<script>
import AuthRoot from './../../global/components/auth/auth-root.vue';
import termPrivacy from './../../global/pages/auth/term-privacy.vue';
import verifyBoth from './../../global/components/auth/verify-both.vue';
import Loading from './../../global/components/common/loading.vue';


export default {
    props:["context"],
    components: {
        "auth-root": AuthRoot,
        'term-privacy': termPrivacy,
        'mobile-input': () => import('./../../global/components/auth/mobile-input.vue'),
        'verify-both': verifyBoth,
        'loading': Loading,
    },
    data() {
        return {
            formData: {
                first_name: {
                    value: '',
                    showError: false,
                    errorMessage: '',
                    validateFn: this.validateFname
                },
                last_name: {
                    value: '',
                    showError: false,
                    errorMessage: '',
                    validateFn: this.validateLname
                },
                gender: { value: 'male' },
                email: {
                    value: '',
                    showError: false,
                    errorMessage: 'Please enter valid email address',
                    validateFn: this.validateEmail
                },
                phone: {
                    value: { mobile: '', country_code: '' },
                    showError: false,
                    errorMessage: '',
                    validateFn: this.validateMobile
                },
                password: {
                    value: '',
                    showError: false,
                    errorMessage:
                        'Password must be at least 8 characters and contain at least 1 letter, 1 number and 1 special character.',
                    validateFn: this.validatePassword
                },
                confirmPassword: {
                    value: '',
                    showError: false,
                    errorMessage: 'Password does not match',
                    validateFn: this.validateConfirmPassword
                }
            },
            isInValidForm: false,
            inValidFormErrorMsg: '',
            verifyBothData: {},
            showVerifyBoth: false,
            IntervalID: true,
        }
    },
    methods: {
        dataOTP(value) {
            this.IntervalID = value;
        },
        validateFname() {
            if (this.formData.first_name.value.replace(/\s+/, '')) {
                this.formData.first_name.showError = false;
                return true;
            } else {
                this.formData.first_name.showError = true;
                return false;
            }
        },
        validateMobile() {
            this.$refs.mobileInput.isValidNumber();
            return this.isValidMobile;
        },
        validateLname() {
            if (this.formData.last_name.value.replace(/\s+/, '')) {
                this.formData.last_name.showError = false;
                return true;
            } else {
                this.formData.last_name.showError = true;
                return false;
            }
        },
        validateEmail() {
            if (
                this.platformData?.required_fields?.email?.is_required &&
                this.platformData?.required_fields?.email?.level === 'hard'
            ) {
                if (validateEmailField(this.formData.email.value)) {
                    this.formData.email.showError = false;
                    return true;
                } else {
                    this.formData.email.showError = true;
                    return false;
                }
            } else {
                this.formData.email.showError = false;
                return true;
            }
        },
        validatePassword() {
            if (this.formData.confirmPassword.value) {
                this.formData.confirmPassword.showError =
                    this.formData.password.value !==
                    this.formData.confirmPassword.value;
            }
            if (this.validatePasswordField(this.formData.password.value)) {
                this.formData.password.showError = false;
                return true;
            } else {
                this.formData.password.showError = true;
                return false;
            }
        },
        validateConfirmPassword() {
            if (
                this.formData.password.value ===
                this.formData.confirmPassword.value
            ) {
                this.formData.confirmPassword.showError = false;
                return true;
            } else {
                this.formData.confirmPassword.showError = true;
                return false;
            }
        },
        registerButtonClick(accountData) {
            let bValidForm = true,
                isValid;
            for (const property in this.formData) {
                if (property != 'gender') {
                    isValid = this.formData[property].validateFn();
                }
                bValidForm = bValidForm && isValid;
            }
            if (bValidForm) {
                this.IntervalID = true;
                this.isLoading = true;
                let body = {};
                for (const property in this.formData) {
                    if (property != 'confirmPassword')
                        body[property] = this.formData[property].value;
                }
                body['register_token'] = '';
                return accountData
                    .signUp({ user: body })
                    .then(res => {
                        this.isLoading = false;
                        this.IntervalID = false;
                        this.verifyBothData = res;
                        if(this.isShowVerifyEmail || this.isShowVerifyMobile) {
                            this.showVerifyBoth = true;
                        } else {
                            accountData.openHomePage();
                        }
                    })
                    .catch(err => {
                        this.isLoading = false;
                        this.IntervalID = false;
                        this.isInValidForm = true;
                        if (err.message) {
                            this.inValidFormErrorMsg = err.message;
                        }
                    });
            }
        },
        onChange(data) {
            this.formData.phone.value.mobile = data.mobile;
            this.formData.phone.value.country_code = data.countryCode;
            this.isValidMobile = data.isValidNumber;
        },
        validatePasswordField(value) {
            let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\|;:\'",<.>\/\?€£¥₹§±])[A-Za-z\d`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\|;:\'",<.>\/\?€£¥₹§±]{8,}$/;
            return passwordPattern.test(value);
        }
    },
    computed: {
        isShowVerifyEmail() {
            return (
                this.context?.auth_config?.register_required_fields?.email?.is_required &&
                this.context?.auth_config?.register_required_fields?.email?.level === 'hard'
            );
        },
        isShowVerifyMobile() {
            if (
                this.context?.auth_config?.register_required_fields?.mobile?.is_required &&
                this.context?.auth_config?.register_required_fields?.mobile?.level === 'hard'
            ) {
                return true;
            } else {
                return false;
            }
        },
        isGoogleLoading() {
            return this.context?.google?.loading;
        },
        isGoogleButton() {
            return this.context?.auth_config?.social?.google;
        },
        isFacebookLoading() {
            return this.context?.facebook?.loading;
            // return false;
        },
        isFacebookButton() {
            return this.context?.auth_config?.social?.facebook;
            // return true;
        }
    },
    mounted() {
        setInterval(() => {
            this.IntervalID = false;
        }, 2000);
    }
}
</script>