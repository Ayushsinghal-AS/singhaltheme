<template>
    <section class="d-hero-itb full-width-section section_padding"
        :class='["layout-" + settings.props.style_layout.value]'
        :style="`margin-bottom: ${global_config.props.margin_between}px;`">
        <div class="primaryDiv">
            <div class="d-hero-itb__content" :class='["mirror-" + settings.props.mirror_layout.value]'>
                <div class="d-hero-itb__content--sub font_head font-header" :class='[global_config.props.anim_name]'>
                    {{ settings.props.heading.value }}
                    <div :class="{ 'flexFull': global_config.props.anim_name == 'animFlex', }"></div>
                </div>
                <div class="d-hero-itb__content--main font_subHead font-body" :class='[global_config.props.anim_name]'>
                    <p>{{ settings.props.text.value }}</p>
                    <div :class="{ 'flexFull': global_config.props.anim_name == 'animFlex', }"></div>
                </div>
                <div class="heroBtn" :class='[global_config.props.anim_name]'>
                    <fdk-link :link="settings.props.button_link.value">
                        <button class="btnStyle" v-if="settings.props.button_text.value">{{
                            settings.props.button_text.value
                        }}</button>
                    </fdk-link>
                    <div :class="{ 'flexFull': global_config.props.anim_name == 'animFlex', }"></div>
                </div>

            </div>
            <div :class='["image1-section", "image1_mirror_" + settings.props.mirror_layout.value]'
                v-if="settings.props.image1.value">
                <img :src="settings.props.image1.value" :class='[global_config.props.anim_name]' />
                <div :class="{ 'flexHalf': global_config.props.anim_name == 'animFlex', }"></div>
            </div>
        </div>

        <div class="newDiv" :class='["newDiv_mirror_" + settings.props.mirror_layout.value]'
            v-if="settings.props.image2.value && settings.props.style_layout.value == 'style_1'">
            <div class="image2-section" :class='["mirror-" + settings.props.mirror_layout.value]'>
                <img :src="settings.props.image2.value" :class='[global_config.props.anim_name]' />
                <div :class="{ 'flexHalf': global_config.props.anim_name == 'animFlex', }"></div>
            </div>
            <div class="text2 font_subHead font-body" :class='[global_config.props.anim_name]'>
                {{ settings.props.text2.value }}
                <div :class="{ 'flexFull': global_config.props.anim_name == 'animFlex', }"></div>
            </div>
        </div>

    </section>
</template>  
<settings>
{
  "name": "hero_section",
  "label": "Hero Section",
  "props": [
      {
      "type": "select",
      "id": "style_layout",
      "options": [
          {
              "value": "style_1",
              "text": "Style 1"
          },
          {
              "value": "style_2",
              "text": "Style 2"
          },
          {
              
              "value": "style_3",
              "text": "Style 3"
          }
      ],
      "default": "style_3",
      "label": "Layout",
      "info":"Three different type layout for desktop, tablet and mobile view"
    },
    {
      "type": "select",
      "id": "mirror_layout",
      "options": [
          {
              "value": "on",
              "text": "On"
          },
          {
              "value": "off",
              "text": "Off"
          }
      ],
      "default": "on",
      "label": "Mirror Layout"
    },
    {
      "type": "text",
      "id": "heading",
      "default": "The Season Collection",
      "label": "Heading",
      "info":"Heading text of the section "
    },
    {
      "type": "text",
      "id": "text",
      "default": "Style solutions that are both flattering and functional for every occasion, whether it is on-duty or off-duty.",
      "label": "Short Description",
      "info":" Shot description text below the heading on UI"
    },
    {
          "type": "text",
          "id": "button_text",
          "default": "Shop Now",
          "label": "Button Text"
    },
    
    {
          "type": "url",
          "id": "button_link",
          "default": "",
          "label": "Button Link"
    },
    {
      "type": "text",
      "id": "text2",
      "default": "Versatility and craftsmanship dominate this piece. Made from Vastrakala's classic 100% corduroy cotton. With Bedford corduroy, you get the look of corduroy without the nap. To keep all your belongings safe, this coat has five generously sized pockets.",
      "label": "Description"
    },
    
    {
      "type": "image_picker",
      "id": "image1",
      "default": "",
      "label": "Image 1"
    },
    {
      "type": "image_picker",
      "id": "image2",
      "default": "",
      "label": "Image 2"
    }
    
  ]
}
</settings>
<!-- #endregion -->
<style lang="less" scoped>
.d-hero-itb {
    padding-right: 72px;
    padding-left: 72px;
    box-sizing: border-box;

    @media screen and (max-width: @md-min) {
        padding-right: 0px;
        padding-left: 0px;
    }

    @media screen and (max-width: @sm-min) {
        padding-right: 0px;
        padding-left: 0px;

    }
}


.image1-section {
    @media screen and (max-width: @sm-min) {}
}

.heroBtn {
    padding-top: 40px;

    @media screen and (max-width: @sm-min) {
        padding-top: 32px;
    }

}

.btnStyle {
    background-color: @ButtonPrimary;
    color: @ButtonSecondary ;
    border: 1px solid @ButtonPrimary;
    cursor: pointer;
    //styleName: desktop/Button - 14 px;
    // font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.02em;
    padding: 12px 32px;
    min-width: 140px;
    height: 48px;

    @media screen and (max-width: @md-min) {
        font-size: 12px;
    }
}

.d-hero-itb>.primaryDiv>.d-hero-itb__content {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: @sm-min) {
        padding-left: 16px;
        padding-right: 16px;
    }
}

.d-hero-itb>.primaryDiv>.d-hero-itb__content>.d-hero-itb__content--sub {
    font-weight: 400;
    font-size: 80px;
    line-height: 100%;

    @media screen and (max-width: 1140px) {
        font-size: 40px;
        line-height: 44px;
    }

    @media screen and (max-width: @md-min) {
        font-size: 40px;
        line-height: 44px;
    }

    @media screen and (max-width: @sm-min) {
        font-size: 40px;
        line-height: 44px;
    }
}

.d-hero-itb>.primaryDiv>.d-hero-itb__content>.d-hero-itb__content--main {
    padding-top: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;

    @media screen and (max-width: @md-min) {
        font-size: 14px;
        line-height: 20px;
    }

    @media screen and (max-width: @sm-min) {
        font-size: 14px;
        line-height: 20px;
        padding-top: 4px;
    }
}





.d-hero-itb>.primaryDiv>.mirror-off {
    order: 0;

    @media screen and (max-width: @sm-min) {
        order: 1;
    }
}

.d-hero-itb>.primaryDiv>.mirror-on {
    order: 1;
}




//-------------------------S1S2--------------------------
.layout-style_2,
.layout-style_1 {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: @sm-min) {
        flex-wrap: wrap;
    }


}

.layout-style_1>.primaryDiv,
.layout-style_2>.primaryDiv {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    @media screen and (max-width: @sm-min) {
        flex-direction: column;
    }
}

.layout-style_2>.primaryDiv>.d-hero-itb__content,
.layout-style_1>.primaryDiv>.d-hero-itb__content {
    flex: 50%;
    text-align: left;



    @media screen and (max-width: @md-min) {
        width: 318px;
        align-self: center;
    }

    @media screen and (max-width: @sm-min) {
        width: unset;
        padding-top: 0px;
        align-self: unset;
    }
}

.layout-style_2>.primaryDiv>.mirror-off,
.layout-style_1>.primaryDiv>.mirror-off {
    padding-right: 3%;

    @media screen and (max-width: @md-min) {
        padding-left: 3%;
    }

    @media screen and (max-width: @sm-min) {
        padding-right: 0px;
        padding-left: 16px;


    }
}



.layout-style_2>.primaryDiv>.mirror-on,
.layout-style_1>.primaryDiv>.mirror-on {

    @media screen and (max-width: @sm-min) {
        padding-left: 16px;
    }
}

.layout-style_2>.primaryDiv>.image1-section,
.layout-style_1>.primaryDiv>.image1-section {

    flex: 57%;

    @media screen and (max-width: @sm-min) {
        width: 92%;

    }
}

.layout-style_1>.primaryDiv>.image1_mirror_off {
    padding-left: 8%;
}

.layout-style_1>.primaryDiv>.image1_mirror_on {
    padding-right: 8%;
}

.layout-style_2>.primaryDiv>.image1-section>img,
.layout-style_1>.primaryDiv>.image1-section>img {
    width: 100%;
    height: auto;
    aspect-ratio: 3/4;
    object-fit: cover;


    @media screen and (max-width: @sm-min) {
        width: 100%;
        height: auto;
    }

}

//------------------------S1 only--------------------------

.layout-style_1 > .primaryDiv > .d-hero-itb__content {
  margin-top: 13%;

  @media screen and (max-width: 480px) {
    margin-top: unset;
  }

  @media screen and (max-width: 480px) {
    margin-top: 24px;
  }
}

.newDiv {
  display: flex;
  flex-direction: row;
  order: 2;

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column-reverse;
  }
}

.newDiv > .image2-section {
  display: flex;
  flex-direction: row;
  order: 2;
  box-sizing: border-box;
  margin-top: -10%;
  //margin-top: -149px; //by fynd

  @media screen and (max-width: 768px) {
    margin-top: 24px;
  }

  @media screen and (max-width: 480px) {
  }
}

.newDiv > .image2-section > img {
  width: 100%;
  height: auto;
  max-width: 1200px;
  aspect-ratio: 0.75;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    max-width: 234px;
    max-height: 312px;
    aspect-ratio: 0.75;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    max-height: unset;
    aspect-ratio: 0.75;
    height: auto;
  }
}

.newDiv > .mirror-off {
  order: 0;

  @media screen and (max-width: 768px) {
    padding-left: 34px;
  }

  @media screen and (max-width: 480px) {
    padding-left: 0px;
    order: 1;
  }
}

.newDiv > .mirror-on {
  order: 1;

  @media screen and (max-width: 768px) {
    padding-left: 40px;
  }

  @media screen and (max-width: 480px) {
    padding-left: 0px;
  }
}

.newDiv > .text2 {
  padding-top: 71px;
  padding-right: 5%;
  padding-left: 5%;
  text-align: left;
  order: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
    width: 322px;
    padding-top: 24px;
    padding-left: 40px; //mirror off =40px , mir-on = 92px
  }

  @media screen and (max-width: 480px) {
    padding-top: 16px;
    width: 100%;
    height: auto;
    font-size: 14px;
    line-height: 20px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

.newDiv_mirror_on {
  @media screen and (max-width: 768px) {
    padding-left: 1%;
  }

  @media screen and (max-width: 480px) {
    padding-left: 22%;
    padding-top: 46px;
    padding-right: 16px;
  }
}

.newDiv_mirror_off {
  @media screen and (max-width: 480px) {
    padding-left: 16px;
    padding-right: 22%;
  }
}


//------------------------S2 only--------------------------

.layout-style_2>.primaryDiv>.d-hero-itb__content {
    align-self: center;

    @media screen and (max-width: @sm-min) {

        align-self: unset;
    }
}

.layout-style_2>.primaryDiv>.mirror-on {
    padding-left: 8%;

    @media screen and (max-width: @md-min) {

        padding-left: 32px;
    }

    @media screen and (max-width: @sm-min) {

        padding-left: 16px;
        padding-top: 24px;
    }
}

.layout-style_2>.primaryDiv>.image1_mirror_off {
    @media screen and (max-width: @md-min) {

        padding-right: 32px;
    }

    @media screen and (max-width: @sm-min) {
        order: 1;
        padding-right: 0px;
        padding-left: 0px;
        margin-top: 44px;
    }
}

.layout-style_2>.primaryDiv>.image1_mirror_on {
    @media screen and (max-width: @md-min) {
        padding-left: 32px;

    }

    @media screen and (max-width: @sm-min) {
        order: 0;
        padding-left: 16px;
        padding-right: 16px;

    }


}

//------------------------S3 Only------------------------
.layout-style_3 {
    align-items: center;
    text-align: center;
    flex-direction: column;
    flex-wrap: wrap;
    display: flex;
}

.layout-style_3>.primaryDiv {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: @md-min) {
        align-items: left;

    }
}

.layout-style_3>.primaryDiv>.d-hero-itb__content {

    display: inline-flex;
    padding-top: 64px;

    @media screen and (max-width: @md-min) {
        width: 464px;
        padding-top: 40px;
    }

    @media screen and (max-width: @sm-min) {
        width: 288px;
        //padding-left: 32px; //fynd=16px
        text-align: left;
        display: flex;
        padding-top: 24px;
    }
}

.layout-style_3>.primaryDiv>.mirror-on {
    order: 1;
}

.layout-style_3>.primaryDiv>.mirror-off {
    order: 0;
    padding-top: 40px;
    padding-bottom: 64px;
}


.layout-style_3>.primaryDiv>.image1-section {
    box-sizing: border-box;
    display: inline-block;
    box-sizing: border-box;
}

.layout-style_3>.primaryDiv>.image1-section>img {
    max-width: 100%;
    width: 1296px;
    max-height: 729px;
    aspect-ratio: 4/3;
    object-fit: cover;

    @media screen and (max-width: @md-min) {
        width: full;
        height: 418px;
    }

    @media screen and (max-width: @sm-min) {
        width: full;
        height: 426px;
    }

}

//-------------------------Animation Ready-----------------------------

.image1-section,
.d-hero-itb__content--sub,
.image2-section,
.d-hero-itb__content--main,
.heroBtn,
.text2 {
    position: relative;
}



.font_head {
    // font-family: Marcellus;
    font-size: 80px;
    font-weight: 400;
    line-height: 90px;
    letter-spacing: -0.03em;
    color: @TextHeading;

    @media screen and (max-width: @md-min) {
        // font-family: Marcellus;
        font-size: 40px;
        font-weight: 400;
        line-height: 44px;
        letter-spacing: -0.03em;

    }

    @media screen and (max-width: @sm-min) {
        // font-family: Marcellus;
        font-size: 40px;
        font-weight: 400;
        line-height: 44px;
        letter-spacing: -0.03em;

    }
}

.font_subHead {
    // font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.02em;
    opacity: 0.8;
    color: @TextBody;

    @media screen and (max-width: @md-min) {
        // font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.02em;

    }

    @media screen and (max-width: @sm-min) {
        // font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.02em;

    }

}

//------------------------------------------------------

//------------------------------------------------------
</style>

<script>
import btn from "./../components/common/button.vue";


export default {
    data() {
        return {

        };
    },

    components: {
        "sm-button": btn,
    },
    props: ["settings", "global_config"],
    watch: {
        settings: function (newVal, oldVal) { },
    },
    directives: {},
    mounted() {},
    beforeDestroy() {

    },
};
</script>
