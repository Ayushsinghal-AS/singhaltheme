<template>
    <div class="banner3">
        <div class="banner3_item banner3_item_1"><img v-if="bnr_img1.length > 0" :src="bnr_img1" /></div>
        <div class="banner3_item banner3_item_2">
            <div class="banner_text">

                <div class="bnr_head font-header" v-if="bnr_head.length > 0">{{ bnr_head }}</div>
                <div class="bnr_sub font-body" v-if="bnr_subhead.length > 0">{{ bnr_subhead }}</div>
                <div class="bnr_btn font-body " v-if="btn_txt.length > 0">
                    <fdk-link :link="btn_link">
                        <div>{{ btn_txt }}</div>
                    </fdk-link>
                </div>
            </div>
        </div>
        <div class="banner3_item banner3_item_3"><img v-if="bnr_img2.length > 0" :src="bnr_img2" /></div>
    </div>
</template>
<script>
export default {
    name: "banner-db",
    props: {
        bnr_img1: { default: "", type: String },
        bnr_img2: { default: "", type: String },
        bnr_head: { default: "", type: String },
        bnr_subhead: { default: "", type: String },
        btn_txt: { default: "", type: String },
        btn_link: { default: "", type: String },
    },
};
</script>
<style lang="less" scoped>
.banner3 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    position: relative;
    background-color: @ThemeAccentL1 ;
}

.banner3_item_1 {
    height: 400px;
    grid-column-start: 1;
    grid-column-end: 5;
}

.banner3_item_2 {
    // height: 400px;
    grid-column-start: 5;
    grid-column-end: 9;
    grid-row: 1;
    text-align: center;
    align-self: center;

}

.banner3_item_3 {
    height: 400px;
    grid-column-start: 9;
    grid-column-end: 13;
    grid-row: 1;
}

.banner_text {
    /* padding-top: 25%; */
    padding-left: 10%;
    padding-right: 10%;
}

.bnr_head {
    color: @TextHeading;
    font-family: Marcellus;
    font-size: 32px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: -0.02em;
}

.bnr_sub {
    color: @TextBody;
    padding-top: 4px;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
}

.bnr_btn {
    padding-top: 40px;
    text-transform: uppercase;
    text-decoration: underline;
    color: @TextLabel;
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.02em;
}



.banner3_item>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


@media screen and (max-width: 768px) {
    .banner3 {
        grid-template-columns: auto auto;
    }

    .banner3_item_1 {
        height: 328px;
        grid-column-start: 1;
        grid-column-end: 5;
    }

    .banner3_item_2 {
        height: 328px;
        grid-column-start: 5;
        grid-column-end: 9;
        text-align: left;
    }

    .banner_text {
        padding-top: 25%;
        padding-left: 146px;
        padding-right: 10%;
    }

    .banner3_item_3 {
        position: absolute;
        height: 254px;
        width: 171px;
        align-self: center;
        /* // grid-column: 3; */
        grid-column: 4;
        top: 10%;
        border: 1.75px solid rgba(255, 255, 255, 1)
    }

}

@media screen and (max-width: 480px) {

    .banner3{
        background-color: unset;
    }
    .banner3_item_1 {
        grid-column-start: 1;
        min-height: 448px;
        /* // grid-column-end: 11; */
    }

    .banner3_item_3 {
        grid-column: unset;
        right: 0;
        /* // top: 8%; */
        grid-row: 1;
        align-self: unset;
        /* top: unset;
        bottom: 34%; */
        top: 143.65px;
    }

    .banner3_item_2 {
        grid-column-start: 1;
        grid-column-end: 13;
        grid-row: 2;
        width: 100%;
        background-color: unset;
        height: unset;
    }

    .banner3_item_1>img {
        height: unset;
    }

    .banner3_item_1 {
        height: unset;
    }

    .banner_text {
        padding: 16px 0px;
    }


}
</style>