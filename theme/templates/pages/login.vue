<template>
    <fdk-accounts class="wrapper">
        <AuthRoot />
        <loading v-show="IntervalID"/>
        <div v-show="!IntervalID" class="login-container">
            <div class="login-heading font-header">
                <p>Login/Sign up</p>
                <p v-if="otpNumber" class="otpNumber font-body">OTP sent to {{ otpNumber.mobile }}</p>
                <div class="toggleMenu font-body">
                    <div>
                        <button style="border: none; background-color: white;" @click="handleClickOtp">Send OTP</button>
                        <div><h1 class="line" v-if="isOtp"></h1></div>
                    </div>
                    <div>
                        <button style="border: none; background-color: white;" @click="handleClickPassword">Password</button>
                        <h1 class="line" v-if="isPassword"></h1>
                    </div>
                </div>
            </div>
            <div class="otpM" v-if="isOtp">
                <login-otp @otp-sent="otpSent" @otp-false="setOtpFalse" @otpResponse="getOTPNumber" @IntervalID="dataOTP"></login-otp>
            </div>
            <div class="passwordM" v-if="isPassword">
                <login-password @IntervalID="dataPassword"/>
            </div>

            <div class="SectionSecond">
                <div class="register font-body" v-if="!otpNumber">
                    <fdk-link :link= "`/auth/register`">
                        <p>CREATE NEW ACCOUNT</p>
                    </fdk-link>
                </div>
                <div>
                    <fdk-accounts v-slot="accountsData">
                        <div class="facebook-login" v-if="isFacebookButton">
                            <button @click="accountsData.facebook.login" class="facebook-login-btn" v-if="!isFacebookLoading">
                                <img src="https://cdn.iconscout.com/icon/free/png-256/facebook-262-721949.png?f=avif" alt="facebook"  width="18px" height="18px"/>
                                <span >Sign in with Facebook</span>
                            </button>
                        </div>
                        <div class="google-login" v-if="isGoogleButton">
                            <div class="gClass">
                                <div ref="googlebuttonref" data-text="continue_with" data-width="360" data-height="48" data-logo_alignment="center"></div>
                            </div>
                        </div>
                    </fdk-accounts>
                </div>
                <div>
                    <term-privacy />
                </div>
            </div>
        </div>
    </fdk-accounts>
</template>

<style lang="less" scoped>
.wrapper {
    width: 1440px;
    padding-top: 80px;
    .login-container {
        margin-left: auto;
        margin-right: auto;
        width: 456px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.25);
        .login-heading {
            color: @TextHeading;
            font-weight: 400;
            font-size: 28px;
            line-height: 32px;
            padding-top: 48px;
            text-align-last: center;
            .toggleMenu {
                color: @TextBody;
                display: flex;
                padding-left: 151px;
                column-gap: 3px;
                padding-top: 14px;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                .line {
                    border-bottom: 2px solid black;
                    width: 62px;
                    padding-top: 6px;
                    margin-left: 7px;
                }
                @media @mobile {
                    padding-left: 0px;
                }
            }
            .otpNumber {
                color: @TextBody;
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                letter-spacing: -0.02em;
                padding-top: 6px;
                @media @mobile {
                    text-align: start;
                }
            }
            @media @tablet {
                font-size: 24px;
                line-height: 28px;
            }
            @media @mobile {
                font-size: 24px;
                line-height: 28px;
                text-align-last: auto;
                padding-left: 48px;
                p {
                    padding-left: 5px;
                }
            }
        }
    }
    .SectionSecond {
        text-align-last: center;
        .register {
            padding-top: 24px;
            color: @ButtonLink;
            font-size: 14px;
            // padding-left: 148px;
            height: 20px;
            // width: 162px;
            font-weight: 500;
            line-height: 20px;
            text-decoration-line: underline;
            @media @mobile {
                // padding-left: 50px;
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
                width: 361px;
                height: 42px;
            }
        }
        .facebook-login {
            height: 48px;
            width: 360px;
            margin-top: 48px;
            padding-left: 48px;
        }
    }
    .otpM {
        padding-top: 45px;
        text-align-last: center;
    }
    .passwordM {
        padding-top: 45px;
        text-align-last: center;
    }
    @media @tablet {
        width: 744px;
        padding-top: 48px;
    }
    @media @mobile {
        width: 320px;
        padding-top: 32px;
    }
}
</style>

<script>
import LoginOtp from './../../global/components/auth/login-otp.vue';
import LoginPassword from './../../global/components/auth/login-password.vue';
import AuthRoot from './../../global/components/auth/auth-root.vue';
import termPrivacy from '../../global/pages/auth/term-privacy.vue';
import Loading from './../../global/components/common/loading.vue';

export default {
    props:["context"],
    data() {
        return {
            isOtp: true,
            isPassword: false,
            otp: false,
            maskedMobileNum: "",
            otpNumber: "",
            IntervalID: true,
        }
    },
    components: {
        "login-otp": LoginOtp,
        "login-password": LoginPassword,
        "auth-root": AuthRoot,
        'term-privacy': termPrivacy,
        'loading': Loading,
    },
    mounted() {
        setInterval(() => {
            this.IntervalID = false;
        }, 2000);
    },
    methods: {
        dataOTP(value) {
            this.IntervalID = value;
        },
        dataPassword(value){
            this.IntervalID = value;
        },
        getOTPNumber(value) {
            this.otpNumber = value;
        },
        setOtpFalse(event) {
            this.otp = false;
        },
        otpSent(mobileInfo) {
            let mobNo = mobileInfo.mobile.split("").map((el, idx) => {
                if (idx <= mobileInfo.mobile.length - 5) return "*";
                else return el;
            }).join("");
            this.maskedMobileNum = "+" + mobileInfo.country_code + " " + mobNo;
            this.otp = true;
        },
        handleClickOtp() {
            this.isOtp = true;
            this.isPassword = false;
        },
        handleClickPassword() {
            this.isOtp = false;
            this.isPassword = true;
        }
    },
    computed: {
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
    }
}
</script>