<template>
    <fdk-accounts v-slot="accountData">
        <div class="login-wrapper">
            <div class="login-card">
                <div class="login-logo-warpper">
                    <img
                        class="desktop-img"
                        :src="desktopImage"
                        alt="logo"
                        v-if="desktopImage"
                    />
                    <fdk-inline-svg
                        v-else
                        :src="'default-auth-logo-d'"
                        class="desktop-img"
                    ></fdk-inline-svg>
                    <img
                        class="mobile-img"
                        :src="mobileImage"
                        alt="logo"
                        v-if="mobileImage"
                    />
                    <fdk-inline-svg
                        v-else
                        :src="'default-auth-logo-m'"
                        class="mobile-img"
                    ></fdk-inline-svg>
                    <div class="login-logo-text">
                        <div class="login-fynd-text">
                            {{ platformData.display }}
                        </div>
                        <div class="login-text">
                            {{ platformData.subtext }}
                        </div>
                    </div>
                </div>
                <div class="login-content">
                    <ul class="login-tab-buttons" v-if="isShowTabButton">
                        <li
                            :class="{
                                'tab-button': true,
                                'register-button': true,
                                selected: isRegisterSelected
                            }"
                            @click="accountData.openRegister"
                        >
                            <div>Register</div>
                        </li>
                        <li
                            :class="{
                                'tab-button': true,
                                'login-button': true,
                                selected: !isRegisterSelected
                            }"
                            @click="accountData.openLogin({ redirect: false })"
                        >
                            <div>Login</div>
                        </li>
                    </ul>
                    <slot></slot>
                </div>
            </div>
        </div>
    </fdk-accounts>
</template>

<script>
// import { GET_PLATFORM_DATA, GET_APP_CONFIG } from '../../store/getters.type';
// import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            isLoading: true
        };
    },
    computed: {
        // ...mapGetters({
        //     platformData: GET_PLATFORM_DATA,
        //     config: GET_APP_CONFIG
        // }),
        isShowTabButton() {
            if (this.platformData && this.platformData.register) {
                if (
                    this.$route.meta.name === 'login' ||
                    this.$route.meta.name === 'register'
                ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        isRegisterSelected() {
            return this.$route.meta.name === 'register';
        },
        desktopImage() {
            let { desktop_image } = this.platformData;
            if (desktop_image) {
                return desktop_image;
            } else {
                return this.config?.application?.logo?.secure_url;
            }
        },
        mobileImage() {
            let { mobile_image } = this.platformData;
            if (mobile_image) {
                return mobile_image;
            } else {
                return this.config?.application?.logo?.secure_url;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.login-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}
.login-card {
    width: 650px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    background-color: #fff;
    border-radius: 9px;
    display: flex;
    @media @tablet {
        width: 360px;
        flex-direction: column;
    }
}
.login-logo-warpper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: center;
    align-items: center;
    border-right: 1px dashed #cecece;
    margin-top: 10px;
    margin-bottom: 10px;
    @media @tablet {
        width: 95%;
        border-right: none;
        flex-direction: row;
        border-bottom: 1px dashed #cecece;
        justify-content: flex-start;
        padding-top: 12px;
        padding-bottom: 12px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 0;
        margin-bottom: 0;
    }
    .desktop-img {
        width: 120px;
        display: inline-block;
        @media @tablet {
            display: none;
        }
    }
    .mobile-img {
        display: none;
        @media @tablet {
            margin-right: 5px;
            width: 40px;
            display: inline-block;
        }
    }
    .login-logo-text {
        text-align: center;
        @media @tablet {
            text-align: left;
        }
        .login-fynd-text {
            font-size: 21px;
            line-height: 34px;
            color: #e05e9a;
            font-weight: bold;
            @media @tablet {
                font-size: 14px;
                line-height: 18px;
            }
        }
        .login-text {
            color: #7c7c7c;
            line-height: 25px;
            font-size: 14px;
            @media @tablet {
                font-size: 12px;
                line-height: 18px;
            }
        }
    }
}
.login-content {
    width: 60%;
    box-sizing: border-box;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media @tablet {
        width: 100%;
        padding: 10px 15px;
    }
}
.login-tab-buttons {
    display: flex;
    margin-bottom: 15px;

    .tab-button {
        cursor: pointer;
        color: @SecondaryColor;
        height: 40px;
        text-decoration: none;
        min-width: 110px;
        border-radius: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid @SecondaryColor;
        box-sizing: border-box;
        font-size: 14px;
        padding-left: 10px;
        padding-right: 10px;
        @media @tablet {
            min-width: 90px;
            height: 34px;
            font-size: 12px;
        }
    }
    .login-button {
        margin-left: 15px;
    }
    .selected {
        background-color: @SecondaryColor;
        color: #fff;
    }
}
</style>
