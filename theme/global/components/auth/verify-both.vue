<template>
    <div>
        <fdk-accounts v-slot="accountData">
            <div class="verify-both">
                <div class="verify-mobile-otp" v-if="isShowMobileOtp">
                    <div class="form-wrapper">
                        <h3 class="header font-header">Verify OTP</h3>
                        <div>
                            <div>
                                <span class="verify-both-input-title otp-sent-msg font-body">OTP sent to {{ verifyBothData && verifyBothData.mobile }}</span>
                                <div class="verify-both-input-group">
                                    <div class="otp-input-fields">
                                        <div class="otp-wrapper">
                                            <v-otp-input
                                                @hook:mounted="addListener"
                                                @hook:destroyed="removeListener"
                                                ref="otpInput"
                                                input-classes="otp-input"
                                                :class="{
                                                    'error-input': isInValidMobile,
                                                }"
                                                :input-type="'number'"
                                                separator=" "
                                                :num-inputs="4"
                                                :should-auto-focus="true"
                                                :is-input-num="true"
                                                @on-change="handleOnChange"
                                            />
                                            <p class="error-text">
                                                <span v-if="isInValidMobile">{{ errorResponse }}</span>
                                            </p>
                                    </div>
                                    </div>  
                                </div>
                            </div>
                            <div class="login-alert alert-error" v-if="isInValidMobile">
                                <span class="alert-message">{{ inValidMobileErrorMsg }}</span>
                            </div>
                            <div class="loginBtn">
                                <button class="verify-both-submit-btn verify-mobile-button secondary-btn" type="submit" :disabled="!mobileOtp"
                                    @click="verifyMobileClick(accountData)">
                                        LOGIN
                                </button>
                            </div>
                            <div class="divsubmit">
                                <button class="verify-both-submit-btn2 mobile-resend-otp-btn secondary-btn" type="button" :disabled="!isShowResendMobileOtp"
                                    @click="mobileResendOtpClick(accountData)">
                                    <span v-if="!isShowResendMobileOtp" class="disBtn">Resend OTP {{ !isShowResendMobileOtp ? `In ${mobileOtpTime}s` : null }} </span>
                                    <span v-else>Resend OTP</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="verify-email-otp" v-if="isShowEmailOtp">
                    <div class="form-wrapper">
                        <h3 class="header">Verify Email</h3>
                        <div>
                            <div>
                                <span
                                    class="verify-both-input-title otp-sent-msg"
                                    >OTP sent to
                                    {{
                                        verifyBothData && verifyBothData.email
                                    }}</span
                                >
                                <div class="verify-both-input-group">
                                    <label
                                        class="verify-both-input-title"
                                        for="OTP"
                                        ><b>OTP</b></label
                                    ><input
                                        type="number"
                                        name="OTP"
                                        v-model="emailOtp"
                                        class="email-otp"
                                        @keypress="checkNumber"
                                        @keyup.enter="
                                            verifyEmailClick(accountData)
                                        "
                                    />
                                </div>
                            </div>
                            <div
                                class="login-alert alert-error"
                                v-if="isInValidEmail"
                            >
                                <span class="alert-message">{{
                                    inValidEmailErrorMsg
                                }}</span>
                            </div>
                            <button
                                class="
                                    verify-both-submit-btn verify-email-button
                                    secondary-btn
                                "
                                type="submit"
                                :disabled="!emailOtp"
                                @click="verifyEmailClick(accountData)"
                            >
                                <span>Submit</span></button
                            ><button
                                class="
                                    verify-both-submit-btn
                                    email-resend-otp-btn
                                    secondary-btn
                                "
                                type="button"
                                :disabled="!isShowResendEmailOtp"
                                @click="emailResendOtpClick(accountData)"
                            >
                                <span
                                    >Resend OTP
                                    {{
                                        !isShowResendEmailOtp
                                            ? `In ${emailOtpTime}s`
                                            : null
                                    }}</span
                                >
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </fdk-accounts>
    </div>
</template>

<script>
import otpInput from "@bachdgvn/vue-otp-input";
export default {
    components: {
        'v-otp-input': otpInput,
    },
    props: {
        verifyBothData: { default: {} },
        isShowVerifyEmail: { default: true },
        isShowVerifyMobile: { default: true }
    },
    watch: {
        mobileOtp(val) {
            if (val.length > 4) {
                this.mobileOtp = val.slice(0, 4);
            }
        },
        emailOtp(val) {
            if (val.length > 4) {
                this.emailOtp = val.slice(0, 4);
            }
        }
    },
    data() {
        return {
            mobileOtp: '',
            emailOtp: '',
            isInValidMobile: false,
            isValidMobileOtp: false,
            isValidEmailOtp: false,
            inValidMobileErrorMsg: '',
            inValidEmailErrorMsg: '',
            isInValidEmail: false,
            mobileOtpTimer: null,
            emailOtpTimer: null,
            emailOtpTime: '90',
            mobileOtpTime: '30',
            isShowResendMobileOtp: false,
            isShowResendEmailOtp: false,
            isLoading: false,
            isShowEmail: true,
            isShowMobile: true,
            errorResponse: "",
            IntervalID: false,
        };
    },
    computed: {
        isShowEmailOtp() {
            if (this.isShowVerifyEmail) {
                return !this.isValidEmailOtp;
            } else {
                this.isShowEmail = false;
                return false;
            }
        },
        isShowMobileOtp() {
            if (this.isShowVerifyMobile) {
                return !this.isValidMobileOtp;
            } else {
                this.isShowMobile = false;
                return false;
            }
        },
        isOtpLengthValid() {
            return this.mobileOtp.length === 4;
        }
    },
    methods: {
        handleOnChange(value) {
            this.mobileOtp = value;
            if (!this.isOtpLengthValid) {
                this.isInValidOtp = false;
            }
        },
        checkNumber(evt) {
            const charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault();
            }
        },
        mobileTimer(remaining) {
            this.mobileOtpTimer = setInterval(() => {
                remaining -= 1;
                this.mobileOtpTime = `${remaining}`;
                if (remaining < 0) {
                    clearInterval(this.mobileOtpTimer);
                    this.isShowResendMobileOtp = true;
                }
            }, 1000);
        },
        emailTimer(remaining) {
            this.emailOtpTimer = setInterval(() => {
                remaining -= 1;
                this.emailOtpTime = `${remaining}`;
                if (remaining < 0) {
                    clearInterval(this.emailOtpTimer);
                    this.isShowResendEmailOtp = true;
                }
            }, 1000);
        },
        verifyMobileClick(accountData) {
            if (this.mobileOtp) {
                this.isLoading = true;
                this.$emit('IntervalID', this.IntervalID = true);
                let isEmailVerified = false;
                if (this.isShowEmail) {
                    if (this.isValidEmailOtp) {
                        isEmailVerified = true;
                    }
                } else {
                    isEmailVerified = true;
                }
                let body = {
                    request_id:
                        this.verifyBothData && this.verifyBothData.request_id,
                    register_token:
                        this.verifyBothData &&
                        this.verifyBothData.register_token,
                    otp: this.mobileOtp,
                    is_email_verified: isEmailVerified,
                    is_redirection: true
                };

                accountData
                    .verifyMobileOtp(body)
                    .then(res => {
                        this.isLoading = false;
                        this.$emit('IntervalID', this.IntervalID = false);
                        this.isInValidMobile = false;
                        this.isValidMobileOtp = true;
                    })
                    .catch(err => {
                        this.isLoading = false;
                        this.$emit('IntervalID', this.IntervalID = false);
                        if (err.message) {
                            this.inValidMobileErrorMsg = err.message;
                        }
                        this.isInValidMobile = true;
                        this.isValidMobileOtp = false;
                    });
            }
        },
        verifyEmailClick(accountData) {
            if (this.emailOtp) {
                let action = accountData.is_logged_in ? 'verify' : 'register';
                let isMobileVerified = false;
                if (this.isShowMobile) {
                    if (this.isValidMobileOtp) {
                        isMobileVerified = true;
                    }
                } else {
                    isMobileVerified = true;
                }
                this.isLoading = true;
                let body = {
                    otp: this.emailOtp,
                    email: this.verifyBothData && this.verifyBothData.email,
                    register_token:
                        this.verifyBothData &&
                        this.verifyBothData.register_token,
                    action: action,
                    is_mobile_verified: isMobileVerified,
                    is_redirection: true
                };
                accountData
                    .verifyEmailOtp(body)
                    .then(res => {
                        this.isLoading = false;
                        this.isInValidEmail = false;
                        this.isValidEmailOtp = true;
                    })
                    .catch(err => {
                        this.isLoading = false;
                        if (err.message) {
                            this.inValidEmailErrorMsg = err.message;
                        }
                        this.isInValidEmail = true;
                        this.isValidEmailOtp = false;
                    });
            }
        },
        mobileResendOtpClick(accountData) {
            if (this.isShowResendMobileOtp) {
                this.isLoading = true;
                const body = {
                    mobile: this.verifyBothData && this.verifyBothData.mobile,
                    country_code:
                        this.verifyBothData && this.verifyBothData.country_code,
                    token:
                        this.verifyBothData && this.verifyBothData.resend_token,
                    action: 'resend'
                };
                accountData
                    .resendVerifyMobileOtp(body)
                    .then(res => {
                        this.isLoading = false;
                        this.isShowResendMobileOtp = false;
                        this.mobileOtpTime = res.resend_timer;
                        this.mobileTimer(res.resend_timer);
                    })
                    .catch(err => {
                        this.isLoading = false;
                    });
            }
        },
        emailResendOtpClick(accountData) {
            if (this.isShowResendEmailOtp) {
                this.isLoading = true;
                const body = {
                    email: this.verifyBothData && this.verifyBothData.email,
                    register_token:
                        this.verifyBothData &&
                        this.verifyBothData.register_token,
                    token:
                        this.verifyBothData &&
                        this.verifyBothData.resend_email_token,
                    action: 'resend'
                };
                accountData
                    .resendVerifyEmailOtp(body)
                    .then(res => {
                        this.isLoading = false;
                        this.isShowResendEmailOtp = false;
                        this.emailOtpTime = '90';
                        this.emailTimer(90);
                    })
                    .catch(err => {
                        this.isLoading = false;
                    });
            }
        }
    },
    mounted() {
        this.mobileTimer(this.verifyBothData.resend_timer);
        this.emailTimer(90);
    },
    destroyed() {
        clearInterval(this.mobileOtpTimer);
        clearInterval(this.emailOtpTimer);
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

    // @media @mobile {
    //     width: 60px;
    // }
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
.verify-both {
    display: flex;
    flex-direction: column;
}
.form-wrapper {
    .header {
        width: 360px;
        height: 32px;
        font-family: 'Marcellus';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 32px;
        text-align: center;
        letter-spacing: -0.02em;
        padding-top: 48px;
        padding-left: 48px;
        @media @mobile {
            text-align-last: left;
        }
    }
    .verify-both-input-title {
        width: 360px;
        height: 22px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        align-items: center;
        text-align: center;
        padding-left: 48px;
        letter-spacing: -0.02em;
        &.otp-sent-msg {
            padding-top: 8px;
            display: inline-block;
            @media @mobile {
                text-align-last: left;
            }
        }
    }
    .verify-both-input-group {
        display: flex;
        flex-direction: column;
        padding-top: 35px;
        padding-left: 7px;
        padding-bottom: 15px;
    }
}
.verify-both-submit-btn {
    width: 360px;
    font-size: 14px;
    height: 48px;
}
.divsubmit {
    text-align-last: center;
    @media @mobile {
        text-align-last: end;
        padding-right: 43px;
    }
}
.verify-both-submit-btn2 {
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    margin-top: 24px;
    line-height: 20px;
    background-color: white;
    color: #545454;
    border: none;
    text-decoration: underline;
    .disBtn {
        color: #989898;
    }
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
.loginBtn {
    padding-left: 48px; 
}
.loading {
    div {
        width: 100%;
        height: 100%;
    }
}
.mobile-otp::-webkit-outer-spin-button,
.mobile-otp::-webkit-inner-spin-button,
.email-otp::-webkit-outer-spin-button,
.email-otp::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>
