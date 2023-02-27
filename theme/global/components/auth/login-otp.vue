<template>
    <div>
        <div class="login-input-group">
            <fdk-accounts v-slot="accountData">
                <div class="login-mobile-input">
                    <mobile-input v-if="!sendOtpSuccess" ref="mobileInput" @change="onChange" @enter_click_event="sendOtpClick(accountData)" />
                    <div v-else class="login-input-group">
                        <!-- <span class="otp-sent-msg">OTP sent to {{ sendOtpResponse.mobile }}</span> -->
                        <div class="otp-input-fields">
                            <div class="otp-wrapper">
                                <v-otp-input
                                    @hook:mounted="addListener"
                                    @hook:destroyed="removeListener"
                                    ref="otpInput"
                                    input-classes="otp-input"
                                    :class="{
                                        'error-input': isInValidOtp,
                                    }"
                                    :input-type="'number'"
                                    separator=" "
                                    :num-inputs="4"
                                    :should-auto-focus="true"
                                    :is-input-num="true"
                                    @on-change="handleOnChange"
                                />
                            </div>
                            <p class="error-text">
                                <span v-if="isInValidOtp">{{ errorResponse }}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <button v-if="!sendOtpSuccess" class="login-button verify-otp-btn secondary-btn font-body" :disabled="!isValidNumber" @click="sendOtpClick(accountData)">
                        GET OTP
                    </button>
                    <div v-else>
                        <div class="login-alert alert-error" v-if="isInValidOtp">
                            <span class="alert-message">{{ otpVerifyErrorMessage }}</span>
                        </div>
                        <div style="padding-top: 8px">
                            <button class="login-button verify-otp-btn secondary-btn font-body" :disabled="!mobileOtp" @click="verifyOtpLogin(accountData)">
                                LOGIN
                            </button>
                        </div>
                        <div class="resendOTP">
                            <button class="login-button2 resend-otp-btn secondary-btn" :disabled="!isShowResendOtp" @click="resendOtpClick(accountData)">
                                <span v-if="!isShowResendOtp" class="disBtn">Resend OTP {{ !isShowResendOtp ? `In ${otpTime}s` : null }}</span>
                                <span v-else>Resend OTP</span>
                            </button>
                        </div>
                    </div>
                </div>
            </fdk-accounts>
        </div>
    </div>
</template>

<script>
import loginModeButton from './login-mode-button.vue';
import termPrivacy from '../../pages/auth/term-privacy.vue';
import otpInput from "@bachdgvn/vue-otp-input";
import Loading from './../common/loading.vue'


export default {
    name: 'login.vue',
    components: {
        'mobile-input': () => import('./mobile-input.vue'),
        'login-mode-button': loginModeButton,
        'term-privacy': termPrivacy,
        'v-otp-input': otpInput,
        'loading': Loading,
    },
    watch: {
        mobileOtp(val) {
            if (val.length > 4) {
                this.mobileOtp = val.slice(0, 4);
            }
        }
    },
    data() {
        return {
            isOtp: false,
            isV: true,
            isValidNumber: false,
            mobileInfo: { mobile: '', country_code: '' },
            sendOtpResponse: {},
            sendOtpSuccess: false,
            isShowResendOtp: false,
            otpTimer: null,
            otpTime: '',
            mobileOtp: '',
            isInValidOtp: false,
            isLoading: false,
            otpVerifyErrorMessage: '',
            isInValidOtp: false,
            errorResponse: "",
            IntervalID: false,
        };
    },
    destroyed() {
        this.otpTime = "";
        clearInterval(this.otpTimer);
    },
    methods: {
        handleOnChange(value) {
            this.mobileOtp = value;
            if (!this.isOtpLengthValid) {
                this.isInValidOtp = false;
            }
        },
        addListener() {
            this.$refs.otpInput.$el.addEventListener("keydown", this.setClickOnEnter, false);
        },
        removeListener() {
            this.$refs.otpInput.$el.removeEventListener("keydown", this.setClickOnEnter, false);
        },
        checkNumber(evt) {
            const charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault();
            }
        },
        onChange(data) {
            this.mobileInfo.mobile = data.mobile;
            this.mobileInfo.country_code = data.countryCode;
            if(data.mobile.length === 10) {
                this.isValidNumber = data.isValidNumber;
            }
            else {
                this.isValidNumber = false;
            }
        },
        togglePassword() {
            this.$emit('is_password_true');
        },
        sendOtpClick(accountData) {
            if (this.isValidNumber) {
                return this.sendOtp(accountData);
            }
        },
        sendOtp(accountData) {
            this.isLoading = true;
            this.$emit('IntervalID', this.IntervalID = true);
            return accountData
                .sendOtp(this.mobileInfo)
                .then(res => {
                    this.isLoading = false;
                    if (res.success) {
                        this.sendOtpSuccess = true;
                        this.sendOtpResponse = res;
                        this.isShowResendOtp = false;
                        this.otpTime = res.resend_timer;
                        this.timer(res.resend_timer);
                        this.$emit('otpResponse', this.sendOtpResponse);
                        this.$emit('IntervalID', this.IntervalID = false);
                    }
                })
                .catch(err => {
                    this.isLoading = false;
                    this.$emit('IntervalID', this.IntervalID = false);
                });
        },
        timer(remaining) {
            this.otpTimer = setInterval(() => {
                remaining -= 1;
                this.otpTime = `${remaining}`;
                if (remaining < 0) {
                    clearInterval(this.otpTimer);
                    this.isShowResendOtp = true;
                }
            }, 1000);
        },
        resendOtpClick(accountData) {
            if (this.isShowResendOtp) {
                clearInterval(this.otpTimer);
                this.isLoading = true;
                let resendData = {
                    mobile: this.mobileInfo.mobile,
                    country_code: this.mobileInfo.country_code,
                    token: this.sendOtpResponse.resend_token,
                    action: 'resend'
                };
                return accountData
                    .resendOtp(resendData)
                    .then(res => {
                        this.isLoading = false;
                        if (res.success) {
                            this.sendOtpSuccess = true;
                            this.isShowResendOtp = false;
                            this.otpTime = res.resend_timer;
                            this.timer(res.resend_timer);
                        }
                    })
                    .catch(err => {
                        this.isLoading = false;
                    });
            }
        },
        verifyOtpLogin(accountData) {
            if (this.mobileOtp) {
                this.isLoading = true;
                this.$emit('IntervalID', this.IntervalID = true);
                return accountData
                    .signInWithOtp({
                        is_redirection: true,
                        request_id: this.sendOtpResponse.request_id,
                        otp: this.mobileOtp
                    })
                    .then(res => {
                        this.isLoading = false;
                        this.$emit('IntervalID', this.IntervalID = false);
                        this.isInValidOtp = false;
                    })
                    .catch(err => {
                        this.isLoading = false;
                        this.$emit('IntervalID', this.IntervalID = false);
                        this.isInValidOtp = true;
                        if (err?.details?.meta?.is_deleted) {
                            return this.$router.push({
                                path: '/auth/account-locked',
                                query: this.$router.currentRoute.query
                            });
                        }
                        if (err.message) {
                            this.otpVerifyErrorMessage = err.message;
                        } else {
                            this.otpVerifyErrorMessage = 'Something went wrong';
                        }
                    });
            }
        }
    },
    computed: {
        isOtpLengthValid() {
            return this.mobileOtp.length === 4;
        }
    },
    destroyed() {
        this.isLoading = false;
    }
};
</script>

<style lang="less" scoped>
::v-deep .otp-input {
  width: 78px;
  height: 44px;
  border: none;
  text-align: center;
  background: white;
  font-family: Marcellus;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: black;
  border: 1px solid black;
  -moz-appearance: textfield;

//   @media @mobile {
//     width: 48px;
//     height: 36px;
//   }
}
.error-input {
  ::v-deep .otp-input {
    border: 1px solid black !important;
  }
}
::v-deep .otp-input::-webkit-inner-spin-button,
::v-deep .otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.otp-input-fields {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  margin: auto;
}
.otp-input-fields div,
.otp-input-fields div div {
  width: 100%;
  justify-content: center;
  display: flex;
  column-gap: 8px;
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

.login-button2 {
    font-weight: 500;
    margin-top: 24px;
    font-family: Inter;
    font-size: 14px;
    line-height: 20px;
    background-color: white;
    border: none;
    color: #545454;
    text-decoration: underline;
    .disBtn {
        color: #989898;
    }
}

.login-mobile-input {
    margin-top: 15px;
    margin-bottom: 8px;
    min-height: 57px;
    @media @tablet {
        min-height: 49px;
    }
}

.login-input-group {
    margin-bottom: 8px;
    .login-input-title {
        margin-bottom: 3px;
        font-size: 14px;
        line-height: 14px;
        color: #a0a0a0;
        display: block;
    }
    input {
        width: 100%;
        border: 1px solid #d7d7d7;
        padding-left: 8px;
        border-radius: 4px;
        background-color: #fff;
        height: 40px;
        font-size: 16px;
        box-sizing: border-box;
        &::placeholder {
            color: #d7d7d7;
        }
    }
}
.password-lable-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
}

.otp-sent-msg {
    color: #a0a0a0;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 20px;
    display: inline-block;
}
.login-alert {
    margin-bottom: 12px;
    padding-left: 58px;
    font-size: 14px;
    margin-top: 12px;
    text-align-last: start;
    padding-left: 48px;
    &.alert-error {
        color: #fb406b;
    }
}

.resendOTP {
    @media @mobile {
        text-align-last: end;
        padding-right: 42px;
    }
}

.loading {
    div {
        width: 100%;
        height: 100%;
    }
}
.login-mobile-otp::-webkit-outer-spin-button,
.login-mobile-otp::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>
