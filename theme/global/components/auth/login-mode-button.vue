<template>
    <div class="login-mode-buttons" v-if="isLoginModeButton">
        <button
            :class="{
                'login-mode-button': true,
                'login-otp-button': true,
                selected: isOtp
            }"
            type="button"
            @click="otpToggleClick"
        >
            OTP</button
        ><button
            :class="{
                'login-mode-button': true,
                'login-password-button': true,
                selected: !isOtp
            }"
            type="button"
            @click="passwordToggleClick"
        >
            Password
        </button>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
// import { GET_PLATFORM_DATA } from '../../store/getters.type';
export default {
    props: {
        loginType: {
            default: 'password'
        }
    },
    data() {
        return {
            isOtp: false
        };
    },
    computed: {
        // ...mapGetters({
        //     platformData: GET_PLATFORM_DATA
        // }),
        isLoginModeButton() {
            return (
                this.platformData?.login?.otp &&
                this.platformData?.login?.password
            );
        }
    },
    methods: {
        passwordToggleClick() {
            this.$emit('password_toggle');
            this.isOtp = false;
        },
        otpToggleClick() {
            this.$emit('otp_toggle');
            this.isOtp = true;
        }
    },
    mounted() {
        if (this.loginType == 'otp') {
            this.isOtp = true;
        } else if (this.loginType == 'password') {
            this.isOtp = false;
        }
    }
};
</script>

<style lang="less" scoped>
.login-mode-buttons {
    margin-bottom: 8px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    .login-mode-button {
        box-sizing: border-box;
        margin: 0;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
        font-weight: bold;
        border: 1px solid @SecondaryColor;
        cursor: pointer;
        color: @SecondaryColor;
        &:last-child {
            margin-right: 0;
        }
        &.selected {
            background-color: @SecondaryColor;
            color: #fff;
        }
        @media @tablet {
            height: 25px;
            line-height: 25px;
            font-size: 11px;
        }
    }
}
</style>
