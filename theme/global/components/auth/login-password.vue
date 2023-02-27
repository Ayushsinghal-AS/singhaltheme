<template>
    <div>
        <div class="loading" v-if="isLoading">
        </div>
        <fdk-accounts v-slot="accountData">
            <div class="login-input-group">
                <div class="login-mobile-input">
                    <div :class="{ 'login-input-group': true}">
                        <div class="input-wrapper">
                            <label class="input-title font-body" for="username">Mobile number/Email id</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="+91987123456 / abcd@gmail.com"
                                required=""
                                v-model="username"
                                @input="onLoginInput"
                                @keyup.enter="loginClicked(accountData)"
                            />
                        </div>
                    </div>

                    <div class="login-input-group">
                        <div class="input-wrapper">
                            <label class="input-title font-body" for="username">Password</label>
                            <input
                                :type="isPasswordShow ? 'text' : 'password'"
                                name="password"
                                required=""
                                v-model="password"
                                @keyup.enter="loginClicked(accountData)"
                                placeholder="Enter Password"
                            />
                            <div
                                class="password-toggle"
                                @click="passwordShowClick"
                                v-if="password && !isPasswordShow"
                            >
                                <fdk-inline-svg
                                    class="show-password-icon"
                                    src="show-password"
                                />
                            </div>
                            <div
                                class="password-toggle"
                                @click="passwordHideClick"
                                v-if="password && isPasswordShow"
                            >
                                <fdk-inline-svg
                                    class="hide-password-icon"
                                    src="hide-password"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="login-alert alert-error" v-if="isError">
                        <span class="alert-message">Password or username is incorrect</span>
                    </div>
                    <div class="forgetPassword font-body">
                        <fdk-link :link= "`/auth/forgot-password`">
                            <p>FORGOT PASSWORD?</p>
                        </fdk-link>
                    </div>
                </div>
                <!-- <div class="login-alert alert-error" v-if="isError">
                    <span class="alert-message">{{ errorMessage }}</span>
                </div> -->
                <term-privacy />
                <button class="login-button secondary-btn font-body" :disabled="!(password && username)" @click="loginClicked(accountData)">
                    LOGIN
                </button>
            </div>
        </fdk-accounts>
    </div>
</template>

<script>
import loginModeButton from './login-mode-button.vue';
// import { checkIfNumber } from '../../helper/auth.utils';

export default {
    name: 'login-password.vue',
    components: {
        'login-mode-button': loginModeButton,
    },
    data() {
        return {
            username: '',
            password: '',
            isError: false,
            errorMessage: '',
            isLoading: false,
            isPasswordShow: false,
            showInputNumberPrefix: false,
            numberPattern:"",
            IntervalID: false,
        };
    },
    computed: {
        isForgotPassword() {
            return this.platformData?.forgot_password;
        },
        getLoginText() {
            return (
                this.appFeatures?.feature?.landing_page?.login_btn_text || 'Login'
            );
        },
        getSignInUsername() {
            return this.checkIfNumber(this.username) ? `91${this.username}` : this.username;
        },
    },
    methods: {
        checkIfNumber(value) {
            const numberPattern = /^[0-9]+$/
            return numberPattern.test(value);
        },
        passwordShowClick() {
            this.isPasswordShow = true;
        },
        passwordHideClick() {
            this.isPasswordShow = false;
        },
        toggleOtp() {
            this.$emit('is_otp_true');
        },
        forgotPasswordClick(accountData) {
            accountData.openForgotPassword();
        },
        loginClicked(accountData) {
            if (this.password && this.username) {
                this.isLoading = true;
                this.$emit('IntervalID', this.IntervalID = true);
                return accountData
                    .signIn({
                        is_redirection: true,
                        password: this.password,
                        username: this.getSignInUsername,
                    })
                    .then(() => {
                        this.isLoading = false;
                        this.isError = false;
                        this.$emit('IntervalID', this.IntervalID = false);
                    })
                    .catch((err) => {
                        this.isLoading = false;
                        if (err?.details?.meta?.is_deleted) {
                            return this.$router.push({
                                path: '/auth/account-locked',
                                query: this.$router.currentRoute.query,
                            });
                        }
                        this.isError = true;
                        if (err.message) {
                            this.errorMessage = err.message;
                        }
                    });
            }
        },
        onLoginInput() {
            if (this.checkIfNumber(this.username)) {
                return (this.showInputNumberPrefix = true);
            }
            this.showInputNumberPrefix = false;
        },
    },
};
</script>

<style lang="less" scoped>
.input-wrapper {
    position: relative; 
}

input {
    border: 1px solid grey;
    border-radius: 2px;
    position: relative;
    width: 335px;
    margin: 10px;
    line-height: 6ex;
    padding-left: 20px;
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
}
.login-button {
    font-weight: 500;
    width: 360px;
    margin-top: 0px;
    height: 48px;
    color: @ButtonSecondary;
    font-size: 14px;
    line-height: 20px;
}
.password-lable-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    align-items: center;
}
.forgot-password {
    color: @SecondaryColor;
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
    @media @tablet {
        font-size: 12px;
        line-height: 12px;
    }
}
.login-alert {
    font-size: 12px;
    &.alert-error {
        color: #fb406b;
        padding-left: 48px;
        text-align-last: start;
    }
}
.password-input-wrapper {
    position: relative;
    input {
        padding-right: 40px;
        width: 100%;
    }
}
.password-toggle {
    height: 24px;
    width: 24px;
    position: absolute;
    top: 53%;
    transform: translateY(-50%);
    right: 65px;
    cursor: pointer;
}
.loading {
    div {
        width: 100%;
        height: 100%;
    }
}
.forgetPassword {
    padding-bottom: 16px;
    color: @TextBody;
    font-size: 14px;
    padding-left: 255px;
    height: 20px;
    width: 160px;
    font-weight: 500;
    line-height: 20px;
    text-decoration-line: underline;
}
</style>
