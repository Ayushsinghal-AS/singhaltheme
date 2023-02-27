<template>
    <div :class="{ 'login-input-wrapper': true, 'error-input': !isValidNumberCheck }">
        <div class="input-wrapper">
            <label for="first" class="input-title font-body">Mobile number</label>
            <input
                ref="loginMobileInput"
                type="tel"
                id="mobile"
                v-model="mobileData"
                :disabled="disable"
                @input="onInput"
                @keypress="checkNumber"
                @keyup.enter="enterEvent"
                maxlength="10"
                placeholder="9987123456"
            />
            <div class="prefix">+91</div>
        </div>
        <span v-if="isShowLabelAndError && !isValidNumberCheck" class="error-text font-body">Please enter valid phone number</span>
    </div>
</template>

<script>
export default {
    props: {
        mobile: {
            default: ''
        },
        countryCode: {
            defualt: ''
        },
        disable: {
            default: false
        },
        isShowLabelAndError: {
            default: true
        }
    },
    data() {
        return {
            mobileInput: this.$refs.loginMobileInput,
            isValidNumberCheck: true,
            mobileData: ''
        };
    },
    methods: {
        checkNumber(evt) {
            const charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault();
            }
        },
        initializeTelInput() {
            if (this.mobileInput) {
                this.mobileInput.removeEventListener(
                    'countrychange',
                    this.onInput
                );
            }
            this.$refs.loginMobileInput.addEventListener(
                'countrychange',
                this.onInput
            );
        },
        onInput() {
            const pasteMobileDataCheckRe = /^[0-9]*$/;
            if (!pasteMobileDataCheckRe.test(this.mobileData)) {
                this.mobileData = '';
            }
            this.isValidNumber();
            this.$emit('change', this.getNumInfo());
            
        },
        enterEvent() {
            this.$emit('enter_click_event');
        },
        getNumInfo() {
        return {
            mobile: this.mobileData,
            countryCode: "91",
            isValidNumber: true,
        };
        },
        isValidNumber() {
        const maxlength = 10;
        this.mobileData = this.mobileData.trim();
        if (this.mobileData && this.mobileData.length > maxlength) {
            this.mobileData = this.mobileData.slice(0, maxlength);
        }
        if (
            this.mobileData &&
            this.mobileData.length === maxlength &&
            this.checkIfValidIndianMobileNumber(this.mobileData)
        ) {
            this.isValidNumberCheck = true;
        } else {
            this.isValidNumberCheck = false;
        }
        return this.isValidNumberCheck;
        },
        checkIfValidIndianMobileNumber(str) {
        const regexExp = /^[6-9]\d{9}$/gi;
        return regexExp.test(str);
        }
    },
    mounted() {
        this.initializeTelInput();
        this.mobileData = this.mobile;
        this.$emit('change', this.getNumInfo());
    },
    destroyed() {
        if (this.$refs.loginMobileInput) {
            this.$refs.loginMobileInput.removeEventListener(
                'countrychange',
                this.onInput
            );
        }
    }
}
</script>

<style lang="less" scoped>
.login-input-wrapper {

    .input-wrapper {
        position: relative; 
        .prefix {
            position: absolute;
            left: 58px;
            top: 26px;
            font-family: Inter;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }
    }

    input {
        border: 1px solid grey;
        border-radius: 2px;
        position: relative;
        width: 318px;
        margin: 10px;
        line-height: 6ex;
        padding-left: 38px;
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
    .error-text {
        color: #fb406b;
        display: inline-block;
        font-size: 14px;
        margin-top: 0px;
        margin-right: 126px;
        @media @tablet {
            font-size: 11px;
        }
    }
    &.error-input {
        label {
            color: #fb406b;
        }
    }
}
</style>
